import { NextResponse } from 'next/server';

/**
 * API route to scrape product images from URLs
 * Looks for Open Graph images, Twitter Card images, or main product images
 */
export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    // Validate URL format
    let productUrl: URL;
    try {
      productUrl = new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    // Fetch the product page
    const response = await fetch(productUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch page: ${response.statusText}` },
        { status: response.status }
      );
    }

    const html = await response.text();

    // Try to extract image from various meta tags (in order of preference)
    const imagePatterns = [
      // Open Graph image (most common for product pages)
      /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i,
      // Twitter Card image
      /<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i,
      // Alternative Open Graph format
      /<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i,
      // Alternative Twitter format
      /<meta\s+content=["']([^"']+)["']\s+name=["']twitter:image["']/i,
    ];

    let imageUrl: string | null = null;

    // Try each pattern until we find a match
    for (const pattern of imagePatterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        imageUrl = match[1];
        break;
      }
    }

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'No product image found on the page. You can manually enter an image URL.' },
        { status: 404 }
      );
    }

    // Handle relative URLs
    if (imageUrl.startsWith('//')) {
      imageUrl = `https:${imageUrl}`;
    } else if (imageUrl.startsWith('/')) {
      imageUrl = `${productUrl.origin}${imageUrl}`;
    }

    // Validate the extracted URL
    try {
      new URL(imageUrl);
    } catch {
      return NextResponse.json(
        { error: 'Found image URL but it is invalid' },
        { status: 500 }
      );
    }

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Error scraping image:', error);
    return NextResponse.json(
      { error: 'Failed to scrape image from URL' },
      { status: 500 }
    );
  }
}
