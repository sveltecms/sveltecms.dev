import db from "cms/lib/db.server"
import { ObjectId } from "mongodb"
import type { RequestEvent } from "@sveltejs/kit"
import type { AssetData } from "cms/types"

export const load = async(event:RequestEvent)=> {
    const searchQuery = event.url.searchParams.get("q") 
    const filter:{[key:string]:any} = { _id:{$ne: new ObjectId("000000000000000000000000") } }
    // Add query if founded
    if(searchQuery){ filter["title"] = new RegExp(searchQuery,"ig") }

    const searchPageNum = event.url.searchParams.get("page")
    const page = searchPageNum ? Number(searchPageNum) : 1
    const collection = db.collection("_assets")
    const count = await collection.countDocuments(filter)
    const itemsPerPage = event.locals.appData.config.assetsPerPage
    const numToSkip = page<=1 ? 0 : itemsPerPage*page - itemsPerPage
    const cursor = collection.find(filter).skip(numToSkip).limit(itemsPerPage).sort("_id","desc").map((data:any)=>{ data['_id']=data['_id'].toString() ; return data})
    const assets = await cursor.toArray() as AssetData[]
    return { assets,count,page,itemsPerPage }
}