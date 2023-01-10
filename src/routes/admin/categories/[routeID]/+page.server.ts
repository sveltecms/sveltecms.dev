import cms from "$Cms"
import svelteCMS from "$svelteCMS"
import type { PageServerLoad } from "./$types"

export const load:PageServerLoad = async({parent})=>{
    // If routeID do not exists, +layout.server.ts will throw error
    const parentData = await parent()
    const routeID = parentData.routeID
    const categories = await cms.Fetch.categories({routeID,count:svelteCMS.config.categoriesPerPage,filter:{}})
    return { categories }
}