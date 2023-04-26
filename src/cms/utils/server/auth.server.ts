import db from "cms/lib/db.server"
import bcrypt from "bcrypt"
import { addDays } from "date-fns"
import { ObjectId } from "mongodb"
import type { UserData, UserSessionData, UserSessionLoad } from "cms/types"
import type { RequestEvent } from "@sveltejs/kit"

export default new class Auth{
    /** Validate authID from cookie */
    async validate(authID:string,event:RequestEvent){
        const sessionsCol = db.collection('_sessions')
        const usersCol = db.collection('_users')
        const sessionData = await sessionsCol.findOne({ _id:new ObjectId(authID)}) as UserSessionData | null
        if(sessionData){
            const ip = event.getClientAddress()
            const browser = event.request.headers.get("user-agent") as string
            const validated = ( 
                sessionData.browser===browser &&
                sessionData.ip===ip &&
                sessionData.expireAt.getTime() < addDays(new Date(),7).getTime()
            )
            if(validated){
                const userData = await usersCol.findOne({ _id:new ObjectId(sessionData.userID) }) as UserData
                return userData
            }
        }
        return false
    }
    /** Try to login user */
    async login(email:string,password:string,event:RequestEvent){
        const usersCol = db.collection('_users')
        const userData = await usersCol.findOne({ email }) as UserData|null
        // if user exists
        if(userData){
            const passwordMatched = await bcrypt.compare(password,userData.password)
            if(passwordMatched){
                const ip = event.getClientAddress()
                const browser = event.request.headers.get("user-agent") as string
                const session = await this.createSession(userData._id.toString(),ip,browser)
                return { user:userData,session }
            }
            return false
        }
        return false
    }

    /** Create user session */
    async deleteSession(authID:string){
        const sessionsCol = db.collection('_sessions')
        const sessionFilter = {_id:new ObjectId(authID)}
        try{
            const sessionDataRes = await sessionsCol.findOne(sessionFilter)
            if(sessionDataRes){
                await sessionsCol.deleteOne(sessionFilter)
            }
            return true
        }catch{ return false }
    }

    /** Create user session */
    private async createSession(userID:string,ip:string,browser:string){
        const sessionsCol = db.collection('_sessions')
        const sessionData:UserSessionLoad = {
            userID: userID,
            createdAt: new Date(),
            expireAt: addDays(new Date(),7),
            ip,browser
        }
        const insertedData = await sessionsCol.insertOne(sessionData)
        const response:UserSessionData = { ...sessionData,_id:insertedData.insertedId }
        return response
    }
}