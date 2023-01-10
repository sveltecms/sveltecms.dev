import cms from "$Cms"
import { ObjectId } from "mongodb"
import type { PageServerLoad } from "./$types"
import { error } from "@sveltejs/kit"

export const load:PageServerLoad = async({params,parent})=>{
    await parent()
    // If route is not founded, +layout.server.ts will throw an error
    const routeID = params.routeID
    const _id = new ObjectId(params._id)
    const routeObject = await cms.Fetch.routeObject(routeID,{_id})
    // Throw error if object do not exists
    if(!routeObject) throw error(404,{ message:`Object:${params._id} do not exists`})
    // Return object data
    return { routeObject }
}