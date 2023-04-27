import Utils from "cms/utils/server"
import path from "path"
import type { Db } from "mongodb"
import type { RequestEvent,UploadFileFunc } from "."
import type { AssetLoad } from "cms/types"

// TODO: handle errors
export default async function handleFunc(db:Db,event:RequestEvent,funcInputData:any,json:Function) {
    const formData = await event.request.formData()
    const file = formData.get('image') as File
    const { ext:fileExtension,name:fileName } = path.parse(file.name)
    const cloudinaryResp = await Utils.Cloudinary.uploadFormFile(file)
    const newAssetData:AssetLoad = {
        publicID: cloudinaryResp.public_id,
        assetID: cloudinaryResp.asset_id,
        src: cloudinaryResp.secure_url,
        title: fileName,
        type: cloudinaryResp.resource_type,
        extension: cloudinaryResp.format
    }
    const insertedAssetRes = await db.collection("_assets").insertOne(newAssetData)
    const response:UploadFileFunc['output'] = {
        ok:true,
        msg:"File was uploaded",
        data:{ ...newAssetData,_id:insertedAssetRes.insertedId.toString() }
    }
    return json(response)
}