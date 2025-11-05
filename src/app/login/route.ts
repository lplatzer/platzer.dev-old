import { getSignInUrl } from '@workos-inc/authkit-nextjs';
import { redirect } from 'next/navigation';

/**
 * Login route handler
 *
 * Redirects users to the WorkOS authentication page.
 * This route is automatically called when users try to access
 * protected routes without being authenticated.
 */
export const GET = async () => {
    const signInUrl = await getSignInUrl();
    return redirect(signInUrl);
};
