import Utils from "cms/utils/server"
import customFuncs from "../../cms.hooks"
import type { Db } from "mongodb"
import type { RequestEvent,CreateRouteFunc } from "."

export default async function handleFunc(db:Db,event:RequestEvent,funcInputData:CreateRouteFunc['input'],json:Function) {
    const inputData:CreateRouteFunc['input'] = funcInputData
    const funcData = inputData.data
    // run user hook function
    const hookFuncResponse = await customFuncs.beforeAdding.route(db,funcInputData.data)
    if(!hookFuncResponse.ok){
        const response:CreateRouteFunc['output'] = {
            ok:false,
            msg:hookFuncResponse.msg
        }
        return json(response)
    }
    // check if routeID start with _
    const wrongRouteID = funcData.ID.startsWith("_")
    if(wrongRouteID){
        const response:CreateRouteFunc['output'] = {
            ok:false,
            msg:`Route ID can not start with _`
        }
        return json(response) 
    }
    // check if route exists
    const routesCol = db.collection("_routes")
    const routeExists = await routesCol.findOne({ ID:funcData.ID })
    // if route exists
    if(routeExists){
        const response:CreateRouteFunc['output'] = {
            ok:false,
            msg:`Route with ID:${funcData.ID} already exists`
        }
        return json(response)
    }
    // handle linking routes
    await handleLinkedRoute(db,inputData)
    // handle linking assets
    await handleLinkedAsset(db,inputData)
    // else create route
    const routeInserted = await routesCol.insertOne(funcData)
    if(routeInserted.acknowledged){
        const response:CreateRouteFunc['output'] = {
            ok:true,
            msg:`Route ${funcData.ID} was created`,
            data:{...funcData,_id:routeInserted.insertedId.toString()}
        }
        return json(response)
    }
    // else something went wrong
    const response:CreateRouteFunc['output'] = {
        ok:false,
        msg:"Something went wrong"
    }
    return json(response)
}

/** Handle linking assets */
async function handleLinkedAsset(db:Db,inputData:CreateRouteFunc['input']){
    const elements = inputData['data'].elements
    const routeID = inputData['data'].ID
    const linkedKeys = Utils.getLinkedAssetKeys(elements,routeID)
    // create link
    const linksCol = db.collection("_linkedAssets")
    for(const link of linkedKeys){
        await linksCol.insertOne(link)
    }
}

/** Handle linking routes */
async function handleLinkedRoute(db:Db,inputData:CreateRouteFunc['input']){
    const elements = inputData['data'].elements
    const routeID = inputData['data'].ID
    const linkedKeys = Utils.getLinkedRouteKeys(elements,routeID)
    // create link
    const linksCol = db.collection("_linkedRoutes")
    for(const link of linkedKeys){
        await linksCol.insertOne(link)
    }
}