import db from "cms/lib/db.server"
import type { RequestEvent,UpdateUserFunc } from "."
import { ObjectId } from "mongodb"

// TODO: maybe delete old image when update profile image
export default async function handleFunc(event:RequestEvent,funcInputData:any,json:Function) {
    const inputData:UpdateUserFunc['input'] = funcInputData
    const funcData = inputData.data
    let response:UpdateUserFunc['output']
    let newUserData = { ...funcData }
    // remove _id from new userData object
    delete newUserData['_id']
    // update data
    const usersCol = db.collection("_users")
    const updateRes = await usersCol.updateOne({ _id:new ObjectId(funcData._id)},{ $set:newUserData})
    if(updateRes.acknowledged){
        response = {
            ok:true,
            msg:`User: ${funcData.firstName} was updated`,
            data:funcData
        }
        return json(response)
    }
    // return error
    response = {
        ok:false,
        msg:`User: ${funcData.firstName} was not updated`
    }
    return json(response)
}