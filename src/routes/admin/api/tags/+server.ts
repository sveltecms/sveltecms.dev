import db from "$Database"
import cms from "$Cms"
import svelteCMS from "$svelteCMS"
import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import type { ApiTagCreateLoad,ApiTagCreateData,ApiTagDeleteLoad,ApiTagDeleteData,TagLoad, LinkedTagData, ApiTagUpdateLoad, ApiTagUpdateData, ApiTagSearchData, ApiTagSearchLoad } from "$Types"

// Get/Search tags list
export const PATCH:RequestHandler = async({url,request}) => {
    const jsonData:ApiTagSearchLoad = await request.json()
    const pageNumber = jsonData.pageNumber
    const count = jsonData.count
    const routeID = jsonData.routeID
    const filter = jsonData.filter.name ? { name:new RegExp(jsonData.filter.name,"i")} : {}
    const routeData = await cms.Fetch.route({ ID:routeID })
    // If route do not exists
    if(!routeData){
        const response:ApiTagSearchData = []
        return json(response)
    }
    // Else get tags
    const tags = await cms.Fetch.tags({ routeID,pageNumber,count,filter})
    const response:ApiTagSearchData = tags
    return json(response) 
}

// Create tag
export const PUT:RequestHandler = async({request}) => {
    const jsonData:ApiTagCreateLoad = await request.json()
    const routeID = jsonData.routeID
    const routesCollection = db.collection(`${svelteCMS.collections.routes}`)
    /** Check route id exists */
    const routeIDExists = await routesCollection.findOne({ ID:routeID })
    if(!routeIDExists){
        // createTagRes
        const response:ApiTagCreateData = { ok:false,msg:`Route:${routeID} do not exists`}
        return json(response)
    }
    // Check if tag exists
    const tagsCollection = db.collection(`${svelteCMS.collections.baseTags}_${routeID}`)
    const tagDB = await tagsCollection.findOne({ slug:jsonData.slug })
    // If tag exists return error
    if(tagDB){
        const response:ApiTagCreateData = { ok:false,msg:`Tag with slug:${jsonData.slug} already exists`}
        return json(response)
    }
    // Else create new tag
    delete jsonData['routeID'] // Remove routeID before insert
    const insertedTagDB = await tagsCollection.insertOne(jsonData)
    const response:ApiTagCreateData = { ok:true,msg:`Tag:${jsonData.name} created`,tag:{...jsonData,_id:insertedTagDB.insertedId} }
    return json(response) 
}

// DELETE TAG
export const DELETE:RequestHandler = async({request}) => {
    const jsonData:ApiTagDeleteLoad = await request.json()
    const routeID = jsonData.routeID
    const routesCollection = db.collection(`${svelteCMS.collections.routes}`)
    /** Check route id exists */
    const routeIDExists = await routesCollection.findOne({ ID:routeID })
    if(!routeIDExists){
        const response:ApiTagDeleteData = { ok:false,msg:`Route:${routeID} do not exists`}
        return json(response)
    }
    // Check if tag exists
    const tagsCollection = db.collection(`${svelteCMS.collections.baseTags}_${routeID}`)
    const tagDB = await tagsCollection.findOne({ slug:jsonData.slug })
    // If tag do not exists return error
    if(!tagDB){
        const response:ApiTagDeleteData = { ok:false,msg:`Tag with slug:${jsonData.slug} do not exists`}
        return json(response)
    }
    // Delete tag
    // @ts-ignore Remove _id to avoid error 
    delete jsonData['_id']
    const tagDeleted = await tagsCollection.deleteOne({ slug:jsonData.slug })
    // If tag was deleted
    if(tagDeleted.acknowledged){
        handleTagDeleted(jsonData)
        const response:ApiTagDeleteData = { ok:true,msg:`Tag:${jsonData.name} was deleted` }
        return json(response) 
    }
    // If tag was not deleted
    const response:ApiTagDeleteData = { ok:false,msg:`Error deleting tag:${jsonData.name}` }
    return json(response) 
}

// Update tag
export const POST:RequestHandler = async({params,request}) => {
    const jsonData:ApiTagUpdateLoad = await request.json()
    const routeID = jsonData.routeID
    const routesCollection = db.collection(`${svelteCMS.collections.routes}`)
    /** Check route id exists */
    const routeIDExists = await routesCollection.findOne({ ID:routeID })
    if(!routeIDExists){
        const response:ApiTagUpdateData = { ok:false,msg:`Route:${routeID} do not exists`}
        return json(response)
    }
    // Check if tag exists
    const tagsCollection = db.collection(`${svelteCMS.collections.baseTags}_${routeID}`)
    const tagDB = await tagsCollection.findOne({ slug:jsonData.slug })
    // If tag do not exists return error
    if(!tagDB){
        const response:ApiTagUpdateData = { ok:false,msg:`Tag with slug:${jsonData.slug} do not exists`}
        return json(response)
    }
    // Else update new tag
    // @ts-ignore Remove _id to avoid error 
    delete jsonData['_id']
    const updatedTagDB = await tagsCollection.updateOne({ slug:jsonData.slug },{$set:jsonData})
    // If tag was updated
    if(updatedTagDB.acknowledged){
        handleTagUpdated(jsonData)
        const response:ApiTagUpdateData = { ok:true,msg:`Tag:${jsonData.name} updated` }
        return json(response) 
    }
    // If tag was not updated
    const response:ApiTagUpdateData = { ok:false,msg:`Error updating tag:${jsonData.name}` }
    return json(response) 
}

/** Update tag where data is linked to */
async function handleTagUpdated(newTagData:TagLoad){
    const linkedTagsCollection = db.collection(svelteCMS.collections.linkedTags)
    const linkedCollections = await linkedTagsCollection.find().toArray() 
    for(const data of linkedCollections){
        const linkedTag:LinkedTagData = data as any
        const linkedCollection = db.collection(linkedTag.collection)
        const filter = { [`${linkedTag.target}.slug`]:newTagData.slug }
        // Update Tag where Tag is being used
        linkedCollection.updateMany(filter,{$set:{[`${linkedTag.target}.$`]:newTagData}})
    }
}

/** Delete tag from where data is linked to */
async function handleTagDeleted(newTagData:TagLoad){
    const linkedTagsCollection = db.collection(svelteCMS.collections.linkedTags)
    const linkedCollections = await linkedTagsCollection.find().toArray() 
    for(const data of linkedCollections){
        const linkedTag:LinkedTagData = data as any
        const linkedCollection = db.collection(linkedTag.collection)
        const filter = { [`${linkedTag.target}.slug`]:newTagData.slug }
        // Remove Tag where Tag is being used
        // @ts-ignore
        linkedCollection.updateMany(filter,{ $pull: { [linkedTag.target]:{ slug:newTagData.slug } } })
    }
}