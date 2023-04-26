import db from "cms/lib/db.server"
import { ObjectId } from "mongodb"
import { error } from "@sveltejs/kit"
import type { RequestEvent } from "./$types"
import type { RouteObjectData } from "cms/types"

export const load = async(event:RequestEvent)=>{
    const routeID = event.params.routeID
    const objectID = event.params.objectID
    const objectsCol = db.collection(routeID)
    // check if object exists
    const filter = { _id:new ObjectId(objectID) }
    const objectExists = await objectsCol.findOne(filter)
    // if object do not exists
    if(!objectExists){
        throw error(404,`Object with id:${objectID} do not exists`)
    }
    // else return object data
    const objectData:RouteObjectData = objectExists
    // convert Object id to string to avoid svelte kit error
    objectData['_id'] = objectData['_id'].toString()
    return { objectData }
}