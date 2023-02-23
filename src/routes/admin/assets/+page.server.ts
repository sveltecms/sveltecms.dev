import svelteCMS from "$svelteCMS"
import { ASSETS } from "$Stores"
import cms from "$Cms"
import type { PageServerLoad } from "./$types"

export const load:PageServerLoad = async({url})=> {
    const query = url.searchParams.get("q")
    const filter = query ? { name:new RegExp(query,"ig") } : null
    const assetsPerPage = svelteCMS.config.assetsPerPage
    const assets = await cms.Fetch.assets({filter,count:assetsPerPage })
    if(assets){
        // Set server store
        ASSETS.set(assets)
        // Return assets
        return { assets:assets,query } 
    }
    return { assets:[],query } 
}