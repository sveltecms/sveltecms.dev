import type { CategoryData, CategoryLoad, ElementData, RouteData, RouteLoad, TagLoad, TagData, UserLoad, UserData, ElementType, ObjectData } from "$Types"
import slugify from "slugify"

/** Wait for given milliseconds */
export function wait(time:number){
    return new Promise(r=>setTimeout(r,time))
}

/** Generate slug from string */
export function generateSlug(data:string){
    return slugify(data,{strict:true,lower:true})
}

/** Send "POST"|"DELETE"|"PUT" requests
 * PATCH is use to fetch data like GET */
type Methods = "POST"|"DELETE"|"PUT"|"GET"|"PATCH"
export async function fetchPost(method:Methods,url:string,body:object,isJson=true,extra?:{ assetName:string } ) {
    const requestParams:any = { method:method }
    if(isJson){
        requestParams['headers'] = {"Content-Type":"application/json"}
        requestParams['body'] = JSON.stringify(body)
    }else{
        requestParams['headers'] = {}
        requestParams['body'] = body
    }
    if(extra?.assetName){
        requestParams['headers']["assetName"]=extra.assetName
    }
    const request = await fetch(url,requestParams)
    return request.json()
}

export function validateTagCategory(data:CategoryLoad|CategoryData|TagLoad|TagData){
    const errors:{ ID:string,msg:string }[] = []
    if(data.name.trim()==="") errors.push({ ID:"name",msg:"Name is required" })
    if(data.description.trim()==="") errors.push({ ID:"name",msg:"Description is required" })
    if(data.slug.trim()==="") errors.push({ ID:"name",msg:"Slug is required" })
    return errors
}

export function validateObjectElements(elements:ElementData[]){
    const errors:{ ID:string,msg:string }[] = []
    for(const element of elements){
        if(["input","slug","textArea","image"].includes(element.type) && typeof element.value==="string" && element.value.trim()===""){
            errors.push({ ID:element.ID,msg:`Element:${element.ID} is required` })
        }
        else if(element.type==="dateTime" && element.value==="" ){
            errors.push({ ID:element.ID,msg:`Element:${element.ID} is required` })
        }
        else if(element.type==="inputNumber" && element.value==="" || element.value===null){
            errors.push({ ID:element.ID,msg:`Element:${element.ID} is required` })
        }
        else if(element.type==="images" && element.value==="" || (typeof element.value==="object" && element.value.length === 0)){
            errors.push({ ID:element.ID,msg:`Element:${element.ID} is required` })
        }
    }
    return errors
}

export function validateRoute(route:RouteData|RouteLoad){
    const errors:{ ID:string,msg:string }[] = []
    if(route.ID.trim()==="") errors.push({ ID:route.ID,msg:"ID is required" })
    if(route.title.trim()==="") errors.push({ ID:route.ID,msg:"Title is required" })
    if(route.meta.title.trim()==="") errors.push({ ID:route.ID,msg:"Page title is required" })
    if(route.meta.description.trim()==="") errors.push({ ID:route.ID,msg:"Page description is required" })
    if(route.elements.length===0) errors.push({ ID:route.ID,msg:"Route required a minimum of one elements" })
    return errors
}

export function validateElements(elements:ElementData[]){
    const errors:{ ID:string,msg:string }[] = []
    // Loop all elements and make sure they all pass
    for(const element of elements){
        if(validateElement(element)!==true){
            errors.push({ ID:element.ID,msg:`Element:${element.ID} is required` })
        }
    }
    return errors
}

export function validateElement(element:ElementData){
    const isStringType = ( element.type==="input" || element.type==="slug" || element.type==="textArea" )
    const stringAndBad = isStringType && element.value.trim() === ""
    const nullContent = ( element.type==="content" && !element.value )
    const nullNumber = ( element.type==="inputNumber" && element.value==="" )
    const nullDateNumber = ( element.type==="dateTime" && ( element.value===0 || element.value==="") )
    if(["_createdAt","_updatedAt","_id","_status","_tags","_categories"].includes(element.ID)){
        return { msg:`Element ID:${element.ID} is a reserved key`}
    }
    // On string
    if(stringAndBad || nullContent || nullNumber || nullDateNumber || element.value===null){
        return { msg:`Element ID:${element.ID} is required`}
    }
    return true
}


/** Capitalize string */
export function capitalize(data:string){
    return data.charAt(0).toUpperCase()+data.slice(1)
}


/** Validate new user data */
export function validateUserData(userData:UserLoad|UserData){
    const errors:string[] = []
    if(userData.firstName.trim().length===0) errors.push(`User first name can not be empty`)
    if(userData.lastName.trim().length===0) errors.push(`User last name can not be empty`)
    if(userData.email.trim().length===0) errors.push(`User email can not be empty`)
    if(userData.password.trim().length===0) errors.push(`User password can not be empty`)
    return errors
}


/** Convert elements list to JavaScript Object use for /admin/routes/objects/new */
export function elementsToObject(elements:ElementData[]){
    const object:{[key:string]:any} = {}
    // Loop elements and set key and it's value
    for(const element of elements){
        object[element.ID] = element.value
    }
    // Return object
    return object
}

/** Get element type from type(string) */
export function getElementType(type:ElementType){
    // "dateTime" | "textArea" | "input" | "inputNumber" | "slug" | "content" | "image" | "_categories" | "_tags" | "_status" | "_createdAt" | "_updatedAt"
    const types = {
        dateTime:`number`,
        textArea:`string`,
        input:`string`,
        inputNumber:`number`,
        slug:`string`,
        content:`any`,
        image:`{\n        _id:string\n        name:string\n        path:string\n        type:string\n        extension:string\n    }`,
        images:`{\n        _id:string\n        name:string\n        path:string\n        type:string\n        extension:string\n    }[]`,
        _status:`"public"|"private"`,
        _categories:`{\n        _id:string\n        name:string\n        path:string\n        type:string\n        extension:string\n    }`,
        _tags:`{\n        _id:string\n        name:string\n        path:string\n        type:string\n        extension:string\n    }`,
        _createdAt: "Date",
        _updatedAt: "Date"
    }
    // @ts-ignore
    return types[type]
}

/** Get url to view assets */
export function getAssetViewPath(asset:any){
    const baseApi = "/admin/api/assets"
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
    const videoExtensions = ["mp4", "avi", "mov", "wmv"];
    if(imageExtensions.includes(asset.extension)) return `${baseApi}/images/${asset.path}`
    else if(videoExtensions.includes(asset.extension)) return `${baseApi}/videos/${asset.path}`
    else return `${baseApi}/other/${asset.path}`
}