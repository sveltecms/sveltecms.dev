import db from "cms/lib/db.server"
import Utils from "cms/utils/server"
import { beforeAddingObject } from "cms/hooks"
import type { RequestEvent,CreateObjectFunc } from "."

export default async function handleFunc(event:RequestEvent,funcInputData:any,json:Function) {
    const inputData:CreateObjectFunc['input'] = funcInputData
    const funcData = inputData.data
    const elements = funcData.elements
    const routeID = funcData.routeID
    const objectData = Utils.elementsToObject(elements)
    const objectsCol = db.collection(routeID)
    // run user hook
    const hookPassed = await beforeAddingObject(db,funcData)
    if(!hookPassed.ok){
        const response:CreateObjectFunc['output'] = {
            ok:false,
            msg:hookPassed.msg
        }
        return json(response)
    }
    // Insert object
    const objectInserted = await objectsCol.insertOne(objectData)
    if(objectInserted.acknowledged){
        const response:CreateObjectFunc['output'] = {
            ok:true,
            msg:`Object was inserted into route ${routeID}`,
            data:{...objectData,_id:objectInserted.insertedId.toString()}
        }
        return json(response)
    }
    // else something went wrong
    const response:CreateObjectFunc['output'] = {
        ok:false,
        msg:"Something went wrong"
    }
    return json(response)
}