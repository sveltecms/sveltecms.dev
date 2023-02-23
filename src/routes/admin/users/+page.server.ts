import cms from "$Cms"
import svelteCMS from "$svelteCMS"
import type { PageServerLoad } from "./$types"

export const load:PageServerLoad = async({url})=>{
    const query = url.searchParams.get("q")
    const filter = query ? { firstName:new RegExp(query,"gi") } : {}
    const users = await cms.Fetch.users({ filter:filter,count:svelteCMS.config.usersPerPage })
    return { users,query }
}