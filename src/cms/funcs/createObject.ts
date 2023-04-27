import Utils from "cms/utils/server"
import customFuncs from "../../cms.hooks"
import type { Db } from "mongodb"
import type { RequestEvent,CreateObjectFunc } from "."

export default async function handleFunc(db:Db,event:RequestEvent,funcInputData:CreateObjectFunc['input'],json:Function) {
    // run user hook function
    const hookPassed = await customFuncs.beforeAdding.object(db,funcInputData.data)
    if(!hookPassed.ok){
        const response:CreateObjectFunc['output'] = {
            ok:false,
            msg:hookPassed.msg
        }
        return json(response)
    }
    // Run code
    const inputData:CreateObjectFunc['input'] = funcInputData
    const funcData = inputData.data
    const elements = funcData.elements
    const routeID = funcData.routeID
    const objectData = Utils.elementsToObject(elements)
    const objectsCol = db.collection(routeID)
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