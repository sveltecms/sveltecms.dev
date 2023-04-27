import Utils from "cms/utils/server"
import customFuncs from "../../cms.hooks"
import { ObjectId } from "mongodb"
import type { Db } from "mongodb"
import type { RequestEvent,UpdateRouteFunc } from "."

export default async function handleFunc(db:Db,event:RequestEvent,funcInputData:UpdateRouteFunc['input'],json:Function) {
    // run user hook function
    const hookPassed = await customFuncs.beforeUpdating.route(db,funcInputData.data)
    if(!hookPassed.ok){
        const response:UpdateRouteFunc['output'] = {
            ok:false,
            msg:hookPassed.msg
        }
        return json(response)
    }
    // Run code
    const inputData:UpdateRouteFunc['input'] = funcInputData
    const funcData = inputData.data
    // check if route exists
    const routesCol = db.collection("_routes")
    const routeExists = await routesCol.findOne({ ID:funcData.ID })
    // if route do not exists
    if(!routeExists){
        const response:UpdateRouteFunc['output'] = {
            ok:false,
            msg:`Route with ID:${funcData.ID} do not exists`
        }
        return json(response)
    }
    // handle linking routes
    await handleLinkedRoute(db,inputData)
    // handle linking assets
    await handleLinkedAsset(db,inputData)
    // else update route
    const dataToSet = {...funcData}
    delete dataToSet['_id']
    const routeUpdated = await routesCol.updateOne({_id:new ObjectId(funcData._id)},{$set:dataToSet})
    if(routeUpdated.acknowledged){
        const response:UpdateRouteFunc['output'] = {
            ok:true,
            msg:`Route ${funcData.ID} was updated`,
            data: funcData
        }
        return json(response)
    }
    // else something went wrong
    const response:UpdateRouteFunc['output'] = {
        ok:false,
        msg:"Something went wrong"
    }
    return json(response)
}


/** Handle linking assets */
async function handleLinkedAsset(db:Db,inputData:UpdateRouteFunc['input']){
    const elements = inputData['data'].elements
    const routeID = inputData['data'].ID
    const linkedKeys = Utils.getLinkedAssetKeys(elements,routeID)
    // create link
    const linksCol = db.collection("_linkedAssets")
    for(const link of linkedKeys){
        // check if link connection exists
        const linkExists = await linksCol.findOne(link)
        // if link do not exists
        if(!linkExists) await linksCol.insertOne(link)
    }
}

/** Handle linking routes */
async function handleLinkedRoute(db:Db,inputData:UpdateRouteFunc['input']){
    const elements = inputData['data'].elements
    const routeID = inputData['data'].ID
    const linkedKeys = Utils.getLinkedRouteKeys(elements,routeID)
    // create link
    const linksCol = db.collection("_linkedRoutes")
    for(const link of linkedKeys){
        // check if link connection exists
        const linkExists = await linksCol.findOne(link)
        // if link do not exists
        if(!linkExists) await linksCol.insertOne(link)
    }
}