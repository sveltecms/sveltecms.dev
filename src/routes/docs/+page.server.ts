import cms from "$Cms"
import type { PagesObjectData } from "$Types/dynamically"
import type { PageServerLoad } from "./$types"

export const load:PageServerLoad = async () => {
    const page = await cms.Fetch.routeObject("pages",{ slug:"docs" }) as PagesObjectData
    return { page }
}