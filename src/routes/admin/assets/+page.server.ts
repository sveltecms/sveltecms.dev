import svelteCMS from "$svelteCMS"
import { ASSETS } from "$Stores"
import cms from "$Cms"
import type { PageServerLoad } from "./$types"

export const load:PageServerLoad = async()=> {
    const assetsPerPage = svelteCMS.config.assetsPerPage
    const assets = await cms.Fetch.assets({filter:null,count:assetsPerPage })
    if(assets){
        // Set server store
        ASSETS.set(assets)
        // Return assets
        return { assets:assets } 
    }
    return { assets:[] } 
}