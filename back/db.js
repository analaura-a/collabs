import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const DATABASE_NAME = process.env.DATABASE_NAME;

const client = new MongoClient(MONGO_URI);
const db = client.db(DATABASE_NAME);

export { client, db };