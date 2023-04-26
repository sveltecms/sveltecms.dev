import Utils from "cms/utils/server"
import db from "cms/lib/db.server"
import path from "path"
import fs from "fs"
import { CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY } from "$env/static/private"
import type { RequestEvent,UploadFileFunc } from "."
import type { AssetLoad } from "cms/types"

// <form action="https://api.cloudinary.com/v1_1/{your-cloud-name}/image/upload" method="post" enctype="multipart/form-data">
//   <input type="file" name="file" />
//   <input type="text" name="upload_preset" value="{your-upload-preset}" />
//   <input type="text" name="api_key" value="{your-api-key}" />
//   <input type="submit" value="Upload" />
// </form>

const apiUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
// TODO: handle errors
export default async function handleFunc(event:RequestEvent,funcInputData:any,json:Function) {
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