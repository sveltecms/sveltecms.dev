import svelteCMS from "$svelteCMS"
import { ObjectId } from "mongodb"
import type { Db } from "mongodb"
import type { UserData } from "$Types"
import type { CookieSessionData } from "$Types/cms"

export default class {
    private usersCollection
    private projection
    private db:Db

    constructor(database:Db){
        this.db = database
        this.usersCollection = this.db.collection(svelteCMS.collections.users)
        this.projection = {
            users:{
                password:0
            }
        }
    }

    /** Log user out */
    async logout(session:CookieSessionData){
        const userFilter = { _id: new ObjectId(session.u) }
        const userDataFromDB = await this.usersCollection.findOne(userFilter)
        // If user exists, delete session from user sessions
        if(userDataFromDB){
            const sessions = userDataFromDB.sessions
            const sessionData = sessions[session.t]
            if(sessionData){
                delete sessions[session.t]
                this.usersCollection.updateOne(userFilter,{$set:{sessions}})
            }
        }
    }

    /** Validate session from cookie | Validate auth */
    async isAuth(session:CookieSessionData,request:Request) {
        const usersCollection = this.db.collection(svelteCMS.collections.users)
        const userFilter = { _id:new ObjectId(session.u) }
        // Check if user exists
        const dbResult:any = await this.usersCollection.findOne(userFilter,{ projection:this.projection.users })
        const userDataDB:UserData = dbResult
        // If user data do not exists return false
        if(!userDataDB) return false
        // Check user agent, expiration and session
        const sessions = userDataDB.sessions
        const sessionData = userDataDB.sessions[session.t]
        // If user session from cookie do not exists in users sessions
        if(!sessionData) return false
        const sessionExpireOn = sessionData.expireOn
        const sessionUserAgent = sessionData.userAgent
        // Check is user agent is the same as session user agent
        const userAgent = request.headers.get("user-agent") as string
        const sameUserAgent = sessionUserAgent===userAgent
        if(!sameUserAgent) return false
        // Check if token is not expired
        const tokenExpired = sessionExpireOn.getTime() < new Date().getTime()
        if(tokenExpired){
            // Remove session from sessions
            delete sessions[session.t]
            await usersCollection.updateOne(userFilter,{$set:{sessions}})
            return false
        }
        return tokenExpired ? false : userDataDB
    }

}