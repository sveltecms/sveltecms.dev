import db from "cms/lib/db.server"
import { error } from "@sveltejs/kit"
import type { RequestEvent } from "./$types"
import type { RouteData } from "cms/types"

export const load = async(event:RequestEvent)=>{
    const routeID = event.params.routeID.trim()
    const routesCol = db.collection("_routes")
    const route = await routesCol.findOne({ ID:routeID }) as RouteData | null
    // if route was not founded
    if(!route){ throw error(404,{ message:`Route ${routeID} not founded`}) }
    // else return route data
    return { route:{...route,_id:route['_id'].toString() } }
}