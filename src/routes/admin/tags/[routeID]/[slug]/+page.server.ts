import cms from "$Cms"
import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import type { TagData } from "$Types"

export const load:PageServerLoad = async({params,parent})=>{
    await parent()
    // If we here is because route exists when we ran parent() > +layout.ts
    const routeID = params.routeID
    const tagSlug = params.slug
    const tagData = await cms.Fetch.tag({slug:tagSlug,routeID})
    // If tag do not exists
    if(!tagData) throw error(404,`Tag:${tagSlug} do not exists`)
    // Else return tag
    tagData['_id'] = tagData['_id'].toString()
    const tag:TagData = tagData
    return { tag }
}