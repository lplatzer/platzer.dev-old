import { NextResponse } from 'next/server';
import { createWishlistItem } from '@/app/utils/wishlistDb';

const sampleItems = [
    {
        title: "Festool Systainer³ Organizer SYS3-ORG L 89",
        description: "Professional organizer system for small parts and tools",
        link: "https://www.festool.de/produkte/systainer-sys-storage/204850---sys3-org-l-89",
        idealoLink: "https://www.idealo.de/preisvergleich/OffersOfProduct/6849234_-systainer-3-organizer-sys3-org-l-89-festool.html",
        geizhalsLink: "https://geizhals.de/festool-systainer-3-organizer-sys3-org-l-89-204850-a2345678.html",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
        fulfilled: false
    },
    {
        title: "Bosch Professional GCL 2-15",
        description: "Cross line laser with plumb points and rotating mount",
        link: "https://www.bosch-professional.com/de/de/products/gcl-2-15-0601066e00",
        idealoLink: "https://www.idealo.de/preisvergleich/OffersOfProduct/3533476_-gcl-2-15-bosch-professional.html",
        geizhalsLink: "https://geizhals.de/bosch-gcl-2-15-0601066e00-a1234567.html",
        imageUrl: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400",
        fulfilled: false
    },
    {
        title: "Makita DHP484Z Cordless Hammer Drill",
        description: "18V brushless hammer drill driver, body only",
        link: "https://www.makita.de/produkt/dhp484z.html",
        idealoLink: "https://www.idealo.de/preisvergleich/OffersOfProduct/5678901_-dhp484z-makita.html",
        geizhalsLink: "https://geizhals.de/makita-dhp484z-a1234567.html",
        imageUrl: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400",
        fulfilled: false
    }
];

export async function POST() {
    try {
        const results = [];
        
        for (const item of sampleItems) {
            try {
                const created = await createWishlistItem(item);
                results.push({ 
                    success: true, 
                    title: item.title,
                    id: created?.id 
                });
            } catch (error: any) {
                results.push({ 
                    success: false, 
                    title: item.title,
                    error: error.message 
                });
            }
        }
        
        return NextResponse.json({
            message: 'Seeding completed',
            results
        });
        
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to seed data', details: error.message },
            { status: 500 }
        );
    }
}
