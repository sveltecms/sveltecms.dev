import db from "cms/lib/db.server"
import { ObjectId } from "mongodb"
import type { RequestEvent,DeleteObjectFunc } from "."
import type { LinkedRouteData } from "cms/types"

export default async function handleFunc(event:RequestEvent,funcInputData:any,json:Function) {
    const inputData:DeleteObjectFunc['input'] = funcInputData
    const funcData = inputData.data
    // check if route object exists
    const objectsCol = db.collection(funcData.routeID)
    const filter = { _id:new ObjectId(funcData.object._id) }
    const objectExists = await objectsCol.findOne(filter)
    // if object do not exists
    if(!objectExists){
        const response:DeleteObjectFunc['output'] = {
            ok:false,
            msg:`Object with id:${funcData.object._id} do not exists`
        }
        return json(response)
    }
    // else delete object
    const deletedObject = await objectsCol.deleteOne(filter)
    if(deletedObject.acknowledged){
        const response:DeleteObjectFunc['output'] = {
            ok:true,
            msg:`Object with id:${funcData.object._id} was deleted`,
            data:funcData.object
        }
        // handle object deletion
        handleObjectDeletion(funcData.routeID,funcData.object._id)
        return json(response)
    }
    // else something went wrong
    const response:DeleteObjectFunc['output'] = {
        ok:false,
        msg:"Something went wrong"
    }
    return json(response)
}

/** Remove object in routes objects where it includes current deleted object as a value */
async function handleObjectDeletion(routeID:string,objectID:string) {
    const linkedRoutesCol = db.collection("_linkedRoutes")
    const filter = { toRouteID:routeID }
    /** All routes linked to current route object element */
    const routesLinks = await linkedRoutesCol.find(filter).toArray() as LinkedRouteData[]
    for(const route of routesLinks){
        const collection = db.collection(route.fromRouteID)
        const filter = { [`${route.fromKey}._id`]:objectID }
        const pullFilter = { [route.fromKey]:{_id:objectID } }
        // @ts-ignore delete objects where it contains updated object
        collection.updateMany(filter,{ $pull:pullFilter })
    }
}