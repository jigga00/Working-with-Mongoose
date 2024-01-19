import { MongoClient } from "mongodb";

console.log(process.env.ATLAS_URI);

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient(connectionString);

let conn;

try{
    conn = await client.connect();
} catch (e) {
    console.log(e);
}

const db = conn.db("sample_training");
export default db;

