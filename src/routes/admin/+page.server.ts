import db from "cms/lib/db.server"
import handleSessions from "cms/custom/handleSessions.server"
import { ObjectId } from "mongodb"
import type { PageServerLoadEvent } from "./$types"

export const load = async(event:PageServerLoadEvent)=>{
    const appData = event.locals.appData
    const cmsPath = appData.config.cmsPath
    const assetsCol = db.collection("_assets")
    const routesCol = db.collection("_routes")
    const usersCol = db.collection("_users")

    // Delete expired sessions
    handleSessions(db)

    // Get assets count
    const assetsFilter = { _id:{$ne: new ObjectId("000000000000000000000000") } }
    const assets = await assetsCol.find(assetsFilter).limit(6).sort("_id","desc").map((data:any)=>{ data['_id']=data['_id'].toString() ; return data }).toArray()
    const assetsCount = await assetsCol.countDocuments(assetsFilter)

    const routes = await routesCol.find({}).limit(3).sort("_id","desc").map((data:any)=>{ data['_id']=data['_id'].toString() ; return data }).toArray()
    const routesCount = await routesCol.countDocuments()
    
    const usersFilter = { _id:{$ne: new ObjectId("000000000000000000000000") } }
    const users = await usersCol.find(usersFilter).limit(6).sort("_id","desc").map((data:any)=>{ data['_id']=data['_id'].toString() ; return data }).toArray()
    const usersCount = await usersCol.countDocuments(usersFilter)

    // result
    const stats = [
        { name:"Routes", count:routesCount, href:`${cmsPath}/routes` },
        { name:"Assets", count:assetsCount, href:`${cmsPath}/assets` },
        { name:"Users", count:usersCount, href:`${cmsPath}/users` }
    ]
    return { stats,users,assets,routes }
}