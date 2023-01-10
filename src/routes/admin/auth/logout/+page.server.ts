import cms from "$Cms"
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { CookieSessionData } from "$Types";

export const load:PageServerLoad = async({cookies,locals})=> {
    const sessionIdName = locals.sessionIdName
    const session = cookies.get(sessionIdName)
    if(session){
        const cookieSessionData:CookieSessionData = JSON.parse(session)
        await cms.Auth.logout(cookieSessionData)
        cookies.set(sessionIdName,"",{
            path:"/",
            expires: new Date(0)
        })
    }
    throw redirect(302,"/admin")
}