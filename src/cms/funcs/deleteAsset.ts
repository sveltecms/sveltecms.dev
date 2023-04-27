import Utils from "cms/utils/server"
import { ObjectId } from "mongodb"
import customFuncs from "../../cms.hooks"
import type { Db } from "mongodb"
import type { RequestEvent,DeleteAssetFunc } from "."
import type { AssetData, LinkedAssetData } from "cms/types"

export default async function handleFunc(db:Db,event:RequestEvent,funcInputData:DeleteAssetFunc['input'],json:Function) {
    // run user hook function
    const hookFuncResponse = await customFuncs.beforeDeleting.asset(db,funcInputData.data)
    if(!hookFuncResponse.ok){
        const response:DeleteAssetFunc['output'] = {
            ok:false,
            msg:hookFuncResponse.msg
        }
        return json(response)
    }
    // Run code
    const inputData:DeleteAssetFunc['input'] = funcInputData
    const funcData = inputData.data
    let response:DeleteAssetFunc['output']
    // delete
    const assetsCol = db.collection("_assets")
    const deleteRes = await assetsCol.deleteOne({ _id:new ObjectId(funcData._id)})
    if(deleteRes.acknowledged){
        // delete from cloudinary
        await Utils.Cloudinary.deleteFile(funcData.publicID)
        response = {
            ok:true,
            msg:`Asset was deleted`,
            data:funcData
        }
        // handle asset deleted
        handleAssetDeletion(db,funcData)
        return json(response)
    }
    // return error
    response = {
        ok:false,
        msg:`Something went wrong`
    }
    return json(response)
}

/** Remove deleted asset from any linked object */
async function handleAssetDeletion(db:Db,inputData:DeleteAssetFunc['input']['data']) {
    // get default asset
    const assetFilter = { _id:new ObjectId("000000000000000000000000") }
    const defaultAsset = await db.collection("_assets").findOne(assetFilter) as AssetData
    // run my code
    const linkedAssetsCol = db.collection("_linkedAssets")
    const linkedAssets = await linkedAssetsCol.find({}).toArray() as LinkedAssetData[]
    /** All routes linked to current route object element */
    for(const linkedAsset of linkedAssets){
        const collection = db.collection(linkedAsset.fromRouteID)
        const filter = { [`${linkedAsset.fromKey}._id`]:inputData._id }
        const pullFilter = { [linkedAsset.fromKey]:{_id:inputData._id } }
        // if only one asset, replace asset with default asset
        if(linkedAsset.oneAsset){
            collection.updateMany(filter,{$set:{ [linkedAsset.fromKey]:defaultAsset }})
        }else{
            // @ts-ignore delete objects where it contains updated object
            collection.updateMany(filter,{ $pull:pullFilter })
        }
    }
    // update any admin using this asset
    db.collection("_users").updateMany({ "image._id":inputData._id }, { $set: {"image":defaultAsset} })
}