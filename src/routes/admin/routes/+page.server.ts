import cms from "$Cms"
import svelteCMS from "$svelteCMS"
import type { PageServerLoad } from "./$types"

export const load:PageServerLoad = async({url})=>{
    const query = url.searchParams.get("q")
    const filter = query ? { title:new RegExp(query,"gi") } : {}
    const routes = await cms.Fetch.routes({ filter,count:svelteCMS.config.routesPerPage })
    return { routes,query }
}