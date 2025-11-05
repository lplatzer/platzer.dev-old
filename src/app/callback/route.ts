import { handleAuth } from '@workos-inc/authkit-nextjs';

/**
 * OAuth callback handler
 *
 * Handles the OAuth callback from WorkOS after successful authentication.
 * The user is redirected here from WorkOS with an authorization code,
 * which is exchanged for a session.
 *
 * After successful authentication, users are redirected to the home page (/).
 * You can customize the redirect by passing returnPathname:
 *   handleAuth({ returnPathname: '/tools/digital-wishlist/edit' })
 */
export const GET = handleAuth();
