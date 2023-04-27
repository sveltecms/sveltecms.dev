import db from "cms/lib/db.server"
import updateSettings from "cms/funcs/updateSettings"
import uploadFile from "cms/funcs/uploadFile"
import updateUser from "cms/funcs/updateUser"
import updateAsset from "cms/funcs/updateAsset"
import deleteAsset from "cms/funcs/deleteAsset"
import searchAssets from "cms/funcs/searchAssets"
import createUser from "cms/funcs/createUser"
import deleteUser from "cms/funcs/deleteUser"
import createRoute from "cms/funcs/createRoute"
import updateRoute from "cms/funcs/updateRoute"
import deleteRoute from "cms/funcs/deleteRoute"
import createObject from "cms/funcs/createObject"
import deleteObject from "cms/funcs/deleteObject"
import updateObject from "cms/funcs/updateObject"
import getRoutes from "cms/funcs/getRoutes"
import searchObjects from "cms/funcs/searchObjects"
import { json } from "@sveltejs/kit"
import type { ApiFunc } from "cms/funcs"
import type { RequestEvent } from "./$types"

/** Handle all functions */
export const POST = async(event:RequestEvent)=> {
    const apiFuncData:ApiFunc['input'] = await event.request.json()
    switch (apiFuncData.name) {
        case "updateSettings": return updateSettings(db,event,apiFuncData,json)
        case "uploadFile": return uploadFile(db,event,apiFuncData,json)
        case "updateUser": return updateUser(db,event,apiFuncData,json) 
        case "updateAsset": return updateAsset(db,event,apiFuncData,json)
        case "deleteAsset": return deleteAsset(db,event,apiFuncData,json)
        case "searchAssets": return searchAssets(db,event,apiFuncData,json)
        case "createUser": return createUser(db,event,apiFuncData,json)
        case "deleteUser": return deleteUser(db,event,apiFuncData,json)
        case "createRoute": return createRoute(db,event,apiFuncData,json)
        case "updateRoute": return updateRoute(db,event,apiFuncData,json)
        case "deleteRoute": return deleteRoute(db,event,apiFuncData,json)
        case "createObject": return createObject(db,event,apiFuncData,json)
        case "deleteObject": return deleteObject(db,event,apiFuncData,json)
        case "updateObject": return updateObject(db,event,apiFuncData,json)
        case "getRoutes": return getRoutes(db,event,apiFuncData,json)
        case "searchObjects": return searchObjects(db,event,apiFuncData,json)
        default: return json({ ok:false,msg:"Method not founded"})
    }
}

/** Handle all functions with non json */
export const PUT = async(event:RequestEvent)=> {
    return uploadFile(db,event,null,json)
}