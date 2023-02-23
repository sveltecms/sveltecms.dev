import cms from "$Cms"
import svelteCMS from "$svelteCMS"
import { ObjectId } from "mongodb"
import type { PageServerLoad } from "./$types"

export const load:PageServerLoad = async({params,parent,url})=>{
    await parent()
    // If route is not founded, +layout.server.ts will throw an error
    const routeID = params.routeID
    const query = url.searchParams.get("q")
    const correctId = query && query.length === 24
    const filter = correctId ? { _id:new ObjectId(query) } : { }
    const routeObjects = await cms.Fetch.routeObjects({
        count:svelteCMS.config.objectsPerPage,
        routeID:routeID,
        pageNumber:1,
        filter
    })
    return { routeObjects,query }
}