
"use client";

import { useEffect, useState } from 'react';
import { FiExternalLink, FiCheckCircle, FiCircle } from 'react-icons/fi';

interface WishlistItem {
    id: string;
    title: string;
    description: string;
    link: string;
    idealoLink?: string;
    geizhalsLink?: string;
    imageUrl?: string;
    fulfilled: boolean;
}

export default function Wishlist() {
    const [items, setItems] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWishlistItems();
    }, []);

    const fetchWishlistItems = async () => {
        try {
            const response = await fetch('/api/wishlist');
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleFulfilled = async (id: string, currentStatus: boolean) => {
        try {
            const response = await fetch(`/api/wishlist/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fulfilled: !currentStatus }),
            });

            if (response.ok) {
                setItems(items.map(item => 
                    item.id === id ? { ...item, fulfilled: !currentStatus } : item
                ));
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    if (loading) {
        return <div className="text-center py-8">Loading wishlist...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
            
            {items.length === 0 ? (
                <p className="text-gray-500">No wishlist items yet.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                        <div 
                            key={item.id}
                            className={`border rounded-lg p-4 shadow-sm transition-all ${
                                item.fulfilled ? 'bg-gray-50 opacity-75' : 'bg-white'
                            }`}
                        >
                            {item.imageUrl && (
                                <div className="mb-4">
                                    <img 
                                        src={item.imageUrl} 
                                        alt={item.title}
                                        className="w-full h-48 object-cover rounded"
                                    />
                                </div>
                            )}
                            
                            <h3 className="text-lg font-semibold mb-2 flex items-start justify-between">
                                <span className={item.fulfilled ? 'line-through text-gray-500' : ''}>
                                    {item.title}
                                </span>
                                <button
                                    onClick={() => toggleFulfilled(item.id, item.fulfilled)}
                                    className="ml-2 flex-shrink-0 transition-colors hover:text-green-600"
                                    title={item.fulfilled ? 'Mark as unfulfilled' : 'Mark as fulfilled'}
                                >
                                    {item.fulfilled ? (
                                        <FiCheckCircle className="w-6 h-6 text-green-600" />
                                    ) : (
                                        <FiCircle className="w-6 h-6 text-gray-400" />
                                    )}
                                </button>
                            </h3>
                            
                            <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                            
                            <div className="space-y-2">
                                <a 
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                                >
                                    <FiExternalLink className="mr-1" />
                                    View Product
                                </a>
                                
                                <div className="flex gap-3 text-sm">
                                    {item.idealoLink && (
                                        <a 
                                            href={item.idealoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-orange-600 hover:text-orange-800"
                                        >
                                            Idealo
                                        </a>
                                    )}
                                    {item.geizhalsLink && (
                                        <a 
                                            href={item.geizhalsLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-purple-600 hover:text-purple-800"
                                        >
                                            Geizhals
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}