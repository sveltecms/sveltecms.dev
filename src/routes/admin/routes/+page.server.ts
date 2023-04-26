import db from "cms/lib/db.server"
import type { RouteObjectData } from "cms/types"
import type { RouteData } from "cms/types"

export const load = async(event:RouteObjectData)=>{
    const searchQuery = event.url.searchParams.get("q") 
    const filter:{[key:string]:any} = { }
    // Add query if founded
    if(searchQuery){ filter["ID"] = new RegExp(searchQuery,"ig") }

    const searchPageNum = event.url.searchParams.get("page")
    const page = searchPageNum ? Number(searchPageNum) : 1
    const collection = db.collection("_routes")
    const count = await collection.countDocuments(filter)
    const itemsPerPage = event.locals.appData.config.routesPerPage
    const numToSkip = page<=1 ? 0 : itemsPerPage*page - itemsPerPage
    const cursor = collection.find(filter).skip(numToSkip).limit(itemsPerPage).sort("_id","desc").map((data:any)=>{ data['_id']=data['_id'].toString() ; return data})
    const routes = await cursor.toArray() as RouteData[]
    return { routes,count,page,itemsPerPage }
}