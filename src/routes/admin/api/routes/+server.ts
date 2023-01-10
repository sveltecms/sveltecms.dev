import db from "$Database"
import cms from "$Cms"
import svelteCMS from "$svelteCMS"
import { json } from "@sveltejs/kit"
import type { LinkedCategoryLoad, LinkedTagLoad, RouteLoad, ApiRouteCreateLoad, ApiRouteCreateData, ApiRouteUpdateLoad, ApiRouteUpdateData, ApiRouteDeleteLoad, ApiCategoryDeleteData, RouteData } from "$Types"
import type { RequestHandler} from "./$types"
import type { FetchRoutesLoad } from "$Types/cms"

// GET / SEARCH ROUTES
export const PATCH:RequestHandler = async({request})=>{   
    const jsonData:FetchRoutesLoad = await request.json();    
    const routes = await cms.Fetch.routes(jsonData)
    return json(routes)
}

// CREATE NEW ROUTE
export const PUT:RequestHandler = async({request})=>{   
    const jsonData:ApiRouteCreateLoad = await request.json();
    const routesCollection = db.collection(svelteCMS.collections.routes)
    /** Check if route ID start with __, if yes return error */
    const routeIDError = jsonData.ID.startsWith("__")
    if(routeIDError){
        const response:ApiRouteCreateData = { ok:false,msg:`Route ID:${jsonData.ID} can not start with __` }
        return json(response)
    }
    /** Check if route ID exists, if yes return error */
    const routeDataDB = await routesCollection.findOne({ID:jsonData.ID})
    if(routeDataDB){
        const response:ApiRouteCreateData = { ok:false,msg:`Route:${jsonData.ID} already exists` }
        return json(response)
    }
    // Else add new routes
    delete jsonData['_id']
    // @ts-ignore 
    const insertRouteDB:any = await routesCollection.insertOne(jsonData)
    // If route was created
    // @ts-ignore 
    if(insertRouteDB.acknowledged){
        handleCategoryTagLinked(jsonData.ID,jsonData)
        const routeData = { ...jsonData,_id:insertRouteDB.insertedId }
        const response:ApiRouteCreateData = { ok:true,msg:`Route:${jsonData.ID} was created`,routeData }
        return json(response)
    }
    // If route was not created 
    else{
        const response:ApiRouteCreateData = { ok:false,msg:`Something went wrong creating route:${jsonData.ID}` }
        return json(response)
    }
}

// UPDATE ROUTE
export const POST:RequestHandler = async({request})=>{   
    const jsonData:ApiRouteUpdateLoad = await request.json()
    const routeID = jsonData.ID
    const routesCollection = db.collection(`${svelteCMS.collections.routes}`)
    /** Check route id exists */
    const routeIDExists = await routesCollection.findOne({ ID:routeID })
    if(!routeIDExists){
        const response:ApiRouteUpdateData = { ok:false,msg:`Route:${routeID} do not exists`}
        return json(response)
    }
    // @ts-ignore Update route
    delete jsonData['_id']
    const routeUpdatedDB = await routesCollection.updateOne({ ID:routeID },{$set:{...jsonData}})
    // If route was updated
    if(routeUpdatedDB){
        handleCategoryTagLinked(jsonData.ID,jsonData)
        const response:ApiRouteUpdateData = {
            ok:true,msg:`Route:${jsonData.ID} was updated`,
            routeData:jsonData
        }
        return json(response)
    }
    // If error updating
    const response:ApiRouteUpdateData = { ok:false,msg:`Error updating route:${jsonData.ID}` }
    return json(response)
}

// DELETE ROUTE
export const DELETE:RequestHandler = async({request}) => {
    const jsonData:ApiRouteDeleteLoad = await request.json()
    const routeID = jsonData.ID
    const routesCollection = db.collection(`${svelteCMS.collections.routes}`)
    /** List of collection from database */
    const routeCollectionsArray =  await db.listCollections().toArray()
    /** Check route id exists */
    const routeIDExists = await routesCollection.findOne({ ID:routeID })
    // If route do not exists, return error
    if(!routeIDExists){
        const response:ApiCategoryDeleteData = { ok:false,msg:`Route:${routeID} do not exists`}
        return json(response)
    }
    // Always check if collection exists(mongoDB only create collection if objects were inserted)
    // Delete route from routes collection
    await routesCollection.deleteOne({ID:jsonData.ID})
    // Drop this route collection
    if(routeCollectionsArray.find(data=>data.name===routeID)){
        db.collection(routeID).drop()
    }
    // Drop this route categories collection
    if(routeCollectionsArray.find(data=>data.name===`${svelteCMS.collections.baseCategories}_${routeID}`)){
        db.collection(`${svelteCMS.collections.baseCategories}_${routeID}`).drop()
    }
    // Drop this route tags collection
    if(routeCollectionsArray.find(data=>data.name===`${svelteCMS.collections.baseTags}_${routeID}`)){
        db.collection(`${svelteCMS.collections.baseTags}_${routeID}`).drop()
    }
    // Handle route deleted
    handleRouteDeleted(jsonData)
    // Return response
    const response:ApiCategoryDeleteData = { ok:true,msg:`Route:${routeID} was delete` }
    return json(response) 
}

/** Handle categories and tags link (link category) */
async function handleCategoryTagLinked(collection:string,route:RouteLoad){
    if(route.includeCategories==="yes"){
        const linkedCategoriesCollection = db.collection(svelteCMS.collections.linkedCategories)
        const newLinkedAsset:LinkedCategoryLoad = { collection, target: "categories" }
        // Check if linked exists
        const linkedExists = await linkedCategoriesCollection.findOne(newLinkedAsset)
        // If do not exists, create new linked asset
        if(!linkedExists) await linkedCategoriesCollection.insertOne(newLinkedAsset)
    }
    if(route.includeTags==="yes"){
        const linkedTagsCollection = db.collection(svelteCMS.collections.linkedTags)
        const newLinkedAsset:LinkedTagLoad = { collection, target: "tags" }
        // Check if linked exists
        const linkedExists = await linkedTagsCollection.findOne(newLinkedAsset)
        // If do not exists, create new linked asset
        if(!linkedExists) await linkedTagsCollection.insertOne(newLinkedAsset)
    }
}

/** Delete any linked assets,tags and categories to this route */
async function handleRouteDeleted(route:RouteData){
    // Drop all linked assets to this route
    const linkedAssetsCollection = db.collection(svelteCMS.collections.linkedAssets)
    linkedAssetsCollection.deleteMany({ collection:route.ID })
    // Drop all linked tags to this route
    if(route.includeTags==="yes"){
        const linkedTagsCollection = db.collection(svelteCMS.collections.linkedTags)
        linkedTagsCollection.deleteMany({ collection:route.ID })
    }
    // Drop all linked categories to this route
    if(route.includeTags==="yes"){
        const linkedCategoriesCollection = db.collection(svelteCMS.collections.linkedCategories)
        linkedCategoriesCollection.deleteMany({ collection:route.ID })
    }
}