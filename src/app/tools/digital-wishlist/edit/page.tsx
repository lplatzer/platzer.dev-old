'use client';

import * as React from "react";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
                <Field>
                    <Label htmlFor="title" className="block text-sm font-medium text-gray-900">
                        Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g., Wireless Headphones"
                        className={`mt-2 block w-full rounded-md py-2 px-3 text-base text-gray-900 placeholder:text-gray-400 outline outline-1 -outline-offset-1 ${
                            errors.title
                                ? 'outline-red-500 focus:outline-red-600'
                                : 'outline-gray-300 focus:outline-indigo-600'
                        } focus:outline focus:outline-2 focus:-outline-offset-2`}
                    />
                    {errors.title && (
                        <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                    )}
                </Field>

                {/* Description */}
                <Field>
                    <Label htmlFor="description" className="block text-sm font-medium text-gray-900">
                        Description <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Describe the item, why you want it, or any specific details..."
                        className={`mt-2 block w-full rounded-md py-2 px-3 text-base text-gray-900 placeholder:text-gray-400 outline outline-1 -outline-offset-1 ${
                            errors.description
                                ? 'outline-red-500 focus:outline-red-600'
                                : 'outline-gray-300 focus:outline-indigo-600'
                        } focus:outline focus:outline-2 focus:-outline-offset-2`}
                    />
                    {errors.description && (
                        <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                    )}
                </Field>

                {/* Product URL */}
                <Field>
                    <Label htmlFor="productUrl" className="block text-sm font-medium text-gray-900">
                        Product URL <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        type="url"
                        id="productUrl"
                        name="productUrl"
                        value={formData.productUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/product"
                        className={`mt-2 block w-full rounded-md py-2 px-3 text-base text-gray-900 placeholder:text-gray-400 outline outline-1 -outline-offset-1 ${
                            errors.productUrl
                                ? 'outline-red-500 focus:outline-red-600'
                                : 'outline-gray-300 focus:outline-indigo-600'
                        } focus:outline focus:outline-2 focus:-outline-offset-2`}
                    />
                    {errors.productUrl && (
                        <p className="mt-2 text-sm text-red-600">{errors.productUrl}</p>
                    )}
                </Field>

                {/* Geizhals URL */}
                <Field>
                    <Label htmlFor="geizhalsUrl" className="block text-sm font-medium text-gray-900">
                        Geizhals URL (Optional)
                    </Label>
                    <Input
                        type="url"
                        id="geizhalsUrl"
                        name="geizhalsUrl"
                        value={formData.geizhalsUrl}
                        onChange={handleChange}
                        placeholder="https://geizhals.de/..."
                        className={`mt-2 block w-full rounded-md py-2 px-3 text-base text-gray-900 placeholder:text-gray-400 outline outline-1 -outline-offset-1 ${
                            errors.geizhalsUrl
                                ? 'outline-red-500 focus:outline-red-600'
                                : 'outline-gray-300 focus:outline-indigo-600'
                        } focus:outline focus:outline-2 focus:-outline-offset-2`}
                    />
                    {errors.geizhalsUrl && (
                        <p className="mt-2 text-sm text-red-600">{errors.geizhalsUrl}</p>
                    )}
                </Field>

                {/* Idealo URL */}
                <Field>
                    <Label htmlFor="idealoUrl" className="block text-sm font-medium text-gray-900">
                        Idealo URL (Optional)
                    </Label>
                    <Input
                        type="url"
                        id="idealoUrl"
                        name="idealoUrl"
                        value={formData.idealoUrl}
                        onChange={handleChange}
                        placeholder="https://www.idealo.de/..."
                        className={`mt-2 block w-full rounded-md py-2 px-3 text-base text-gray-900 placeholder:text-gray-400 outline outline-1 -outline-offset-1 ${
                            errors.idealoUrl
                                ? 'outline-red-500 focus:outline-red-600'
                                : 'outline-gray-300 focus:outline-indigo-600'
                        } focus:outline focus:outline-2 focus:-outline-offset-2`}
                    />
                    {errors.idealoUrl && (
                        <p className="mt-2 text-sm text-red-600">{errors.idealoUrl}</p>
                    )}
                </Field>

                {/* Image URL */}
                <Field>
                    <Label htmlFor="imageUrl" className="block text-sm font-medium text-gray-900">
                        Image URL (Optional)
                    </Label>
                    <div className="mt-2 space-y-2">
                        <Input
                            type="url"
                            id="imageUrl"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className={`block w-full rounded-md py-2 px-3 text-base text-gray-900 placeholder:text-gray-400 outline outline-1 -outline-offset-1 ${
                                errors.imageUrl
                                    ? 'outline-red-500 focus:outline-red-600'
                                    : 'outline-gray-300 focus:outline-indigo-600'
                            } focus:outline focus:outline-2 focus:-outline-offset-2`}
                        />
                        <Button
                            type="button"
                            onClick={handleAutoFetchImage}
                            disabled={isFetchingImage || !formData.productUrl}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isFetchingImage ? 'Fetching...' : 'Auto-fetch image from product page'}
                        </Button>
                    </div>
                    {errors.imageUrl && (
                        <p className="mt-2 text-sm text-red-600">{errors.imageUrl}</p>
                    )}
                </Field>

                {/* Image Preview */}
                {formData.imageUrl && (
                    <div className="mt-4">
                        <Label className="block text-sm font-medium text-gray-900 mb-2">
                            Image Preview
                        </Label>
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
                        <Label className="block text-sm font-medium text-gray-900 mb-2">
                            Image Preview
                        </Label>
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
                        className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                        {isSubmitting ? 'Saving...' : isEditing ? 'Update Item' : 'Add Item'}
                    </Button>
                    <Button
                        type="button"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                        className="flex-1 bg-white text-gray-700 py-2 px-4 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
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
