import type { Db } from "mongodb"
import type { RequestEvent,GetRoutesFunc } from "."
import type { RouteData } from "cms/types"

export default async function handleFunc(db:Db,event:RequestEvent,funcInputData:any,json:Function) {
    const inputData:GetRoutesFunc['input'] = funcInputData
    const funcData = inputData.data
    const count = funcData.count
    const routesCol = db.collection("_routes")
    // get routes
    const routes = await routesCol.find({}).limit(count).toArray() as RouteData[]
    const response:GetRoutesFunc['output'] = {
        ok:true,
        msg:"List of routes",
        data:routes
    }
    return json(response)
}