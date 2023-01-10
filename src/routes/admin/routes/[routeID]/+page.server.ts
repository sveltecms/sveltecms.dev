import cms from "$Cms"
import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load:PageServerLoad =async({params}) => {
    const routeID = params.routeID
    /** Route data object, if founded and null if it do not exists */
    const routeData = await cms.Fetch.route({ ID:routeID })
    // Throw error if route do not exists
    if(!routeData) throw error(404, {message:`Route:${routeID} do not exists`})
    // Else return route data
    return { routeData }
}