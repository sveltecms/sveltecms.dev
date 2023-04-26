import Cloudinary from "./server/cloudinary.server"
import Auth from "./server/auth.server"
import fs from "fs"
import GenerateTypes from "cms/lib/generateTypes"
import { ObjectId } from "mongodb"
import type { App, ElementData, LinkedAssetLoad, LinkedRouteLoad, RouteData } from "cms/types"
import type { Db } from "mongodb"
const CWD = process.cwd()

export default new class Utils{
    public Cloudinary = Cloudinary
    public Auth = Auth

    /** Get app data and routes */
    async getData(db:Db){
        const appCol = db.collection("_app")
        const routesCol = db.collection("_routes")
        const appDataCursor = appCol.findOne( { _id:new ObjectId("000000000000000000000000") }) as Promise<any>
        const routesCursor = routesCol.find({}).map(data=>this.cleanObjectData(data)).toArray() as Promise<any>
        // Get app data and routes
        let [appData,routes] = await Promise.all([appDataCursor,routesCursor]) as [App,RouteData[]]
        // convert _id to string from object data
        appData = this.cleanObjectData(appData)
        return { appData,routes }
    }

    /** Convert elements list to Object */
    elementsToObject(elements:ElementData[]){
        const object:{[key:string]:any} = {}
        // Loop elements and set key and it's value
        for(const element of elements){
            const type = typeof element.value
            // Check if value is a Date
            const value = (type==="string" && element.value.endsWith("Z")) ? new Date(element.value) : element.value
            object[element.ID] = value
        }
        // Return object
        return object
    }

    /** Get a list of elements linking to a asset */
    getLinkedAssetKeys(elements:ElementData[],routeID:string){
        const linkedKeys:LinkedAssetLoad[] = []
        // Loop elements
        for(const element of elements){
            if(element.type==="asset"){
                const linkedRoute:LinkedAssetLoad = { fromRouteID:routeID,fromKey:element.ID,oneAsset:true }
                linkedKeys.push(linkedRoute)
            }
            else if(element.type==="assets"){
                const linkedRoute:LinkedAssetLoad = { fromRouteID:routeID,fromKey:element.ID,oneAsset:false }
                linkedKeys.push(linkedRoute)
            }
        }
        // Return list
        return linkedKeys
    }

    /** Get a list of elements linking to a route */
    getLinkedRouteKeys(elements:ElementData[],routeID:string){
        const linkedKeys:LinkedRouteLoad[] = []
        // Loop elements
        for(const element of elements){
            if(element.type==="linkToRoute" && element.linkTo){
                const linkedRoute:LinkedRouteLoad = { fromRouteID:routeID,toRouteID:element.linkTo,fromKey:element.ID }
                linkedKeys.push(linkedRoute)
            }
        }
        // Return list
        return linkedKeys
    }

    /** Generate all types */
    async generateAllTypes(appData:App,routes:RouteData[]){
        const appTypesPth = `${CWD}/src/cms/types/app.ts`
        // Generate app types
        const appType = this.generateTypes(appData,"App")
        fs.writeFileSync(appTypesPth,appType)
        // Generate routes/objects types
        const typesPath = `${CWD}/src/cms/types/dynamically/index.ts`
        const projectionTypesPath = `${CWD}/src/cms/types/dynamically/projection.ts`
        let types:string = ""
        let projectionTypes:string = ""
        // Loop all routes
        for(const route of routes){
            const typeName = this.capitalize(route.ID)+"Data"
            const typeName2 = this.capitalize(route.ID)+"Projection"
            let type:string = `//TYPE:${typeName}:start\nexport type ${typeName} = {\n    _id:any`
            let projectionType:string = `//PROJECTION:${typeName}:start\nexport type ${typeName2} = {`
            const elements = route.elements
            // Loop all elements and get its types
            for(const element of elements){
                // projection
                if(["content","linkToRoute","asset","assets"].includes(element.type)){ projectionType+=`\n    ${element.ID}?:{[key:string]:boolean | {[key:string]:any}} | boolean` }
                else { projectionType+=`\n    ${element.ID}?:boolean` }
                // string
                if(["slug","input","textArea"].includes(element.type)){ type+=`\n    ${element.ID}:string` }
                // number
                else if(element.type==="inputNumber"){ type+=`\n    ${element.ID}:number` }
                // boolean
                else if(element.type==="boolean"){ type+=`\n    ${element.ID}:boolean` }
                // Date
                else if(element.type==="dateTime"){ type+=`\n    ${element.ID}:Date` }
                // Asset
                else if(element.type==="asset"){ type+=`\n    ${element.ID}:import("cms/types").AssetData` }
                // Assets
                else if(element.type==="assets"){ type+=`\n    ${element.ID}:import("cms/types").AssetData[]` }
                // Route
                else if(element.type==="linkToRoute"){ type+=`\n    ${element.ID}:${this.capitalize(element.linkTo!)}Data[]` }
                // Content
                else if(element.type==="content"){ type+=`\n    ${element.ID}:import("cms/packages/editor/types").EditorJsData` }
                // Other
                else { type+=`\n    ${element.ID}:any` }
            }
            // Close type string
            type += `\n}\n//TYPE:${typeName}:end`
            types += `${type}\n\n`
            // Close projection type string
            projectionType += `\n}\n//PROJECTION:${typeName2}:end`
            projectionTypes += `${projectionType}\n\n`
        } 
        // Save types
        fs.writeFileSync(typesPath,types.trimEnd())
        fs.writeFileSync(projectionTypesPath,projectionTypes.trimEnd())
    }

    private capitalize(data:string){ return data.charAt(0).toUpperCase()+data.slice(1)}
    /** Covert _id ObjectId to string from mongodb result object */
    private cleanObjectData(objectData:any){
        objectData['_id'] = objectData['_id'].toString()
        return objectData
    }
    private readJsonToObject(path:string){
        return JSON.parse(fs.readFileSync(path).toString())
    }
    private generateTypes(data:any,typeName:string){
        return new GenerateTypes(data,typeName).get()
    }
}