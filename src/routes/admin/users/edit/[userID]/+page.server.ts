import db from "cms/lib/db.server"
import { ObjectId } from "mongodb"
import { error } from "@sveltejs/kit"
import type { UserData } from "cms/types"
import type { RequestEvent } from './$types'

export const load = async(event:RequestEvent)=> {
    const collection = db.collection("_users")
    const userID = event.params.userID
    const filter = { _id:new ObjectId(userID)}
    const userData = await collection.findOne(filter) as null | UserData
    // if user was not founded, throw error
    if(!userData){
        throw error(404,{ message:`User:${userID} not founded`})
    }
    // else return user data
    userData['_id'] = userData['_id'].toString()
    return { userData }
}