import type { RequestEvent } from "@sveltejs/kit"

export const load = async(event:RequestEvent)=>{
    const appData = event.locals.appData
    return{ appData }
}