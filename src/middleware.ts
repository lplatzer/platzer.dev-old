import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

/**
 * Authentication middleware for protecting routes
 *
 * This middleware protects the wishlist edit page while keeping
 * the main wishlist display page and other routes public.
 *
 * Protected routes:
 * - /tools/digital-wishlist/edit - Requires authentication to add/edit items
 *
 * Public routes:
 * - /tools/digital-wishlist - Anyone can view the wishlist
 * - All other routes remain public
 */
export default authkitMiddleware({
    middlewareAuth: {
        enabled: true,
        // All paths are public except those matched by the config.matcher below
        unauthenticatedPaths: [
            '/',
            '/tools/digital-wishlist',
            '/tools/*',
            '/coffee-tools/*',
            '/docs',
        ],
    },
    redirectUri: process.env.WORKOS_REDIRECT_URI,
});

/**
 * Configure which routes the middleware should run on
 * Only the wishlist edit page requires authentication
 */
export const config = {
    matcher: [
        '/tools/digital-wishlist/edit/:path*',
    ],
};
