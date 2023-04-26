import db from "cms/lib/db.server"
import type { RequestEvent,DeleteRouteFunc } from "."
import type { LinkedRouteData } from "cms/types"

export default async function handleFunc(event:RequestEvent,funcInputData:any,json:Function) {
    const inputData:DeleteRouteFunc['input'] = funcInputData
    const funcData = inputData.data
    // check if route exists
    const routesCol = db.collection("_routes")
    const routeExists = await routesCol.findOne({ ID:funcData.ID })
    // if route do not exists
    if(!routeExists){
        const response:DeleteRouteFunc['output'] = {
            ok:false,
            msg:`Route with ID:${funcData.ID} do not exists`
        }
        return json(response)
    }
    // else delete route
    const routeDeleted = await routesCol.deleteOne({ ID:funcData.ID })
    if(routeDeleted.acknowledged){
        const response:DeleteRouteFunc['output'] = {
            ok:true,
            msg:`Route ${funcData.ID} was deleted`,
            data: funcData
        }
        // Handle route deleted
        handleRouteDeleted(funcData)
        return json(response)
    }
    // else something went wrong
    const response:DeleteRouteFunc['output'] = {
        ok:false,
        msg:"Something went wrong"
    }
    return json(response)
}

/** Remove object from any other object linked to route */
async function handleRouteDeleted(funcData:DeleteRouteFunc['input']['data']){
    const linkedRoutesCol = db.collection("_linkedRoutes")
    const routesLinks = await linkedRoutesCol.find({ toRouteID:funcData.ID }).toArray() as LinkedRouteData[]
    // Loop all linked routes linking to this route
    for(const route of routesLinks){
        const collection = db.collection(route.fromRouteID)
        const filter = { [route.fromKey]:{ $exists:true }}
        await collection.updateMany(filter,{ $unset:{ [route.fromKey]:"" } })
        const pullFilter = { elements:{ linkTo:funcData.ID } }
        // @ts-ignore Remove deleted route from route elements
        await db.collection("_routes").updateMany({ ID:route.fromRouteID },{ $pull:pullFilter })
    }
    // Delete linked route from LinkedRoutes collection
    await db.collection("_linkedRoutes").deleteMany({ toRouteID:funcData.ID })
    // Delete linked assets from LinkedAssets collection
    await db.collection("_linkedAssets").deleteMany({ fromRouteID:funcData.ID })
    // Delete routes from routes
    await db.collection("_routes").deleteMany({ ID:funcData.ID })
    // Delete the route it self
    try{ db.collection(funcData.ID).drop() }
    catch{}
}