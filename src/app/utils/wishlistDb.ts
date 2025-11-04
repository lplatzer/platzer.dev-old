import Surreal from "surrealdb";

export interface WishlistItem {
    id?: string;
    title: string;
    description: string;
    link: string;
    idealoLink?: string;
    geizhalsLink?: string;
    imageUrl?: string;
    fulfilled: boolean;
    createdAt?: string;
}

let dbInstance: Surreal | null = null;

export async function getWishlistDb(): Promise<Surreal> {
    if (dbInstance) {
        return dbInstance;
    }

    const db = new Surreal();
    
    try {
        await db.connect("wss://platzerdev-069urb82k9quhcv5r7i3jtoc54.aws-euw1.surreal.cloud/rpc", {
            namespace: "coffeeworldmap",
            database: "wishlist",
            auth: {
                username: "platzer-dev-web",
                password: "ytm!HEQ!zac4pup4cyz",
            }
        });
        
        await db.ready;
        dbInstance = db;
        return db;
    } catch (e) {
        console.error('Database connection error:', e);
        throw e;
    }
}

export async function getWishlistItems(): Promise<WishlistItem[]> {
    const db = await getWishlistDb();
    const result = await db.query<[WishlistItem[]]>('SELECT * FROM wishlist ORDER BY createdAt DESC');
    return result[0] || [];
}

export async function updateWishlistItem(id: string, fulfilled: boolean): Promise<WishlistItem | null> {
    const db = await getWishlistDb();
    const result = await db.query<[WishlistItem[]]>(
        'UPDATE $id SET fulfilled = $fulfilled RETURN AFTER',
        { id, fulfilled }
    );
    return result[0]?.[0] || null;
}

export async function createWishlistItem(item: Omit<WishlistItem, 'id' | 'createdAt'>): Promise<WishlistItem | null> {
    const db = await getWishlistDb();
    const result = await db.query<[WishlistItem[]]>(
        'CREATE wishlist CONTENT { title: $title, description: $description, link: $link, idealoLink: $idealoLink, geizhalsLink: $geizhalsLink, imageUrl: $imageUrl, fulfilled: $fulfilled, createdAt: time::now() }',
        { ...item }
    );
    return result[0]?.[0] || null;
}
