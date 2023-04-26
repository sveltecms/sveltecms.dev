import Utils from "cms/utils/server"
import db from "cms/lib/db.server"
import path from "path"
import fs from "fs"
import type { RequestEvent,UploadFileFunc } from "."
import type { AssetLoad } from "cms/types"

// TODO: handle errors
export default async function handleFunc(event:RequestEvent,funcInputData:any,json:Function) {
    const formData = await event.request.formData()
    const file = formData.get('image') as File
    const { ext:fileExtension,name:fileName } = path.parse(file.name)
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const newFileName = Date.now()+fileExtension
    fs.writeFileSync(newFileName,fileBuffer)
    const res = await Utils.Cloudinary.uploadFile(newFileName)
    fs.rmSync(newFileName)
    const newAssetData:AssetLoad = {
        publicID: res.public_id,
        assetID: res.asset_id,
        src: res.secure_url,
        title: fileName,
        type: res.resource_type,
        extension: res.format
    }
    const insertedAssetRes = await db.collection("_assets").insertOne(newAssetData)
    const response:UploadFileFunc['output'] = {
        ok:true,
        msg:"File was uploaded",
        data:{ ...newAssetData,_id:insertedAssetRes.insertedId.toString() }
    }
    return json(response)
}