import db from "cms/lib/db.server"
import { ObjectId } from "mongodb"
import type { RequestEvent,UpdateSettingFunc } from "."

export default async function handleFunc(event:RequestEvent,funcInputData:any,json:Function) {
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