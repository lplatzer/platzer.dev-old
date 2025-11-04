import { createWishlistItem } from '../utils/wishlistDb';

export const wishlistItems = [
    {
        title: "Festool Systainer³ Organizer SYS3-ORG L 89",
        description: "Professional organizer system for small parts and tools",
        link: "https://www.festool.de/produkte/systainer-sys-storage/204850---sys3-org-l-89",
        idealoLink: "https://www.idealo.de/preisvergleich/OffersOfProduct/6849234_-systainer-3-organizer-sys3-org-l-89-festool.html",
        geizhalsLink: "https://geizhals.de/festool-systainer-3-organizer-sys3-org-l-89-204850-a2345678.html",
        imageUrl: "https://www.festool.de/Images/SYS3-ORG-L-89_204850_5.jpg",
        fulfilled: false
    },
    {
        title: "Bosch Professional GCL 2-15",
        description: "Cross line laser with plumb points and rotating mount",
        link: "https://www.bosch-professional.com/de/de/products/gcl-2-15-0601066e00",
        idealoLink: "https://www.idealo.de/preisvergleich/OffersOfProduct/3533476_-gcl-2-15-bosch-professional.html",
        geizhalsLink: "https://geizhals.de/bosch-gcl-2-15-0601066e00-a1234567.html",
        imageUrl: "https://www.bosch-professional.com/images/products/gcl-2-15.jpg",
        fulfilled: false
    },
    {
        title: "Makita DHP484Z Cordless Hammer Drill",
        description: "18V brushless hammer drill driver, body only",
        link: "https://www.makita.de/produkt/dhp484z.html",
        idealoLink: "https://www.idealo.de/preisvergleich/OffersOfProduct/5678901_-dhp484z-makita.html",
        geizhalsLink: "https://geizhals.de/makita-dhp484z-a1234567.html",
        imageUrl: "https://www.makita.de/images/dhp484z.jpg",
        fulfilled: false
    }
];

async function seedWishlist() {
    console.log('Starting wishlist seeding...');
    
    for (const item of wishlistItems) {
        try {
            const created = await createWishlistItem(item);
            console.log(`Created: ${item.title}`);
        } catch (error) {
            console.error(`Error creating ${item.title}:`, error);
        }
    }
    
    console.log('Wishlist seeding completed!');
}

if (require.main === module) {
    seedWishlist()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error('Seeding failed:', error);
            process.exit(1);
        });
}

export default seedWishlist;
