import cms from "$Cms"
import svelteCMS from "$svelteCMS"
import type { PageServerLoad } from "./$types"

export const load:PageServerLoad = async()=>{
    const users = await cms.Fetch.users({ filter:{},count:svelteCMS.config.usersPerPage })
    return { users }
}