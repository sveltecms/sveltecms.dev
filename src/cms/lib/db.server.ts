import { DB_NAME,DB_URL } from "$env/static/private"
import { MongoClient } from "mongodb"
const client = new MongoClient(DB_URL)
await client.connect()
export default client.db(DB_NAME)