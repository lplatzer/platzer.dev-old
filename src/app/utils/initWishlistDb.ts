import Surreal from "surrealdb";
import { WISHLIST_SCHEMA } from "./wishlistSchema";

async function initializeWishlistDatabase() {
    const db = new Surreal();
    
    try {
        console.log('Connecting to SurrealDB (using coffee namespace)...');
        await db.connect("wss://platzerdev-069urb82k9quhcv5r7i3jtoc54.aws-euw1.surreal.cloud/rpc", {
            namespace: "coffeeworldmap",
            database: "wishlist",
            auth: {
                username: "platzer-dev-web",
                password: "ytm!HEQ!zac4pup4cyz",
            }
        });
        
        await db.ready;
        
        console.log('Connected successfully!');
        
        console.log('Creating schema...');
        const statements = WISHLIST_SCHEMA.split(';').filter(s => s.trim().length > 0);
        
        for (const statement of statements) {
            const trimmed = statement.trim();
            if (trimmed) {
                console.log(`Executing: ${trimmed.substring(0, 50)}...`);
                await db.query(trimmed);
            }
        }
        
        console.log('Schema created successfully!');
        
        console.log('\nVerifying table structure...');
        const info = await db.query('INFO FOR TABLE wishlist;');
        console.log('Table info:', JSON.stringify(info, null, 2));
        
        await db.close();
        console.log('\nDatabase initialization complete!');
        
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

if (require.main === module) {
    initializeWishlistDatabase()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error('Initialization failed:', error);
            process.exit(1);
        });
}

export default initializeWishlistDatabase;
