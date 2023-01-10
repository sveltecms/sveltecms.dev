import cms from "$Cms"
import svelteCMS from "$svelteCMS"
import type { PageServerLoad } from "./$types"

export const load:PageServerLoad = async({params,parent})=>{
    await parent()
    // If route is not founded, +layout.server.ts will throw an error
    const routeID = params.routeID
    const routeObjects = await cms.Fetch.routeObjects({
        count:svelteCMS.config.objectsPerPage,
        routeID:routeID,
        pageNumber:1,
        filter:{}
    })
    return { routeObjects }
}