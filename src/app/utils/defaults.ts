import Surreal from "surrealdb";

interface DbConfig {
    url: string;
    namespace: string;
    database: string;
}

const DEFAULT_CONFIG: DbConfig = {
    url: "wss://platzerdev-069urb82k9quhcv5r7i3jtoc54.aws-euw1.surreal.cloud/rpc",
    namespace: "coffeeworldmap",
    database: "coffees",
    auth: {

    }
}
export async function CoffeeData(config: DbConfig = DEFAULT_CONFIG): Promise<Surreal> {
    const db = new Surreal();

    try{
        await db.connect("wss://platzerdev-069urb82k9quhcv5r7i3jtoc54.aws-euw1.surreal.cloud/rpc", {
            namespace: "coffeeworldmap",
            database: "coffees",
            auth: {
                username: "platzer-dev-web",
                password: "ytm!HEQ!zac4pup4cyz",
            }
        });
        await db.ready;
        const response = await db.query('SELECT * FROM type::table($tb)', {
            tb: 'coffees',
        })
        return db;
        // return response;
    } catch(e) {
        console.error('ERROR', e);
    }

}
