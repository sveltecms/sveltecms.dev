import Utils from "cms/utils/server"
import { json } from "@sveltejs/kit"
import type { RequestHandler } from './$types'
import type { UserLoginLoad,UserLoginData } from "cms/types"

/** Login user */
export const POST: RequestHandler = async(event)=> {
    const appData = event.locals.appData
    const cookieName = `auth_${appData.site.name}`
    const jsonData:UserLoginLoad = await event.request.json()
    const loginRes = await Utils.Auth.login(jsonData.email,jsonData.password,event)
    if(loginRes){
        const sessionID = loginRes.session._id.toString()
        const userData = loginRes.user
        event.cookies.set(cookieName,sessionID,{
            path:"/",
            httpOnly:true,
            sameSite:"strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 26 * 30
        })
        // return response
        const response:UserLoginData = {
            ok:true,
            msg:`Welcome back: ${userData.firstName}`,
            data:userData
        }
        return json(response)
    }
    // return bad response
    const response:UserLoginData = {
        ok:false,
        msg:"You entered the wrong email or password"
    }
    return json(response)
}