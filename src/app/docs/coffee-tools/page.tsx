'use client';

import { DocLayout, DocSection, DocSubsection } from '@/components/DocLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CoffeeToolsPage() {
  const sections = [
    {
      title: 'Interactive Coffee Flavour Wheel',
      id: 'flavour-wheel',
      subsections: [
        { title: 'What is it?', id: 'what-is-it' },
        { title: 'How to Use', id: 'how-to-use' },
        { title: 'Best Practices', id: 'best-practices' },
        { title: 'Who Should Use This?', id: 'who-should-use' }
      ]
    },
    {
      title: 'Tips for Coffee Tasting',
      id: 'tasting-tips'
    }
  ];

  return (
    <DocLayout
      title="Coffee Tools Guide"
      description="Learn how to use coffee-related tools designed for professionals and enthusiasts"
      sections={sections}
    >
      <DocSection id="flavour-wheel" title="Interactive Coffee Flavour Wheel">
        <p className="lead text-xl text-muted-foreground mb-6">
          An interactive version of the SCA (Specialty Coffee Association) Arabica Flavour Wheel.
        </p>

        <DocSubsection id="what-is-it" title="What is it?">
          <p>
            The Coffee Flavour Wheel is a comprehensive visual guide to the flavours and aromas found in coffee. 
            It's based on the official SCA Arabica Flavour Wheel, which is the industry standard for coffee tasting and evaluation.
          </p>
          <p>
            This tool helps you identify, describe, and communicate the complex flavours present in coffee, 
            making it invaluable for professionals and enthusiasts alike.
          </p>
        </DocSubsection>

        <DocSubsection id="how-to-use" title="How to Use">
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-2">1. Navigate to the Tool</h4>
              <p>Select "Interactive Coffee Flavour Wheel" from the Coffee Tools menu</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">2. Explore Flavour Categories</h4>
              <p className="mb-3">The wheel is organized in layers:</p>
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <div>
                    <strong className="text-foreground">Inner Circle:</strong>
                    <span className="text-muted-foreground"> Main flavour categories (fruity, sweet, floral, etc.)</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Middle Circle:</strong>
                    <span className="text-muted-foreground"> Sub-categories within each main category</span>
                  </div>
                  <div>
                    <strong className="text-foreground">Outer Circle:</strong>
                    <span className="text-muted-foreground"> Specific flavour notes and descriptors</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">3. Interact with the Wheel</h4>
              <p>Click or hover over different sections to explore specific flavour notes</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">4. Use During Cupping</h4>
              <p>Reference the wheel while tasting coffee to identify and describe flavours</p>
            </div>
          </div>
        </DocSubsection>

        <DocSubsection id="best-practices" title="Best Practices">
          <ul className="space-y-2">
            <li>
              <strong>Start Broad, Go Specific:</strong> Begin with the inner circle categories and work your way outward
            </li>
            <li>
              <strong>Use Multiple Descriptors:</strong> Coffee often has multiple flavour notes - don't limit yourself to one
            </li>
            <li>
              <strong>Consider Context:</strong> Flavours can vary based on brewing method, roast level, and origin
            </li>
            <li>
              <strong>Practice Regularly:</strong> The more you use the wheel, the better you'll become at identifying flavours
            </li>
          </ul>
        </DocSubsection>

        <DocSubsection id="who-should-use" title="Who Should Use This?">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <h5 className="font-semibold mb-2">Baristas</h5>
                <p className="text-sm text-muted-foreground">
                  Improve your ability to describe coffee to customers
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h5 className="font-semibold mb-2">Coffee Roasters</h5>
                <p className="text-sm text-muted-foreground">
                  Evaluate and communicate the flavour profiles of your roasts
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h5 className="font-semibold mb-2">Coffee Enthusiasts</h5>
                <p className="text-sm text-muted-foreground">
                  Develop your palate and coffee tasting skills
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h5 className="font-semibold mb-2">Q Graders & Cuppers</h5>
                <p className="text-sm text-muted-foreground">
                  Reference during formal coffee evaluations
                </p>
              </CardContent>
            </Card>
          </div>
        </DocSubsection>
      </DocSection>

      <Separator className="my-8" />

      <DocSection id="tasting-tips" title="Tips for Coffee Tasting">
        <Card>
          <CardContent className="pt-6">
            <ol className="space-y-3 list-decimal list-inside">
              <li>
                <strong>Start with Clean Water:</strong> Use filtered water for the most accurate taste
              </li>
              <li>
                <strong>Consistent Brewing:</strong> Use the same brewing parameters each time you taste
              </li>
              <li>
                <strong>Take Notes:</strong> Document the flavours you detect
              </li>
              <li>
                <strong>Compare and Contrast:</strong> Taste multiple coffees side-by-side
              </li>
              <li>
                <strong>Stay Hydrated:</strong> Cleanse your palate with water between tastings
              </li>
            </ol>
          </CardContent>
        </Card>

        <div className="mt-8 p-6 bg-muted rounded-lg">
          <h4 className="text-lg font-semibold mb-2">Coming Soon</h4>
          <p className="text-muted-foreground">
            Additional coffee tools are in development, including SCA Cupping Sheet digital tool, 
            coffee brewing calculators, and water recipe builders. Stay tuned for updates!
          </p>
        </div>
      </DocSection>
    </DocLayout>
  );
}
