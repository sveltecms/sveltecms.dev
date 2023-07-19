import Utils from "cms/utils/server"
import path from "path"
import type { Db } from "mongodb"
import type { RequestEvent,UploadUrlFileFunc } from "."
import type { AssetLoad } from "cms/types"

// TODO: handle errors
export default async function handleFunc(db:Db,event:RequestEvent,funcInputData:UploadUrlFileFunc['input'],json:Function) {
    const fileUrl = funcInputData.data.url
    const userAgent = event.request.headers.get("user-agent") || ""
    const request = await fetch(fileUrl,{ headers:{ "user-agent":userAgent }})
    // if page was not founded
    if(request.status!==200){
        const response:UploadUrlFileFunc['output'] = {
            ok:false,
            msg:"Url file was not founded"
        }
        return json(response)
    }
    // Else upload file
    const imageExt = path.extname(fileUrl).slice(1).trim();
    const fileName = path.basename(fileUrl).split(`.${imageExt}`)[0].trim();
    const cloudinaryResp = await Utils.Cloudinary.uploadFile(fileUrl)
    const newAssetData:AssetLoad = {
        publicID: cloudinaryResp.public_id,
        assetID: cloudinaryResp.asset_id,
        src: cloudinaryResp.secure_url,
        title: fileName,
        type: cloudinaryResp.resource_type,
        extension: cloudinaryResp.format
    }
    const insertedAssetRes = await db.collection("_assets").insertOne(newAssetData)
    const response:UploadUrlFileFunc['output'] = {
        ok:true,
        msg:"File was uploaded",
        data:{ ...newAssetData,_id:insertedAssetRes.insertedId.toString() }
    }
    return json(response)
}