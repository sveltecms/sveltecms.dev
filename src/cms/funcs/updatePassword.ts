import { ObjectId } from "mongodb"
import type { Db } from "mongodb"
import type { RequestEvent,UpdatePasswordFunc } from "."
import bcrypt from "bcrypt"

export default async function handleFunc(db:Db,event:RequestEvent,funcInputData:UpdatePasswordFunc['input'],json:Function) {
    const userData = event.locals.userData
    // Check if user is logged in
    if(!userData){
        const response:UpdatePasswordFunc['output'] = {
            ok:false,msg:"Something went wrong"
        }
        return json(response)
    }
    // Else try to update password
    const inputData:UpdatePasswordFunc['input'] = funcInputData
    const funcData = inputData.data
    const usersCol = db.collection("_users")
    const dbFilter = { _id:new ObjectId(userData._id) }
    const userDataDB = await usersCol.findOne(dbFilter)
    if(userDataDB){
        const isSamePassword = await bcrypt.compare(funcData.currentPassword,userDataDB.password)
        // If not the same password
        if(!isSamePassword){
            const response:UpdatePasswordFunc['output'] = {
                ok:false,msg:"Wrong password"
            }
            return json(response)
        }
        // Else update password
        const newPasswordHashed = await bcrypt.hash(funcData.newPassword,10)
        await usersCol.updateOne(dbFilter,{ $set:{ password:newPasswordHashed}})
        const response:UpdatePasswordFunc['output'] = {
            ok:true, msg:`${userData.firstName}'s password was updated`,data:null
        }
        return json(response)
    }
    // return error if user was not founded in db
    const response:UpdatePasswordFunc['output'] = {
        ok:false,
        msg:""
    }
    return json(response)
}