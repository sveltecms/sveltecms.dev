import { env } from "$env/dynamic/private"
import { MongoClient } from "mongodb"
const client = new MongoClient(env.DATABASE_URL)
await client.connect()
export default client.db(env.DATABASE_NAME)