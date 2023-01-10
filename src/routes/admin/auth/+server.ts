import db from "$Database"
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { SessionData,AuthLoginLoad,ApiAuthLoginData } from "$Types";
import svelteCMS from "$svelteCMS";
import bcrypt from "bcrypt"

// LOGIN
export const POST:RequestHandler = async({cookies,request,locals})=> {
    const usersCollection = db.collection(svelteCMS.collections.users)
    const jsonData:AuthLoginLoad = await request.json()
    const email = jsonData.email
    const password = jsonData.password
    // Check if user exists
    const userDataDB = await usersCollection.findOne({ email })
    if(!userDataDB){
        const response:ApiAuthLoginData = { ok:false,msg:"Wrong information" }
        return json(response)
    }
    // Compare password
    const passwordPassed = await bcrypt.compare(password,userDataDB['password'])
    if(!passwordPassed){
        const response:ApiAuthLoginData = { ok:false,msg:"Wrong information" }
        return json(response)
    }
    // Login user
    const token = crypto.randomUUID()
    const sessionIdName = locals.sessionIdName
    cookies.set(sessionIdName,JSON.stringify({t:token,u:userDataDB._id.toString()}),{
        path:"/",
        httpOnly:true,
        sameSite:"strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 26 * 30
    })
    const userAgent = request.headers.get("user-agent")
    const currentDate = new Date()
    const expireOnDate = new Date() ; expireOnDate.setDate(currentDate.getDate() + 7)
    const oldSessions = userDataDB.sessions
    const newSession:SessionData = {
        [token]:{
            token,
            userAgent:userAgent!,
            createdAt:currentDate,
            expireOn:expireOnDate
        }
    }
    const sessions = { ...oldSessions,...newSession }
    await usersCollection.updateOne({ email },{ $set:{sessions} })
    const response:ApiAuthLoginData = { ok:true,msg:`User:${userDataDB.firstName} was logged in.` }
    return json(response)
}