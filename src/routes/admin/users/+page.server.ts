import db from "cms/lib/db.server"
import { ObjectId } from "mongodb"
import type { RequestEvent } from "@sveltejs/kit"
import type { UserData } from "cms/types"

export const load = async(event:RequestEvent)=> {
    const searchQuery = event.url.searchParams.get("q") 
    const filter:{[key:string]:any} = { _id:{$ne: new ObjectId("000000000000000000000000") } }
    // Add query if founded
    if(searchQuery){ filter["email"] = new RegExp(searchQuery,"ig") }

    const searchPageNum = event.url.searchParams.get("page")
    const page = searchPageNum ? Number(searchPageNum) : 1
    const collection = db.collection("_users")
    const count = await collection.countDocuments(filter)
    const itemsPerPage = event.locals.appData.config.usersPerPage
    const numToSkip = page<=1 ? 0 : itemsPerPage*page - itemsPerPage
    const cursor = collection.find(filter).skip(numToSkip).limit(itemsPerPage).sort("_id","desc").map((data:any)=>{ data['_id']=data['_id'].toString() ; return data})
    const users = await cursor.toArray() as UserData[]
    return { users,count,page,itemsPerPage }
}