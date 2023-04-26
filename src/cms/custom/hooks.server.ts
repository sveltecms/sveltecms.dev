import db from "cms/lib/db.server"
import Utils from "cms/utils/server"
import { redirect } from "@sveltejs/kit"
import { dev } from "$app/environment"
import type { Handle } from "@sveltejs/kit"

const handle:Handle = async({ event,resolve })=>{
    // Get app data and routes
    const { appData,routes } = await Utils.getData(db)
    // Generate types
    if(dev) Utils.generateAllTypes(appData,routes)
    // Run codes
    const pathname = event.url.pathname
    const cookieName = `auth_${appData.site.name}`
    const cmsPath = appData.config.cmsPath
    const authID = event.cookies.get(cookieName) as any
    const redirectToLogin = !authID && pathname.startsWith(cmsPath) && !(pathname.endsWith(`${cmsPath}/login`) || pathname.endsWith(`${cmsPath}/logout`))
    // add app data to locals
    event.locals.appData = appData
    // Redirect to login page
    if(redirectToLogin) throw redirect(302,`${cmsPath}/login`)
    // If authID exists in cookies, validate it
    const userData = await Utils.Auth.validate(authID,event)
    // If authID was validated, add user data to locals
    if(userData){
        // Add userData and authID to locals
        event.locals.userData = {...userData,_id:userData._id.toString()}
        event.locals.authID = authID
        // check if a normal user try to access admin page
        const redirectToOutAdmin = !(pathname.endsWith(`${cmsPath}/login`) || pathname.endsWith(`${cmsPath}/logout`)) && (pathname.startsWith(cmsPath) && userData.role==="user")
        if(redirectToOutAdmin) throw redirect(302,"/")
    }
    // If authID was not validated, remove authID from cookies
    else event.cookies.delete(cookieName)
    // Return event data
    const response = await resolve(event)
    return response;
}

export default handle