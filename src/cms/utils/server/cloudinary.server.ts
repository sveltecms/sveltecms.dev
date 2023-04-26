import { CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_KEY_SECRET } from "$env/static/private"
import { v2 as CloudinaryApi } from "cloudinary"

CloudinaryApi.config({
    cloud_name:CLOUDINARY_CLOUD_NAME,
    api_key:CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_API_KEY_SECRET
})


export default new class Cloudinary {
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