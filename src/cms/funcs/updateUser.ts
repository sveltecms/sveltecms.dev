import customFuncs from "../../cms.hooks"
import { ObjectId } from "mongodb"
import type { Db } from "mongodb"
import type { RequestEvent,UpdateUserFunc } from "."

// TODO: maybe delete old image when update profile image
export default async function handleFunc(db:Db,event:RequestEvent,funcInputData:UpdateUserFunc['input'],json:Function) {
    // run user hook function
    const hookPassed = await customFuncs.beforeUpdating.user(db,funcInputData.data)
    if(!hookPassed.ok){
        const response:UpdateUserFunc['output'] = {
            ok:false,
            msg:hookPassed.msg
        }
        return json(response)
    }
    // Run code
    const inputData:UpdateUserFunc['input'] = funcInputData
    const funcData = inputData.data
    let newUserData = { ...funcData }
    // remove _id from new userData object
    delete newUserData['_id']
    // update data
    const usersCol = db.collection("_users")
    const updateRes = await usersCol.updateOne({ _id:new ObjectId(funcData._id)},{ $set:newUserData})
    if(updateRes.acknowledged){
        const response:UpdateUserFunc['output'] = {
            ok:true,
            msg:`User: ${funcData.firstName} was updated`,
            // @ts-ignore
            data:funcData
        }
        return json(response)
    }
    // return error
    const response:UpdateUserFunc['output'] = {
        ok:false,
        msg:`User: ${funcData.firstName} was not updated`
    }
    return json(response)
}