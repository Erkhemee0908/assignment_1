// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { names?: mongoDB.Collection } = {}
// Initialize Connection
export async function connectToDatabase() {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const namesCollection: mongoDB.Collection = db.collection(process.env.NAMES_COLLECTION_NAME);

    collections.names = namesCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${namesCollection.collectionName}`);
}