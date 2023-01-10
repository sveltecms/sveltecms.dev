import cms from "$Cms"
import svelteCMS from "$svelteCMS"
import type { PageServerLoad } from "./$types"

export const load:PageServerLoad = async({parent})=>{
    // If routeID do not exists, +layout.server.ts will throw error
    const parentData = await parent()
    const routeID = parentData.routeID
    const tags = await cms.Fetch.tags({routeID,count:svelteCMS.config.tagsPerPage,filter:{}})
    return { tags }
}