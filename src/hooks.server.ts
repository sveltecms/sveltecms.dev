import cms from "$Cms"
import { DATABASE_NAME } from "$env/static/private"
import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';
 
export const handle:Handle = async({ event, resolve })=> {
    const protectedRoutes:string[] = []
    const unProtectedRoutes:string[] = [ "/admin/auth", "/admin/api/assets/images" ]
    const sessionIdName = `${DATABASE_NAME}_session`
    const session = event.cookies.get(sessionIdName)
    const pathname = event.url.pathname
    const isAnAsset = pathname.includes("/admin/api/assets/")
    event.locals.sessionIdName = sessionIdName
    // If session exists in cookies
    if(session){
        const auth = await cms.Auth.isAuth(JSON.parse(session!),event.request)
        if(auth){
            // If user is not an admin or root user, redirect home page
            if(auth.role==="user" && pathname!=="/admin/auth/logout" && pathname.startsWith("/admin") ){
                throw redirect(302,"/")
            }
            // Else add user to locals
            const user = auth ; user['_id']=user['_id'].toString()
            event.locals.user = auth
        }
        // If auth did not pass
        // Redirect to login page
        // TODO: Let admin decide what routes are protected by given an array of paths
        else if((pathname.startsWith("/admin") && !unProtectedRoutes.includes(pathname) && !isAnAsset) || protectedRoutes.includes(pathname)){
            throw redirect(302,"/admin/auth")
        }
    }
    // Else if session do not exists in cookie, redirect to login page
    // TODO: Let admin decide what routes are protected by given an array of paths
    else if((pathname.startsWith("/admin") && !unProtectedRoutes.includes(pathname) && !isAnAsset) || protectedRoutes.includes(pathname)){
        throw redirect(302,"/admin/auth")
    }
    const response = await resolve(event);
    return response;
}