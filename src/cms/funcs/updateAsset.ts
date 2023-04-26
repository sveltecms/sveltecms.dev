import db from "cms/lib/db.server"
import type { RequestEvent,UpdateAssetFunc } from "."
import { ObjectId } from "mongodb"
import type { LinkedAssetData, LinkedRouteData, RouteObjectData } from "cms/types"

// TODO: update asset on any linked data
export default async function handleFunc(event:RequestEvent,funcInputData:any,json:Function) {
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
        handleAssetChanges(funcData)
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
async function handleAssetChanges(assetData:UpdateAssetFunc['input']['data']) {
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