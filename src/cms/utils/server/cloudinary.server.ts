import { CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_KEY_SECRET } from "$env/static/private"
import { v2 as CloudinaryApi } from "cloudinary"

CloudinaryApi.config({
    cloud_name:CLOUDINARY_CLOUD_NAME,
    api_key:CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_API_KEY_SECRET
})


export default new class Cloudinary {

    /** Upload form file */
    async uploadFormFile(file:File){
        const apiUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
        const newFormData = new FormData()
        // Create a timestamp for the signature
        const timestamp = Math.round(new Date().getTime() / 1000).toString()
        // Set the upload preset and any other parameters you want to include in the request
        const params = { timestamp, upload_preset: 'ml_default' }
        // Generate the signature using the Cloudinary SDK's sign_request() method
        const signature = CloudinaryApi.utils.sign_request(params, { api_secret:CLOUDINARY_API_KEY_SECRET });
        newFormData.append("file",file)
        newFormData.append("upload_preset","ml_default")
        newFormData.append("timestamp",timestamp)
        newFormData.append("signature",signature.signature)
        newFormData.append("api_key",CLOUDINARY_API_KEY)
        const cloudinaryResp = await fetch(apiUrl,{
            method:"POST",
            body:newFormData
        })
        return cloudinaryResp.json()
    }

    /** Upload file */
    async uploadFile(filePath:string){
        return CloudinaryApi.uploader.upload(filePath)
    }
    /** Remove/Delete file */
    async deleteFile(publicID:string){
        return await CloudinaryApi.uploader.destroy(publicID)
    }
    /** Search files */
    async searchFile(expression:string){
        const response = CloudinaryApi.search.expression(expression)
        return response.execute()
    }
}