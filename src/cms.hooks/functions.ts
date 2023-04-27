import { ObjectId } from "mongodb"
import type { HookFuncs,HookResponse } from "./types"

/** This a demo function, will run before updating route's object */
export const beforeAddingObject:HookFuncs['beforeAdding']['object'] = async(db,funcData) => {
    const collection = db.collection(funcData.routeID)
     // Check for duplicated slug
     const slugExists = funcData.elements.find(data=>data.type==="slug")
     if(slugExists && await collection.findOne({ slug:slugExists.value })){
         // return response
         return { ok:false, msg:`Object with slug:${slugExists.value} already exists` }
     }
     // return response
     return { ok:true, msg:"Function passed" }
}

/** Before deleting route */
export const beforeDeletingRoute:HookFuncs['beforeAdding']['route'] = async(db,funcData) => {
    if(funcData.ID==="pages"){
        // return response
        return { ok:false, msg:"This is a demo, route:pages can not be deleted" }
    }
    // return response
    return { ok:true, msg:"Function passed" }
}

/** Before updating route */
export const beforeUpdatingRoute:HookFuncs['beforeUpdating']['route'] = async(db,funcData) => {
    if(funcData.ID==="pages"){
        // return response
        return { ok:false, msg:"This is a demo, route:pages can not be updated" }
    }
    // return response
    return { ok:true, msg:"Function passed" }
}

/** Before updating route's object */
export const beforeUpdatingObject:HookFuncs['beforeUpdating']['object'] = async(db,funcData) => {
    const collection = db.collection(funcData.routeID)
    const findGetStarted = await collection.findOne({ _id:new ObjectId(funcData.objectID )})
    // Check this is get started page
    if(findGetStarted && findGetStarted.slug==="get-started"){
        // return response
        return { ok:false, msg:"This is a demo, get-started from route:pages can not be updated" }
    }
    // return response
    return { ok:true, msg:"Function passed" }
}

/** Before deleting route's object */
export const beforeDeletingObject:HookFuncs['beforeDeleting']['object'] = async(db,funcData) => {
    const slugExists = "slug" in funcData.object
    if(funcData.routeID==="pages" && slugExists && funcData.object.slug==="get-started"){
        // return response
        return { ok:false, msg:"This is a demo, get-started from route:pages can not be deleted" }
    }
    // return response
    return { ok:true, msg:"Function passed" }
}

/** Before updating settings */
export const beforeUpdatingSetting:HookFuncs['beforeUpdating']['setting'] = async(db,funcData) => {
    // return response
    return { ok:false, msg:"This is a demo, setting can not be updated" }
}

/** This a demo function */
export async function demoFunc():Promise<HookResponse>{
    return {  ok:true, msg:"Test function passed" }
}