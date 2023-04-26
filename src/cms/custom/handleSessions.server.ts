import type { Db } from "mongodb";

/** Remove expired sessions */
export default async function handleSessions(db:Db) {
    const currentDate = new Date()
    const collection = db.collection("_sessions")
    const filter = { expireAt:{ $lt:currentDate } }
    await collection.deleteMany(filter)
}