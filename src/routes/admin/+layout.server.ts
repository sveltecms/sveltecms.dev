import cms from "$Cms"
import svelteCMS from "$svelteCMS"
import { ROUTES,SEARCH } from "$Stores"
import { capitalize,getElementType } from "$Utilities"
import { dev as isDevMode } from "$app/environment"
import { writeFileSync } from "fs"
import type { RouteData } from "$Types"
import type { LayoutServerLoad } from "./$types"

export const load:LayoutServerLoad = async({locals})=>{    
    // If user is logged in
    if(locals.user){
        const routes = await cms.Fetch.routes({ filter:{},count:svelteCMS.config.routesPerPage })
        // Set server stores
        ROUTES.set(routes)
        // Auto generate types on dev mode
        if(isDevMode && routes.length>0) makeRoutesTypes(routes)
        // Return objects
        return { routes:routes,user:locals.user } 
    }
    // Else if user is not logged in
    return { routes:[],user:locals.user } 
}
 
/** Auto make types for object */
function makeRoutesTypes(routes:RouteData[]){
    /** All the routes objects */
    let objectsTypes = ""
    for(const route of routes){
        // Loop elements in route
        let objectType = `/** Object data for objects inside route:${route.ID} */\nexport type ${capitalize(route.ID)}ObjectData = {\n`
        for(const element of route.elements){
            const IDtype = getElementType(element.type)
            objectType+=`    ${element.ID}:${IDtype}\n`
        }
        // Add MongoDB _id type
        objectType+=`    _id:import("mongodb").ObjectId\n`
        // Add status type
        objectType+=`    _status:import("$Types").StatusData\n`
        // Add createAt type
        objectType+=`    _createdAt:number\n`
        // Add updatedAt type
        objectType+=`    _updatedAt:number\n`
        // If routes includes categories or tags, create type for them
        if(route.includeCategories==="yes") objectType+=`    _categories:import("$Types").CategoryData[]\n`
        if(route.includeTags==="yes") objectType+=`    _tags:import("$Types").TagData[]\n`
        // Complete object type for current route
        objectType+="}"
        // Add object type to objects type
        objectsTypes+=`${objectType}\n\n`
    }
    // Save types
    const typePath = `${process.cwd()}/src/routes/admin/_core/types/dynamically.ts`
    const typeData = objectsTypes.trimEnd()
    writeFileSync(typePath,typeData)
}