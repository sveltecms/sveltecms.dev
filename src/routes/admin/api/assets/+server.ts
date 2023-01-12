import cms from "$Cms"
import db from "$Database"
import { json } from "@sveltejs/kit"
import svelteCMS from "$svelteCMS"
import { writeFileSync } from "fs"
import fs from "fs"
import { parse as parseFileInfo } from "path"
import { ObjectId } from "mongodb"
import type { AssetLoad,ApiAssetCreateLoad,ApiAssetCreateData,ApiAssetsSearchLoad,ApiAssetsSearchData } from "$Types"
import type { RequestHandler } from "./$types"
import type { ApiAssetDeleteData, ApiAssetDeleteLoad, ApiAssetUpdateData, ApiAssetUpdateLoad, AssetData, LinkedAssetData } from "$Types"

// GET / SEARCH ASSETS
export const PATCH:RequestHandler = async({request})=>{   
    const jsonData:ApiAssetsSearchLoad = await request.json()
    // Convert string to regular RegExp
    if(jsonData.filter){
        jsonData['filter']['name'] = new RegExp(jsonData['filter']['name'],"i")
    }
    const assets:ApiAssetsSearchData = await cms.Fetch.assets(jsonData)
    return json(assets)
}

// CREATE NEW ASSET
export const PUT:RequestHandler = async({request})=>{   
    const formData:ApiAssetCreateLoad = await request.formData();
    const file = formData.get('image') as File;
    const { ext:fileExtension,name:fileName } = parseFileInfo(file.name)
    /** We sent assetName on headers */
    const assetName = request.headers.get("assetName") ? request.headers.get("assetName") : fileName
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    // Save file
    const filePath = Date.now()+fileExtension
    const fileDiskPath = `${svelteCMS.diskPaths.assets}/images/${filePath}`
    try{
        writeFileSync(fileDiskPath,fileBuffer)
        const assetsCollection = db.collection(svelteCMS.collections.assets)
        const newAsset:AssetLoad = {
            name: assetName!,
            path: filePath,
            type: "image",
            extension: fileExtension.slice(1)
        }
        const newAssetDB = await assetsCollection.insertOne(newAsset)
        const response:ApiAssetCreateData = { ok:true,msg:"Asset created",...newAsset,_id:newAssetDB.insertedId }
        return json(response)
    }
    catch(error:any){
        const response:ApiAssetCreateData = { ok:false,msg:error.message }
        return json(response)
    }
}

// UPDATE ASSET
export const POST:RequestHandler = async({request})=>{
    /** Api load data */
    const jsonData:ApiAssetUpdateLoad = await request.json()
    const assetDbFilter = { _id: new ObjectId(jsonData._id)}
    const assetsCollection = db.collection(svelteCMS.collections.assets)
    const assetExists = await assetsCollection.findOne(assetDbFilter)
    // If asset do not exists
    if(!assetExists){
        const response:ApiAssetUpdateData = { ok:false,msg:"Asset do not exists" }
        return json(response)
    }
    // Update asset
    const assetSetData = jsonData
    const originalAssetSetData = { ...jsonData }
    // @ts-ignore
    delete assetSetData['_id']
    const assetUpdatedDB = await assetsCollection.updateOne(assetDbFilter,{$set:assetSetData})
    // If asset was updated
    if(assetUpdatedDB.acknowledged){
        handleAssetUpdated(originalAssetSetData)
        // Return response
        const response:ApiAssetUpdateData = { ok:true,msg:`Asset:${jsonData.name} was updated` }
        return json(response)
    }
    // Else if not updated
    const response:ApiAssetUpdateData = { ok:false,msg:`Error updating asset:${jsonData.name}` }
    return json(response)
}

// DELETE ASSET
export const DELETE:RequestHandler = async({request})=>{
    /** Api load data */
    const jsonData:ApiAssetDeleteLoad = await request.json()
    const assetDbFilter = { _id: new ObjectId(jsonData._id)}
    const assetsCollection = db.collection(svelteCMS.collections.assets)
    const assetExists = await assetsCollection.findOne(assetDbFilter)
    // If asset do not exists
    if(!assetExists){
        const response:ApiAssetDeleteData = { ok:false,msg:"Asset do not exists" }
        return json(response)
    }
    // Delete asset
    const assetDiskPath = `${svelteCMS.diskPaths.assets}/images/${jsonData.path}`
    const assetDeleted = await assetsCollection.deleteOne(assetDbFilter)
    // If asset was deleted
    if(assetDeleted){
        handleAssetDeleted(jsonData)
        fs.rmSync(assetDiskPath)
        const response:ApiAssetDeleteData = { ok:true,msg:`Asset:${jsonData.name} was deleted` }
        return json(response)
    }
    // If error deleting asset
    const response:ApiAssetDeleteData = { ok:false,msg:`Error deleting asset:${jsonData.name}` }
    return json(response)
}


/** Update asset where data is linked to */
async function handleAssetUpdated(newAssetData:AssetData){
    const linkedAssetsCollection = db.collection(svelteCMS.collections.linkedAssets)
    const linkedCollections = await linkedAssetsCollection.find().toArray() 
    for(const data of linkedCollections){
        const linkedAsset:LinkedAssetData = data as any
        const linkedCollection = db.collection(linkedAsset.collection)
        const filter = { [`${linkedAsset.target}._id`]:newAssetData._id }
        // Update asset where asset is being used
        const isListType = linkedAsset.target==="images"
        if(isListType) linkedCollection.updateMany(filter,{$set:{[`${linkedAsset.target}.$`]:newAssetData}})
        else linkedCollection.updateMany(filter,{$set:{[`${linkedAsset.target}`]:newAssetData}})
    }
}

/** Delete asset from objects, where asset is being used */
async function handleAssetDeleted(assetData:AssetData){
    const linkedAssetsCollection = db.collection(svelteCMS.collections.linkedAssets)
    const linkedCollections = await linkedAssetsCollection.find().toArray() 
    for(const data of linkedCollections){
        const linkedAsset:LinkedAssetData = data as any
        const linkedCollection = db.collection(linkedAsset.collection)
        const filter = { [`${linkedAsset.target}._id`]:assetData._id }
        // Replace with default asset
        const isListType = linkedAsset.target==="images"
        // @ts-ignore
        if(isListType) linkedCollection.updateMany(filter,{ $pull: { [`${linkedAsset.target}`]:{ _id:assetData._id } } })
        else linkedCollection.updateMany(filter,{ $set:{[`${linkedAsset.target}`]:svelteCMS.defaults.asset} })
    }
}