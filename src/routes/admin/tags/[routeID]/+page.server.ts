import cms from "$Cms"
import svelteCMS from "$svelteCMS"
import type { PageServerLoad } from "./$types"

export const load:PageServerLoad = async({parent,url})=>{
    const parentData = await parent()
    const routeID = parentData.routeID
    const query = url.searchParams.get("q")
    const filter = query ? { name:new RegExp(query,"gi") } : {}
    const tags = await cms.Fetch.tags({filter,routeID,count:svelteCMS.config.tagsPerPage})
    return { tags,query }
}