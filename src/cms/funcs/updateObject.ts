import db from "cms/lib/db.server"
import { ObjectId } from "mongodb"
import Utils from "cms/utils/server"
import { beforeUpdatingObject } from "cms/hooks"
import type { RequestEvent,UpdateObjectFunc } from "."
import type { LinkedRouteData } from "cms/types"

export default async function handleFunc(event:RequestEvent,funcInputData:any,json:Function) {
    const inputData:UpdateObjectFunc['input'] = funcInputData
    const funcData = inputData.data
    const elements = funcData.elements
    const routeID = funcData.routeID
    const objectData = Utils.elementsToObject(elements)
    const objectID = funcData.objectID
    const objectsCol = db.collection(routeID)
    // run user hook
    const hookPassed = await beforeUpdatingObject(db,funcData)
    if(!hookPassed.ok){
        const response:UpdateObjectFunc['output'] = {
            ok:false,
            msg:hookPassed.msg
        }
        return json(response)
    }
    // Update object
    const filter = { _id:new ObjectId(objectID) }
    const dataToSet = { ...objectData }
    delete dataToSet['_id']
    const objectUpdated = await objectsCol.updateOne(filter,{ $set:dataToSet })
    if(objectUpdated.acknowledged){
        const response:UpdateObjectFunc['output'] = {
            ok:true,
            msg:`Object id:${objectID} was updated`,
            data:{...objectData,_id:objectID }
        }
        // handle object update
        handleObjectChanges(routeID,objectID,dataToSet)
        return json(response)
    }
    // else something went wrong
    const response:UpdateObjectFunc['output'] = {
        ok:false,
        msg:"Something went wrong"
    }
    return json(response)
}

/** Update object in routes objects where it includes current updated object as a value */
async function handleObjectChanges(routeID:string,objectID:string,dataToSet:{[key:string]:any}) {
    dataToSet = { _id:objectID,...dataToSet }
    const linkedRoutesCol = db.collection("_linkedRoutes")
    const filter = { toRouteID:routeID }
    /** All routes linked to current route object element */
    const routesLinks = await linkedRoutesCol.find(filter).toArray() as LinkedRouteData[]
    for(const route of routesLinks){
        const collection = db.collection(route.fromRouteID)
        const filter = { [`${route.fromKey}._id`]:objectID }
        // update objects where it contains updated object
        collection.updateMany(filter,{$set:{[`${route.fromKey}.$`]:dataToSet}})
    }
}