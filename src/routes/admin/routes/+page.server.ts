import cms from "$Cms"
import svelteCMS from "$svelteCMS"
import type { PageServerLoad } from "./$types"

export const load:PageServerLoad = async()=>{
    const routes = await cms.Fetch.routes({ filter:{},count:svelteCMS.config.routesPerPage })
    return { routes }
}