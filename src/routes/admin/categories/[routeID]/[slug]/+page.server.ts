import cms from "$Cms"
import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import type { CategoryData } from "$Types"

export const load:PageServerLoad = async({params,parent})=>{
    await parent()
    // If we here is because route exists when we ran parent() > +layout.ts
    const routeID = params.routeID
    const categorySlug = params.slug
    const categoryData = await cms.Fetch.category({slug:categorySlug,routeID})
    // If category do not exists
    if(!categoryData) throw error(404,`Category:${categorySlug} do not exists`)
    // Else return category
    categoryData['_id'] = categoryData['_id'].toString()
    const category:CategoryData = categoryData
    return { category }
}