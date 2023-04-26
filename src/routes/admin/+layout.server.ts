import type { RequestEvent } from "@sveltejs/kit"

export const load = async(event:RequestEvent)=>{
    const appData = event.locals.appData
    const userData = event.locals.userData
    return{ userData,appData }
}