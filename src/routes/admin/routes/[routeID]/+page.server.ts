import db from "cms/lib/db.server"
import type { RouteObjectData } from "cms/types"
import type { PageServerLoadEvent } from "./$types"

export const load = async(event:PageServerLoadEvent)=>{
    const routeData = (await event.parent()).routeData
    const searchQuery = event.url.searchParams.get("q") 
    const filter:{[key:string]:any} = { }
    // Add query if founded
    if(searchQuery){ filter[routeData.searchAbleKey] = new RegExp(searchQuery,"ig") }

    const routeID = event.params.routeID
    const searchPageNum = event.url.searchParams.get("page")
    const page = searchPageNum ? Number(searchPageNum) : 1
    const collection = db.collection(routeID)
    const count = await collection.countDocuments(filter)
    const itemsPerPage = event.locals.appData.config.objectsPerPage
    const numToSkip = page<=1 ? 0 : itemsPerPage*page - itemsPerPage
    const cursor = collection.find(filter).skip(numToSkip).limit(itemsPerPage).sort("_id","desc").map((data:any)=>{ data['_id']=data['_id'].toString() ; return data})
    const objects = await cursor.toArray() as RouteObjectData[]
    return { objects,count,page,itemsPerPage }
}