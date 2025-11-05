'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
}

export default function ProtectedRoute({ 
  children, 
  loadingComponent 
}: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/status');
        const data = await response.json();

        if (!data.authenticated) {
          const returnUrl = encodeURIComponent(window.location.pathname);
          router.push(`/login?returnUrl=${returnUrl}`);
        } else {
          setIsAuthenticated(true);
        }
      } catch {
        router.push('/login');
      }
    }

    checkAuth();
  }, [router]);

  if (isAuthenticated === null) {
    return loadingComponent || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
