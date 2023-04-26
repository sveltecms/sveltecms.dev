const SIMPLE_TYPES:string[] = [ "string", "number", "bigint", "boolean", "symbol", "undefined", "object", "function","null","any" ]

export default class GenerateTypes{
    private objectData:{ [key:string]:any }
    private typeName:string
    private globalTypes:{name:string,data:string}[]
    private result:string

    constructor(objectData:{ [key:string]:any },typeName:string){
        this.typeName = this.capitalize(typeName)
        this.objectData = objectData
        this.globalTypes = []
        this.result = `export type ${this.typeName} = {`
    }

    /** Get generated type */
    get(){
        const objectDataType = this.getType(this.objectData)
        if(objectDataType!=="jsObject"){
            console.log("ObjectData most be a JavaScript object");
            return ""
        }
        const objectEntries = Object.entries(this.objectData) 
        // Loop object key and value
        for(let [keyName,keyValue] of objectEntries){
            const inlineTypeName = this.typeName+this.capitalize(keyName)
            // Key type
            const keyType = this.getType(keyValue)            
            // Type is a simple type, return it
            if(SIMPLE_TYPES.includes(keyType)) this.result+=`\n    ${keyName}:${keyType}`
            // IF TYPE IS A JS TYPE
            else if(keyType==="jsObject"){
                const objectTypeResponse = this.getObjectType(keyValue,inlineTypeName)
                this.result+=`\n    ${keyName}:${objectTypeResponse.name}`
            }
            // JS LIST
            else if(keyType==="jsList"){
                const keyTypeData = this.getListType(keyValue,inlineTypeName)
                this.result+=`\n    ${keyName}:${keyTypeData}`
            }
        }
        this.result+= `\n}\n${this.globalTypes.reverse().map(data=>data.data).join("\n")}`
        return `\n//TFromJ:${this.typeName}:start\n${this.result }\n//TFromJ:${this.typeName}:end\n\n`
    }

    /** Get type for object data */
    private getObjectType(objectData:{ [key:string]:any },typeName:string){
        typeName = this.capitalize(typeName)        
        let TYPE_DATA:string = ""
        const objectEntries = Object.entries(objectData)
        // Loop object key and value
        for(let [keyName,keyValue] of objectEntries){
            const inlineTypeName = typeName+this.capitalize(keyName)
            const keyType = this.getType(keyValue)
            // SIMPLE TYPE
            if(SIMPLE_TYPES.includes(keyType)) TYPE_DATA+=`    ${keyName}:${keyType}\n`
            // JS OBJECT
            else if(keyType==="jsObject"){
                const keyTypeData = this.getObjectType(keyValue,inlineTypeName)
                TYPE_DATA+=`    ${keyName}:${keyTypeData.name}\n`
            }
            // JS LIST
            else if(keyType==="jsList"){
                const keyTypeData = this.getListType(keyValue,inlineTypeName)
                TYPE_DATA+=`    ${keyName}:${keyTypeData}\n`
            }
        }
        // Return type and name
        TYPE_DATA = `export type ${typeName} = {\n${TYPE_DATA}}`
        // Add type to types list
        const typeExists = this.globalTypes.find(data=>data.name===typeName)
        if(!typeExists) this.globalTypes.push({ name:typeName,data:TYPE_DATA})
        return { name:typeName,data:TYPE_DATA }
    }

    /** Get type for array data */
    private getListType(listData:any[],typeName:string){
        let ITEM_TYPE:string = ""
        const firstItemData = listData[0]
        const firstItemType = this.getType(firstItemData) as string
        // SIMPLE TYPES
        if(SIMPLE_TYPES.includes(firstItemType)) return firstItemType
        // JS OBJECT
        else if(firstItemType==="jsObject"){
            const objectTypeResponse = this.getObjectType(firstItemData,typeName)
            ITEM_TYPE = objectTypeResponse.name
        }
        // JS ARRAY 
        else if(firstItemType==="jsList"){
            ITEM_TYPE = this.getListType(firstItemData,typeName) as string
        }
        return ITEM_TYPE+"[]"
    }

    /** Get data type */
    private getType(data:any){
        const defaultType = typeof data
        const dataJson = JSON.stringify(data).trim()    
        const dataType = dataJson.startsWith("[") ? "jsList" : dataJson.startsWith("{") ? "jsObject" : data==="any" ? "any" : defaultType === null ? "null" : defaultType
        return dataType    
    }

    /** Capitalize string */
    private capitalize(data:string){
        return data.charAt(0).toUpperCase()+data.slice(1)
    }
}