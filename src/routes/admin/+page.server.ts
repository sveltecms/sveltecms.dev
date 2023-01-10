import cms from "$Cms"
import svelteCMS from "$svelteCMS"
import type { PageServerLoad } from "./$types"

export const load:PageServerLoad = async ()=>{
    // Get assets count
    const assets = await cms.Fetch.assets({count:svelteCMS.config.assetsPerPage,filter:null})
    const assetsCount = await cms.Fetch.assetsCount()
    // Get routes count
    const routesCount = await cms.Fetch.routesCount()
    const routes = await cms.Fetch.routes({ filter:{},count:svelteCMS.config.routesPerPage })
    // Get users count
    const usersCount = await cms.Fetch.usersCount()
    const users = await cms.Fetch.users({ filter:{},count:svelteCMS.config.usersPerPage })
    // result
    const stats = [
        { name:"Routes", count:routesCount, href:"/admin/routes" },
        { name:"Assets", count:assetsCount, href:"/admin/assets" },
        { name:"Users", count:usersCount, href:"/admin/users" }
    ]
    return { stats,users,assets,routes }
}