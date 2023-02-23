import cms from "$Cms"
import db from "$Database"
import svelteCMS from "$svelteCMS"
import { json } from "@sveltejs/kit"
import { elementsToObject } from "$Utilities"
import type { FetchRouteObjectsLoad } from "$Types/cms"
import type { RequestHandler } from "./$types"
import type { ApiObjectCreateLoad,ApiObjectCreateData, ElementData, LinkedAssetLoad, ApiObjectDeleteLoad, ApiObjectDeleteData, ApiObjectUpdateLoad, ApiObjectUpdateData, LinkedCategoryLoad, LinkedTagLoad } from "$Types"
import { ObjectId } from "mongodb"

// GET / SEARCH OBJECTS
export const PATCH:RequestHandler = async({request,url})=>{   
    const jsonData:FetchRouteObjectsLoad = await request.json()
    const pageNumber = jsonData.pageNumber
    const filter = jsonData.filter ? { title:new RegExp(jsonData.filter.title,"ig" )} : {}
    const count = jsonData.count
    const objects = await cms.Fetch.routeObjects({filter,count,pageNumber,routeID:jsonData.routeID})
    return json(objects)
}

// CREATE OBJECT
export const PUT:RequestHandler = async({request}) => {
    const jsonData:ApiObjectCreateLoad = await request.json()
    const routeID = jsonData.routeID
    const routesCollection = db.collection(`${svelteCMS.collections.routes}`)
    /** Check route id exists */
    const routeIDExists = await routesCollection.findOne({ ID:routeID })
    if(!routeIDExists){
        const response:ApiObjectCreateData = { ok:false,msg:`Route:${routeID} do not exists`}
        return json(response)
    }
    // Create collection cursor
    const routeObjectsCollection = db.collection(routeID)
    /** Check for slug duplicates */
    const findElementSlug = jsonData.elements.find(data=>data.type==="slug")
    if(findElementSlug){
        const slugDataDB = await routeObjectsCollection.findOne({ slug:findElementSlug.value })
        if(slugDataDB){
            const response:ApiObjectCreateData = { ok:false,msg:`Route object with slug:${findElementSlug.value} already exists`}
            return json(response)
        }
    }
    // Create route object
    /** Convert elements to json object */
    const newObjectData = elementsToObject(jsonData.elements)
    const insertedObjectDB = await routeObjectsCollection.insertOne(newObjectData)
    // If object was inserted to collection
    if(insertedObjectDB.acknowledged){
        // Create link to assets if any element contain asset as value
        newObjectLinking(routeID,jsonData.elements)
        // Return response
        const response:ApiObjectCreateData = { ok:true,msg:`Route object:${insertedObjectDB.insertedId} was created`}
        return json(response)
    }
    // If object was not inserted to collection
    const response:ApiObjectCreateData = { ok:false,msg:`Something went wrong inserting new object`}
    return json(response)
}

// DELETE OBJECT
export const DELETE:RequestHandler = async({params,request}) => {
    const jsonData:ApiObjectDeleteLoad = await request.json()
    const routeID = jsonData.routeID
    const routesCollection = db.collection(`${svelteCMS.collections.routes}`)
    /** Check route id exists */
    const routeIDExists = await routesCollection.findOne({ ID:routeID })
    if(!routeIDExists){
        const response:ApiObjectDeleteData = { ok:false,msg:`Route:${routeID} do not exists`}
        return json(response)
    }
    // Check if object exists
    const objectsCollection = db.collection(routeID)
    const objectDB = await objectsCollection.findOne({ _id:new ObjectId(jsonData._id) })
    // If object do not exists return error
    if(!objectDB){
        const response:ApiObjectDeleteData = { ok:false,msg:`Object with id:${jsonData._id} do not exists`}
        return json(response)
    }
    // Delete object
    const deletedCategoryDB = await objectsCollection.deleteOne({ _id:new ObjectId(jsonData._id) })
    if(deletedCategoryDB.acknowledged){
        const response:ApiObjectDeleteData = { ok:true,msg:`Object:${jsonData._id} was deleted` }
        return json(response)
    }
    const response:ApiObjectDeleteData = { ok:false,msg:`Something went wrong deleting Object:${jsonData._id}` }
    return json(response) 
}


// UPDATE OBJECT
export const POST:RequestHandler = async({params,request}) => {
    const jsonData:ApiObjectUpdateLoad = await request.json()
    const routeID = jsonData.routeID
    const routesCollection = db.collection(`${svelteCMS.collections.routes}`)
    /** Check route id exists */
    const routeIDExists = await routesCollection.findOne({ ID:routeID })
    if(!routeIDExists){
        const response:ApiObjectUpdateData = { ok:false,msg:`Route:${routeID} do not exists`}
        return json(response)
    }
    // Create collection cursor
    const objectsCollection = db.collection(routeID)
    // Check if object really exists in database
    const objectDataDB = await objectsCollection.findOne({ _id:new ObjectId(jsonData.objectID)})
    // If object not in database, return error
    if(!objectDataDB){
        const response:ApiObjectUpdateData = { ok:false,msg:`Object with id:${jsonData.objectID} do not exists`}
        return json(response)
    }
    // Update object
    /** Convert elements to json object */
    const updatedObjectData = elementsToObject(jsonData.elements)
    const updatedObjectDB = await objectsCollection.updateOne({ _id:new ObjectId(jsonData.objectID)},{$set:updatedObjectData})
    // If object was updated to collection
    if(updatedObjectDB.acknowledged){
        newObjectLinking(routeID,jsonData.elements)
        const response:ApiObjectUpdateData = { ok:true,msg:`Route object:${jsonData.objectID} was updated`}
        return json(response)
    }
    // If object was not inserted to collection
    const response:ApiObjectUpdateData = { ok:false,msg:`Something went wrong updating object:${jsonData.objectID}`}
    return json(response)
}

/** Link any needed data to object */
async function newObjectLinking(collection:string,elements:ElementData[]){
    const linkedAssetsCollection = db.collection(svelteCMS.collections.linkedAssets)
    const linkedCategoriesCollection = db.collection(svelteCMS.collections.linkedCategories)
    const linkedTagsCollection = db.collection(svelteCMS.collections.linkedTags)
    const withCategories = elements.find(data=>data.type==="_categories")
    const withTags = elements.find(data=>data.type==="_tags")
    if(withCategories){
        const newLinkedCategory:LinkedCategoryLoad = { collection,target:"_categories" }
        await linkedCategoriesCollection.insertOne(newLinkedCategory)
    }
    if(withTags){
        const newLinkedTag:LinkedTagLoad = { collection,target:"_tags" }
        await linkedTagsCollection.insertOne(newLinkedTag)
    }
    // Linked assets fields 
    const elementsWithAsset = elements.filter(data=>["image","images"].includes(data.type))
    for(const element of elementsWithAsset){
        const newLinkedAsset:LinkedAssetLoad = { collection, target: element.ID }
        // Check if linked exists
        const linkedExists = await linkedAssetsCollection.findOne(newLinkedAsset)
        // If do not exists, create new linked asset
        if(!linkedExists) await linkedAssetsCollection.insertOne(newLinkedAsset)
    }
}