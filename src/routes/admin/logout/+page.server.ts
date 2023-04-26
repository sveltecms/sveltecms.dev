import Utils from "cms/utils/server"
import { redirect } from "@sveltejs/kit"
import type { RequestEvent } from "./$types"

export const load = async(event:RequestEvent)=> {
    const appData = event.locals.appData
    const authID = event.locals.authID
    const cookieName = `auth_${appData.site.name}`
    event.cookies.set(cookieName,"",{
        path:"/",
        expires: new Date(0)
    })
    // delete user session
    await Utils.Auth.deleteSession(authID)
    throw redirect(302,`${appData.config.cmsPath}/login`)
}