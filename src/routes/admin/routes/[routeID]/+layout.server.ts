import db from "cms/lib/db.server"
import { error } from "@sveltejs/kit"
import type { RequestEvent } from "./$types"
import type { RouteData } from "cms/types"

export const load = async(event:RequestEvent)=>{
    const routeID = event.params.routeID
    const routesCol = db.collection("_routes")
    // check if route exists
    const routeData:RouteData|null = await routesCol.findOne({ ID:routeID }) as any
    if(!routeData) throw error(404,{ message:`Route ${routeID} do not exists`})
    // else return route data
    routeData['_id'] = routeData['_id'].toString()
    return { routeData }
}