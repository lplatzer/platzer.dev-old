'use client';

import {usePathname } from "next/navigation";

export function useCurrentRoute() {
    const pathname = usePathname();

    const routeName = pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2);

    return routeName || 'Home'
}