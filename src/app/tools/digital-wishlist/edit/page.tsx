'use client';

import * as React from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button, Field, Input, Label, Textarea } from "@headlessui/react";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { WishlistItem } from "@/app/types/wishlist";

interface FormData {
    title: string;
    description: string;
    productUrl: string;
    geizhalsUrl: string;
    idealoUrl: string;
    imageUrl: string;
}

interface FormErrors {
    title?: string;
    description?: string;
    productUrl?: string;
    geizhalsUrl?: string;
    idealoUrl?: string;
    imageUrl?: string;
}

function EditWishlistItemContent() {
    // Authentication check - ensures user is signed in
    const { user, loading: authLoading } = useAuth({ ensureSignedIn: true });

    const router = useRouter();
    const searchParams = useSearchParams();
    const itemId = searchParams.get('id');
    const isEditing = !!itemId;

    const [formData, setFormData] = React.useState<FormData>({
        title: '',
        description: '',
        productUrl: '',
        geizhalsUrl: '',
        idealoUrl: '',
        imageUrl: '',
    });

    const [errors, setErrors] = React.useState<FormErrors>({});
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [submitError, setSubmitError] = React.useState<string>('');
    const [submitSuccess, setSubmitSuccess] = React.useState(false);
    const [isFetchingImage, setIsFetchingImage] = React.useState(false);

    // Fetch existing item data if editing
    React.useEffect(() => {
        if (isEditing && itemId) {
            setIsLoading(true);
            fetch(`/api/wishlist/${itemId}`)
                .then(res => {
                    if (!res.ok) throw new Error('Failed to fetch item');
                    return res.json();
                })
                .then((item: WishlistItem) => {
                    setFormData({
                        title: item.title,
                        description: item.description,
                        productUrl: item.productUrl,
                        geizhalsUrl: item.geizhalsUrl || '',
                        idealoUrl: item.idealoUrl || '',
                        imageUrl: item.imageUrl || '',
                    });
                })
                .catch(err => {
                    console.error('Error fetching item:', err);
                    setSubmitError('Failed to load item. Please try again.');
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [isEditing, itemId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error for this field when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const validateUrl = (url: string): boolean => {
        if (!url) return true; // Empty is valid for optional fields
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Required fields
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!formData.productUrl.trim()) {
            newErrors.productUrl = 'Product URL is required';
        } else if (!validateUrl(formData.productUrl)) {
            newErrors.productUrl = 'Please enter a valid URL';
        }

        // Optional URL fields
        if (formData.geizhalsUrl && !validateUrl(formData.geizhalsUrl)) {
            newErrors.geizhalsUrl = 'Please enter a valid URL';
        }

        if (formData.idealoUrl && !validateUrl(formData.idealoUrl)) {
            newErrors.idealoUrl = 'Please enter a valid URL';
        }

        if (formData.imageUrl && !validateUrl(formData.imageUrl)) {
            newErrors.imageUrl = 'Please enter a valid URL';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAutoFetchImage = async () => {
        if (!formData.productUrl) {
            setSubmitError('Please enter a product URL first');
            return;
        }

        if (!validateUrl(formData.productUrl)) {
            setSubmitError('Please enter a valid product URL first');
            return;
        }

        setIsFetchingImage(true);
        setSubmitError('');

        try {
            const response = await fetch('/api/scrape-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: formData.productUrl }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch image');
            }

            // Update the imageUrl field with the scraped image
            setFormData(prev => ({
                ...prev,
                imageUrl: data.imageUrl
            }));

            // Show success message
            setSubmitError('');
        } catch (err) {
            console.error('Error fetching image:', err);
            setSubmitError(err instanceof Error ? err.message : 'Failed to fetch image. Please try again or enter image URL manually.');
        } finally {
            setIsFetchingImage(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitError('');
        setSubmitSuccess(false);

        try {
            const payload = {
                title: formData.title.trim(),
                description: formData.description.trim(),
                productUrl: formData.productUrl.trim(),
                geizhalsUrl: formData.geizhalsUrl.trim() || undefined,
                idealoUrl: formData.idealoUrl.trim() || undefined,
                imageUrl: formData.imageUrl.trim() || undefined,
            };

            const url = isEditing ? `/api/wishlist/${itemId}` : '/api/wishlist';
            const method = isEditing ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to save item');
            }

            setSubmitSuccess(true);

            // Redirect after a short delay to show success message
            setTimeout(() => {
                router.push('/tools/digital-wishlist');
            }, 1500);

        } catch (err) {
            console.error('Error saving item:', err);
            setSubmitError(err instanceof Error ? err.message : 'Failed to save item. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        router.push('/tools/digital-wishlist');
    };

    // Show loading state while authenticating or loading item data
    if (authLoading || isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-lg text-gray-600">
                    {authLoading ? 'Checking authentication...' : 'Loading...'}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    {isEditing ? 'Edit Wishlist Item' : 'Add New Wishlist Item'}
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                    {isEditing
                        ? 'Update the details of your wishlist item below.'
                        : 'Fill in the details to add a new item to your wishlist.'}
                </p>
                {user && (
                    <p className="mt-2 text-xs text-gray-500">
                        Editing as: {user.email}
                    </p>
                )}
            </div>

            {submitError && (
                <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200">
                    <p className="text-sm text-red-800">{submitError}</p>
                </div>
            )}

            {submitSuccess && (
                <div className="mb-6 p-4 rounded-md bg-green-50 border border-green-200">
                    <p className="text-sm text-green-800">
                        Item saved successfully! Redirecting...
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                    <Label htmlFor="title">
                        Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Wireless Headphones"
                        className={errors.title ? 'border-red-500' : ''}
                    />
                    {errors.title && (
                        <p className="text-sm text-red-600">{errors.title}</p>
                    )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label htmlFor="description">
                        Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Describe the item, why you want it, or any specific details..."
                        className={errors.description ? 'border-red-500' : ''}
                    />
                    {errors.description && (
                        <p className="text-sm text-red-600">{errors.description}</p>
                    )}
                </div>

                {/* Product URL */}
                <div className="space-y-2">
                    <Label htmlFor="productUrl">
                        Product URL <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        type="url"
                        id="productUrl"
                        name="productUrl"
                        value={formData.productUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/product"
                        className={errors.productUrl ? 'border-red-500' : ''}
                    />
                    {errors.productUrl && (
                        <p className="text-sm text-red-600">{errors.productUrl}</p>
                    )}
                </div>

                {/* Geizhals URL */}
                <div className="space-y-2">
                    <Label htmlFor="geizhalsUrl">
                        Geizhals URL (Optional)
                    </Label>
                    <Input
                        type="url"
                        id="geizhalsUrl"
                        name="geizhalsUrl"
                        value={formData.geizhalsUrl}
                        onChange={handleChange}
                        placeholder="https://geizhals.de/..."
                        className={errors.geizhalsUrl ? 'border-red-500' : ''}
                    />
                    {errors.geizhalsUrl && (
                        <p className="text-sm text-red-600">{errors.geizhalsUrl}</p>
                    )}
                </div>

                {/* Idealo URL */}
                <div className="space-y-2">
                    <Label htmlFor="idealoUrl">
                        Idealo URL (Optional)
                    </Label>
                    <Input
                        type="url"
                        id="idealoUrl"
                        name="idealoUrl"
                        value={formData.idealoUrl}
                        onChange={handleChange}
                        placeholder="https://www.idealo.de/..."
                        className={errors.idealoUrl ? 'border-red-500' : ''}
                    />
                    {errors.idealoUrl && (
                        <p className="text-sm text-red-600">{errors.idealoUrl}</p>
                    )}
                </div>

                {/* Image URL */}
                <div className="space-y-2">
                    <Label htmlFor="imageUrl">
                        Image URL (Optional)
                    </Label>
                    <div className="space-y-2">
                        <Input
                            type="url"
                            id="imageUrl"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className={errors.imageUrl ? 'border-red-500' : ''}
                        />
                        <Button
                            type="button"
                            onClick={handleAutoFetchImage}
                            disabled={isFetchingImage || !formData.productUrl}
                            variant="outline"
                        >
                            {isFetchingImage ? 'Fetching...' : 'Auto-fetch image from product page'}
                        </Button>
                    </div>
                    {errors.imageUrl && (
                        <p className="text-sm text-red-600">{errors.imageUrl}</p>
                    )}
                </div>

                {/* Image Preview */}
                {formData.imageUrl && (
                    <div className="mt-4">
                        <p className="block text-sm font-medium text-gray-900 mb-2">
                            Image Preview
                        </p>
                        <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
                            <img
                                src={formData.imageUrl}
                                alt="Preview"
                                className="max-w-full h-auto max-h-64 mx-auto rounded-md"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const parent = target.parentElement;
                                    if (parent) {
                                        parent.innerHTML = '<p class="text-sm text-red-600 text-center">Failed to load image. Please check the URL.</p>';
                                    }
                                }}
                            />
                        </div>
                    </div>
                )}

                {!formData.imageUrl && (
                    <div className="mt-4">
                        <p className="block text-sm font-medium text-gray-900 mb-2">
                            Image Preview
                        </p>
                        <div className="border border-gray-300 rounded-md p-8 bg-gray-50 text-center">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <p className="mt-2 text-sm text-gray-500">No image yet</p>
                        </div>
                    </div>
                )}

                {/* Form Actions */}
                <div className="flex gap-4 pt-6">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1"
                    >
                        {isSubmitting ? 'Saving...' : isEditing ? 'Update Item' : 'Add Item'}
                    </Button>
                    <Button
                        type="button"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                        variant="outline"
                        className="flex-1"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default function EditWishlistItem() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-lg text-gray-600">Loading...</div>
            </div>
        }>
            <EditWishlistItemContent />
        </Suspense>
    );
}
