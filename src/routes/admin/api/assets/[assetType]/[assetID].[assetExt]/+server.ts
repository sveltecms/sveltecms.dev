import svelteCMS from "$svelteCMS"
import type { RequestHandler } from "@sveltejs/kit"
import fs from "fs"

export const GET:RequestHandler = async({params})=>{
    // Get file info
    const { assetType, assetID, assetExt } = params
    const filePath = `${svelteCMS.paths.assets}/${assetType}/${assetID}.${assetExt}`
    const fileExists = fs.existsSync(filePath)
    // Check if file exists
    if(fileExists){
        const file = fs.readFileSync(filePath)
        const response = new Response(file)
        response.headers.set("Cache-Control","public, max-age=86400")
        response.headers.append("Content-Type",`image/${assetExt}`)
        return response
    }
    // Return default asset
    return new Response("File not founded")
}