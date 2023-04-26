import { get as getStoreData } from "svelte/store"
import { page } from "$app/stores"
import slugify from "slugify"
import type { ElementData, UserData,UserLoad } from "cms/types"

export default new class Utils {
    
    async fetch(path:string,body:any,isJson=true){
        const appData = getStoreData(page).data.appData
        const apiUrl = appData ? `${appData.config.cmsPath}${path==="/"?"":path}` : `/admin${path==="/"?"":path}`
        const apiParams:{[key:string]:any} = { method:isJson?"POST":"PUT" }
        // if we uploading body should be raw, if not a json body
        apiParams['body'] = isJson ? JSON.stringify(body) : body
        apiParams['headers'] = isJson ? {"Content-Type":"application/json"} : {}
        // make request and get response
        const request = await fetch(apiUrl,apiParams)
        return request.json()
    }

    /** Use to wait */
    async sleep(millSeconds:number){
        await new Promise(r=>setTimeout(r,millSeconds))
    }

    /** Generate slug from string */
    generateSlug(data:string){
        return slugify(data,{strict:true,lower:true})
    }

    /** Validate user data */
    validateUserData(user:UserData|UserLoad){
        if(user.firstName.trim()==="") return "First name can not be empty"
        else if(user.lastName.trim()==="") return "Last name can not be empty"
        else if(user.password.trim()==="") return "User password can not be empty"
        else if(user.email.trim()==="") return "Email can not be empty"
        else if(user.role.trim()==="") return "User role can not be empty"
        else return false
    }

    /** Validate data */
    validateObjectData(data:{[key:string]:any},parentKey?:string){
        const errors:string[] = []
        // Loop all key and value
        for(const [key,value] of Object.entries(data)){
            const keyType = typeof value
            if(keyType==="string" && value.trim().length===0){
                errors.push(`${parentKey?parentKey:key} can not be empty`)
            }
            else if(keyType==="object" && JSON.stringify(value).trim().startsWith("[") && value.length===0){
                errors.push(`${parentKey?parentKey:key} can not be empty`)
            }
            else if(keyType==="object" && JSON.stringify(value).trim().startsWith("{")){
                const inIfErrors = this.validateObjectData(value)
                if(inIfErrors.length>0){
                    errors.push(`${parentKey?`${parentKey}`:`Fields in ${key}`} can not be empty`)
                }
            }
        }
        // return errors
        return errors
    }

    /** Validate elements */
    validateElements(elements:ElementData[]){
        const errors:string[] = []
        // loop all elements
        for(const element of elements){
            const textTypes = ["input","textArea","slug"]
            // on string elements
            if(textTypes.includes(element.type) && element.value.trim().length===0){
                errors.push(`Key:${element.ID} can not be empty`)
            }
            // On boolean
            else if(element.type==="boolean"){
                if(element.value==="") errors.push(`Key:${element.ID} can not be empty`)
            }
            // else if other types
            else if(!element.value) errors.push(`Key:${element.ID} can not be empty`)
        }
        // return errors
        return errors
    }
    
}