import db from "cms/lib/db.server"
import { ObjectId } from "mongodb"
import type { RequestEvent,DeleteUserFunc } from "."

// TODO: update asset on any linked data
export default async function handleFunc(event:RequestEvent,funcInputData:any,json:Function) {
    const inputData:DeleteUserFunc['input'] = funcInputData
    const funcData = inputData.data
    // check if user with this email exists
    const usersCol = db.collection("_users")
    const emailUserExists = await usersCol.findOne({ email:funcData.email })
    if(!emailUserExists){
        const response:DeleteUserFunc['output'] = {
            ok:false,
            msg:`User with email:${funcData.email} do not exists`
        }
        return json(response)
    }
    // delete user
    const deletedUser = await usersCol.deleteOne({ _id:new ObjectId(funcData._id) })
    if(deletedUser.acknowledged){
        const response:DeleteUserFunc['output'] = {
            ok:true,
            msg:`User with email:${funcData.email} was deleted`,
            data:funcData
        }
        return json(response)
    }
    // else something went wrong
    const response:DeleteUserFunc['output'] = {
        ok:false,
        msg:"Something went wrong"
    }
    return json(response)
}