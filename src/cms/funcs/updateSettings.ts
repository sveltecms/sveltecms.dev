import { ObjectId } from "mongodb"
import customFuncs from "../../cms.hooks"
import type { Db } from "mongodb"
import type { RequestEvent,UpdateSettingFunc } from "."

export default async function handleFunc(db:Db,event:RequestEvent,funcInputData:UpdateSettingFunc['input'],json:Function) {
    // run user hook function
    const hookPassed = await customFuncs.beforeUpdating.setting(db,funcInputData.data)
    if(!hookPassed.ok){
        const response:UpdateSettingFunc['output'] = {
            ok:false,
            msg:hookPassed.msg
        }
        return json(response)
    }
    // Run code
    const inputData:UpdateSettingFunc['input'] = funcInputData
    const appData = inputData.data
    const collection = db.collection("_app")
    const dataToSet = { $set:{ site:appData.site, config:appData.config } }
    await collection.updateOne({ _id:new ObjectId("000000000000000000000000") }, dataToSet)
    const response:UpdateSettingFunc['output'] = {
        ok:true,
        msg:"Settings were updated",
        data:appData
    }
    return json(response)
}