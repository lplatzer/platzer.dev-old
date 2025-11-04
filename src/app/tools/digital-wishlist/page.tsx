'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  CheckCircleIcon,
  PlusIcon,
  LinkIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';

interface WishlistItem {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  productUrl?: string;
  geizhalsUrl?: string;
  idealoUrl?: string;
  isGifted: boolean;
  createdAt: string;
}

export default function DigitalWishlistPage() {
  const [items, setItems] = React.useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [updatingItems, setUpdatingItems] = React.useState<Set<string>>(new Set());

  // Fetch wishlist items on mount
  React.useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/wishlist');

      if (!response.ok) {
        throw new Error('Failed to fetch wishlist items');
      }

      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching wishlist:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleGifted = async (itemId: string, currentStatus: boolean) => {
    // Optimistically update UI
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, isGifted: !currentStatus } : item
      )
    );

    // Track which items are being updated
    setUpdatingItems(prev => new Set(prev).add(itemId));

    try {
      const response = await fetch(`/api/wishlist/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isGifted: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      const updatedItem = await response.json();

      // Update with server response
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? updatedItem : item
        )
      );
    } catch (err) {
      // Revert optimistic update on error
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, isGifted: currentStatus } : item
        )
      );
      console.error('Error updating item:', err);
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-gray-600">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
          <button
            onClick={fetchWishlistItems}
            className="mt-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (items.length === 0) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No wishlist items</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding your first item to your wishlist.
            </p>
            <div className="mt-6">
              <Link
                href="/tools/digital-wishlist/edit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                Add Item
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Main content with items
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="mt-2 text-sm text-gray-600">
            {items.filter(item => item.isGifted).length} of {items.length} items gifted
          </p>
        </div>

        {/* Responsive grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`relative flex flex-col overflow-hidden rounded-lg bg-white shadow transition-all duration-200 hover:shadow-lg ${
                item.isGifted ? 'ring-2 ring-green-500' : ''
              }`}
            >
              {/* Gifted badge */}
              {item.isGifted && (
                <div className="absolute top-3 right-3 z-10">
                  <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    <CheckCircleSolidIcon className="h-4 w-4" />
                    Gifted
                  </span>
                </div>
              )}

              {/* Image */}
              <div className={`aspect-w-16 aspect-h-9 w-full bg-gray-200 ${item.isGifted ? 'opacity-60' : ''}`}>
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-48 w-full object-cover object-center"
                  />
                ) : (
                  <div className="flex h-48 items-center justify-center bg-gray-100">
                    <ShoppingBagIcon className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={`flex flex-1 flex-col p-4 ${item.isGifted ? 'opacity-75' : ''}`}>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                  {item.title}
                </h3>

                {item.description && (
                  <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                    {item.description}
                  </p>
                )}

                {/* Links section */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.productUrl && (
                    <a
                      href={item.productUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200"
                    >
                      <LinkIcon className="mr-1 h-3 w-3" />
                      Product
                    </a>
                  )}

                  {item.geizhalsUrl && (
                    <a
                      href={item.geizhalsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                    >
                      Geizhals
                    </a>
                  )}

                  {item.idealoUrl && (
                    <a
                      href={item.idealoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-md bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700 hover:bg-orange-200"
                    >
                      Idealo
                    </a>
                  )}
                </div>

                {/* Mark as Gifted toggle */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleToggleGifted(item.id, item.isGifted)}
                    disabled={updatingItems.has(item.id)}
                    className={`flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold shadow-sm transition-colors ${
                      item.isGifted
                        ? 'bg-green-600 text-white hover:bg-green-500'
                        : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {updatingItems.has(item.id) ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
                    ) : (
                      <CheckCircleIcon className="h-5 w-5" />
                    )}
                    {item.isGifted ? 'Mark as Not Gifted' : 'Mark as Gifted'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <Link
        href="/tools/digital-wishlist/edit"
        className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-all hover:scale-110"
      >
        <PlusIcon className="h-6 w-6" aria-hidden="true" />
        <span className="sr-only">Add new item</span>
      </Link>
    </div>
  );
}
