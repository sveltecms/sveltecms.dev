import cms from "$Cms"
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { CookieSessionData } from "$Types";

export const load:PageServerLoad = async({cookies,request,locals})=> {
    const sessionIdName = locals.sessionIdName
    const sessionFromCookie = cookies.get(sessionIdName)
    if(sessionFromCookie){
        const cookieSessionData:CookieSessionData = JSON.parse(sessionFromCookie)
        const userIsLoggedIn = await cms.Auth.isAuth(cookieSessionData,request)
        if(userIsLoggedIn) throw redirect(302,"/admin")
    }
}