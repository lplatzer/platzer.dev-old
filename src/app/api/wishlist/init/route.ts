import { NextResponse } from 'next/server';
import Surreal from 'surrealdb';
import { WISHLIST_SCHEMA } from '@/app/utils/wishlistSchema';

export async function POST() {
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
        
        const statements = WISHLIST_SCHEMA.split(';').filter(s => s.trim().length > 0);
        const results = [];
        
        for (const statement of statements) {
            const trimmed = statement.trim();
            if (trimmed) {
                try {
                    await db.query(trimmed);
                    results.push({ success: true, statement: trimmed.substring(0, 50) + '...' });
                } catch (error: any) {
                    results.push({ success: false, statement: trimmed.substring(0, 50) + '...', error: error.message });
                }
            }
        }
        
        const info = await db.query('INFO FOR TABLE wishlist;');
        
        await db.close();
        
        return NextResponse.json({
            success: true,
            message: 'Schema initialized successfully',
            results,
            tableInfo: info
        });
        
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to initialize schema', details: error.message },
            { status: 500 }
        );
    }
}
