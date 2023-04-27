import type { Db } from "mongodb"
import type { RequestEvent,SearchObjectsFunc } from "."
import type { RouteObjectData } from "cms/types"

export default async function handleFunc(db:Db,event:RequestEvent,funcInputData:any,json:Function) {
    const inputData:SearchObjectsFunc['input'] = funcInputData
    const funcData = inputData.data
    const routeID = funcData.routeID
    const filter = { [funcData.filter.key]:new RegExp(funcData.filter.value,"ig")}
    const count = funcData.count
    const objectsCol = db.collection(routeID)
    const objects = await objectsCol.find(filter).sort("_id","desc").limit(count).toArray() as RouteObjectData[]
    const response:SearchObjectsFunc['output'] = {
        ok:true,
        msg:"List of objects",
        data:objects
    }
    return json(response)
}