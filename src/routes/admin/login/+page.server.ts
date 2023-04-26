import Utils from "cms/utils/server"
import { redirect } from "@sveltejs/kit"
import type { RequestEvent } from "./$types"

export const load = async (event:RequestEvent) => {
    const appData = event.locals.appData
    const cookieName = `auth_${appData.site.name}`
    const authID = event.cookies.get(cookieName)
    if(authID){
        const validated = await Utils.Auth.validate(authID,event)
        if(validated){
            throw redirect(302,appData.config.cmsPath)
        }
        // remove cookie
        event.cookies.delete(cookieName)
    }else return { appData }
}