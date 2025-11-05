/**
 * Wishlist API Route Tests
 * Tests for GET and POST endpoints of the wishlist API
 *
 * TO USE: Copy this file to src/app/api/wishlist/__tests__/route.test.ts in the
 * feature/technical-documentation-system branch
 */

import { NextRequest } from 'next/server';
import { GET, POST } from '../route';
import { promises as fs } from 'fs';
import path from 'path';

// Mock fs module
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));

// Mock uuid
jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mock-uuid-1234'),
}));

describe('Wishlist API Routes', () => {
  const mockWishlistData = {
    items: [
      {
        id: 'item-1',
        title: 'Test Item 1',
        description: 'Test Description 1',
        productUrl: 'https://example.com/item1',
        isGifted: false,
        createdAt: '2025-01-01T00:00:00.000Z',
        updatedAt: '2025-01-01T00:00:00.000Z',
      },
      {
        id: 'item-2',
        title: 'Test Item 2',
        description: 'Test Description 2',
        productUrl: 'https://example.com/item2',
        geizhalsUrl: 'https://geizhals.at/item2',
        imageUrl: 'https://example.com/image2.jpg',
        isGifted: true,
        createdAt: '2025-01-02T00:00:00.000Z',
        updatedAt: '2025-01-02T00:00:00.000Z',
      },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock current date for consistent testing
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-01-15T12:00:00.000Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('GET /api/wishlist', () => {
    it('should return all wishlist items', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify(mockWishlistData)
      );

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual(mockWishlistData.items);
      expect(data).toHaveLength(2);
    });

    it('should return empty array when file does not exist', async () => {
      (fs.readFile as jest.Mock).mockRejectedValue(
        new Error('ENOENT: no such file or directory')
      );

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual([]);
    });

    it('should return empty array when file contains invalid JSON', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('invalid-json');

      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual([]);
    });
  });

  describe('POST /api/wishlist', () => {
    it('should create a new wishlist item with required fields', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify(mockWishlistData)
      );
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      const request = new NextRequest('http://localhost:3000/api/wishlist', {
        method: 'POST',
        body: JSON.stringify({
          title: 'New Item',
          description: 'New Description',
          productUrl: 'https://example.com/new-item',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toMatchObject({
        id: 'mock-uuid-1234',
        title: 'New Item',
        description: 'New Description',
        productUrl: 'https://example.com/new-item',
        isGifted: false,
        createdAt: '2025-01-15T12:00:00.000Z',
        updatedAt: '2025-01-15T12:00:00.000Z',
      });

      // Check that writeFile was called with updated data
      expect(fs.writeFile).toHaveBeenCalled();
      const writeCall = (fs.writeFile as jest.Mock).mock.calls[0];
      const writtenData = JSON.parse(writeCall[1]);
      expect(writtenData.items).toHaveLength(3);
    });

    it('should create a new wishlist item with optional fields', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify({ items: [] })
      );
      (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

      const request = new NextRequest('http://localhost:3000/api/wishlist', {
        method: 'POST',
        body: JSON.stringify({
          title: 'New Item',
          description: 'New Description',
          productUrl: 'https://example.com/new-item',
          geizhalsUrl: 'https://geizhals.at/new-item',
          idealoUrl: 'https://idealo.de/new-item',
          imageUrl: 'https://example.com/image.jpg',
          isGifted: true,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toMatchObject({
        title: 'New Item',
        geizhalsUrl: 'https://geizhals.at/new-item',
        idealoUrl: 'https://idealo.de/new-item',
        imageUrl: 'https://example.com/image.jpg',
        isGifted: true,
      });
    });

    it('should return 400 when title is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/wishlist', {
        method: 'POST',
        body: JSON.stringify({
          description: 'New Description',
          productUrl: 'https://example.com/new-item',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('Missing required fields');
    });

    it('should return 400 when description is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/wishlist', {
        method: 'POST',
        body: JSON.stringify({
          title: 'New Item',
          productUrl: 'https://example.com/new-item',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('Missing required fields');
    });

    it('should return 400 when productUrl is missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/wishlist', {
        method: 'POST',
        body: JSON.stringify({
          title: 'New Item',
          description: 'New Description',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toContain('Missing required fields');
    });

    it('should handle file write errors', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(
        JSON.stringify({ items: [] })
      );
      (fs.writeFile as jest.Mock).mockRejectedValue(
        new Error('Write permission denied')
      );

      const request = new NextRequest('http://localhost:3000/api/wishlist', {
        method: 'POST',
        body: JSON.stringify({
          title: 'New Item',
          description: 'New Description',
          productUrl: 'https://example.com/new-item',
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toContain('Failed to create wishlist item');
    });
  });
});
