import db from "$Database"
import svelteCMS from "$svelteCMS"
import type { UserData } from "$Types"
import { error } from "@sveltejs/kit"
import { ObjectId } from "mongodb"
import type { PageServerLoad } from "./$types"

export const load:PageServerLoad = async({params})=>{
    const usersCollection = db.collection(svelteCMS.collections.users)
    const userID = params.userID
    // Check if user exists
    const userDB:any = await usersCollection.findOne({ _id:new ObjectId(userID) })
    // If user do not exists
    if(!userDB){
        const errorMsg = `User with id:${userID} do not exists`
        throw error(404,errorMsg)
    }
    // Else get user data
    const userData:UserData = {...userDB,_id:userDB['_id'].toString()}
    return { userData }
}