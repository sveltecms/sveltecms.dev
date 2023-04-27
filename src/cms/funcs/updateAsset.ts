import { ObjectId } from "mongodb"
import customFuncs from "../../cms.hooks"
import type { Db } from "mongodb"
import type { RequestEvent,UpdateAssetFunc } from "."
import type { LinkedAssetData } from "cms/types"

// TODO: update asset on any linked data
export default async function handleFunc(db:Db,event:RequestEvent,funcInputData:UpdateAssetFunc['input'],json:Function) {
    // run user hook function
    const hookFuncResponse = await customFuncs.beforeUpdating.asset(db,funcInputData.data)
    if(!hookFuncResponse.ok){
        const response:UpdateAssetFunc['output'] = {
            ok:false,
            msg:hookFuncResponse.msg
        }
        return json(response)
    }
    // Run code
    const inputData:UpdateAssetFunc['input'] = funcInputData
    const funcData = inputData.data
    let response:UpdateAssetFunc['output']
    let newAssetData = { ...funcData }
    // remove _id from new asset data object
    delete newAssetData['_id']
    // update data
    const assetsCol = db.collection("_assets")
    const updateRes = await assetsCol.updateOne({ _id:new ObjectId(funcData._id)},{ $set:newAssetData})
    if(updateRes.acknowledged){
        // Handle asset changes
        handleAssetChanges(db,funcData)
        // Return response
        response = {
            ok:true,
            msg:`Asset updated`,
            data:funcData 
        }
        return json(response)
    }
    // return error
    response = {
        ok:false,
        msg:`Something went wrong`
    }
    return json(response)
}

/** Update asset where asset is linked from */
async function handleAssetChanges(db:Db,assetData:UpdateAssetFunc['input']['data']) {
    const linkedRoutesCol = db.collection("_linkedAssets")
    const linkedAssets = await linkedRoutesCol.find({}).toArray() as LinkedAssetData[]
    // Loop all linked assets
    for(const linkedAsset of linkedAssets){
        const collection = db.collection(linkedAsset.fromRouteID)
        const filter = { [`${linkedAsset.fromKey}._id`]:assetData._id }
        // if asset is a single asset being linked
        if(linkedAsset.oneAsset){
            collection.updateMany(filter,{ $set: {[linkedAsset.fromKey]:assetData} })
        }
        // if asset is linked to multiple assets key
        else{
            collection.updateMany(filter,{$set:{[`${linkedAsset.fromKey}.$`]:assetData}})
        }
    }
    // update any admin using this asset
    db.collection("_users").updateMany({ "image._id":assetData._id }, { $set: {"image":assetData} })
}