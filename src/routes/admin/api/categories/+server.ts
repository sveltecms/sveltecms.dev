import db from "$Database"
import cms from "$Cms"
import svelteCMS from "$svelteCMS"
import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import type { CategoryLoad, LinkedAssetLoad, ApiCategoryCreateLoad,ApiCategoryCreateData, ApiCategoryUpdateLoad, ApiCategoryUpdateData, LinkedCategoryData, ApiCategorySearchData, ApiCategoryDeleteLoad, ApiCategoryDeleteData, ApiCategorySearchLoad } from "$Types"

// Get/Search categories list
export const PATCH:RequestHandler = async({request}) => {
    const jsonData:ApiCategorySearchLoad = await request.json()
    const pageNumber = jsonData.pageNumber
    const count = jsonData.count
    const routeID = jsonData.routeID
    const filter = jsonData.filter.name ? { name:new RegExp(jsonData.filter.name,"i")} : {}
    const routeData = await cms.Fetch.route({ ID:routeID })
    // If route do not exists
    if(!routeData){
        const response:ApiCategorySearchData = []
        return json(response)
    }
    // Else get categories
    const categories = await cms.Fetch.categories({ routeID,pageNumber,count,filter})
    const response:ApiCategorySearchData = categories
    return json(response) 
}

// Get categories list
export const GET:RequestHandler = async({url}) => {
    const routeID = url.searchParams.get("routeID")
    const query = url.searchParams.get("query")
    const pageNumber = Number(url.searchParams.get("page")) || 0
    if(routeID===null&&query===null){
        const response:ApiCategorySearchData = []
        return json(response)
    }
    const routeData = await cms.Fetch.route({ ID:routeID })
    // If route do not exists
    if(!routeData){
        const response:ApiCategorySearchData = []
        return json(response)
    }
    // Else get categories
    const regExp = new RegExp(String(query),"i")
    const categories = await cms.Fetch.categories({ routeID,pageNumber,count:svelteCMS.config.categoriesPerPage,filter:{ name:regExp}})
    const response:ApiCategorySearchData = categories
    return json(response) 
}

// Create category
export const PUT:RequestHandler = async({request}) => {
    const jsonData:ApiCategoryCreateLoad = await request.json()
    const routeID = jsonData.routeID
    const routesCollection = db.collection(`${svelteCMS.collections.routes}`)
    /** Check route id exists */
    const routeIDExists = await routesCollection.findOne({ ID:routeID })
    if(!routeIDExists){
        const response:ApiCategoryCreateData = { ok:false,msg:`Route:${routeID} do not exists`}
        return json(response)
    }
    // Check if category exists
    const categoriesCollection = db.collection(`${svelteCMS.collections.baseCategories}_${routeID}`)
    const categoryDB = await categoriesCollection.findOne({ slug:jsonData.slug })
    // If category exists return error
    if(categoryDB){
        const response:ApiCategoryCreateData = { ok:false,msg:`Category with slug:${jsonData.slug} already exists`}
        return json(response)
    }
    // Else create new category
    const categoryData = { ...jsonData }
    delete categoryData['routeID'] // remove routeID from jsonData
    const insertedCategoryDB = await categoriesCollection.insertOne(categoryData)
    // If category was inserted
    if(insertedCategoryDB){
        handleAssetLinked(`${svelteCMS.collections.baseCategories}_${routeID}`,jsonData)
        // Return response
        const response:ApiCategoryCreateData = { ok:true,msg:`Category:${jsonData.name} was created`,category:{...jsonData,_id:insertedCategoryDB.insertedId} }
        return json(response)   
    }
    // Else return bad response
    const response:ApiCategoryCreateData = { ok:false,msg:`Error inserting category:${jsonData.name}` }
    return json(response) 
}

// Update category
export const POST:RequestHandler = async({request}) => {
    const jsonData:ApiCategoryUpdateLoad = await request.json()
    const routeID = jsonData.routeID
    const routesCollection = db.collection(`${svelteCMS.collections.routes}`)
    /** Check route id exists */
    const routeIDExists = await routesCollection.findOne({ ID:routeID })
    if(!routeIDExists){
        const response:ApiCategoryUpdateData = { ok:false,msg:`Route:${routeID} do not exists`}
        return json(response)
    }
    // Check if category exists
    const categoriesCollection = db.collection(`${svelteCMS.collections.baseCategories}_${routeID}`)
    const categoryDB = await categoriesCollection.findOne({ slug:jsonData.slug })
    // If category do not exists return error
    if(!categoryDB){
        const response:ApiCategoryUpdateData = { ok:false,msg:`Category with slug:${jsonData.slug} already exists`}
        return json(response)
    }
    // Else update category
    // @ts-ignore Remove _id to avoid error 
    delete jsonData['_id']
    delete jsonData['routeID'] // remove routeID from jsonData
    const categoryUpdated = await categoriesCollection.updateOne({ slug:jsonData.slug },{$set:jsonData})
    if(categoryUpdated.acknowledged){
        handleAssetLinked(`${svelteCMS.collections.baseCategories}_${routeID}`,jsonData)
        handleCategoryUpdated(jsonData)
        // Return response
        const response:ApiCategoryUpdateData = { ok:true,msg:`Category:${jsonData.name} was updated` }
        return json(response) 
    }
    // Else return bad response
    const response:ApiCategoryUpdateData = { ok:true,msg:`Category:${jsonData.name} was updated` }
    return json(response) 
}

// DELETE CATEGORY
export const DELETE:RequestHandler = async({params,request}) => {
    const jsonData:ApiCategoryDeleteLoad = await request.json()
    const routeID = jsonData.routeID
    const routesCollection = db.collection(`${svelteCMS.collections.routes}`)
    /** Check route id exists */
    const routeIDExists = await routesCollection.findOne({ ID:routeID })
    if(!routeIDExists){
        const response:ApiCategoryDeleteData = { ok:false,msg:`Route:${routeID} do not exists`}
        return json(response)
    }
    // Check if category exists
    const categoriesCollection = db.collection(`${svelteCMS.collections.baseCategories}_${routeID}`)
    const categoryDB = await categoriesCollection.findOne({ slug:jsonData.slug })
    // If category do not exists return error
    if(!categoryDB){
        const response:ApiCategoryDeleteData = { ok:false,msg:`Category with slug:${jsonData.slug} do not exists`}
        return json(response)
    }
    // Delete category
    // @ts-ignore Remove _id to avoid error 
    delete jsonData['_id']
    const categoryDeleted = await categoriesCollection.deleteOne({ slug:jsonData.slug })
    // if category was deleted
    if(categoryDeleted.acknowledged){
        handleCategoryDeleted(jsonData)
        const response:ApiCategoryDeleteData = { ok:true,msg:`Category:${jsonData.name} was deleted` }
        return json(response) 
    }
    // if category was not deleted
    const response:ApiCategoryDeleteData = { ok:false,msg:`Error deleting category:${jsonData.name}` }
    return json(response) 
}

/** Delete category from where data is linked to */
async function handleCategoryDeleted(newCategoryData:CategoryLoad){
    const linkedCategoriesCollection = db.collection(svelteCMS.collections.linkedCategories)
    const linkedCollections = await linkedCategoriesCollection.find().toArray() 
    for(const data of linkedCollections){
        const linkedCategory:LinkedCategoryData = data as any
        const linkedCollection = db.collection(linkedCategory.collection)
        const filter = { [`${linkedCategory.target}.slug`]:newCategoryData.slug }
        // Remove Category where Category is being used
        // @ts-ignore
        linkedCollection.updateMany(filter,{ $pull: { [linkedCategory.target]:{ slug:newCategoryData.slug } } })
    }
}

/** Handle linked assets */
async function handleAssetLinked(collection:string,categoryData:CategoryLoad){
    if(categoryData.image.path==="no-image.jpeg") return
    // Run code here
    const linkedAssetsCollection = db.collection(svelteCMS.collections.linkedAssets)
    const newLinkedAsset:LinkedAssetLoad = { collection, target: "image" }
    // Check if linked exists
    const linkedExists = await linkedAssetsCollection.findOne(newLinkedAsset)
    // If do not exists, create new linked asset
    if(!linkedExists) await linkedAssetsCollection.insertOne(newLinkedAsset)
}

/** Update category where data is linked to */
async function handleCategoryUpdated(newCategoryData:CategoryLoad){
    const linkedCategoriesCollection = db.collection(svelteCMS.collections.linkedCategories)
    const linkedCollections = await linkedCategoriesCollection.find().toArray() 
    for(const data of linkedCollections){
        const linkedCategory:LinkedCategoryData = data as any
        const linkedCollection = db.collection(linkedCategory.collection)
        const filter = { [`${linkedCategory.target}.slug`]:newCategoryData.slug }
        // Update Category where Category is being used
        linkedCollection.updateMany(filter,{$set:{[`${linkedCategory.target}.$`]:newCategoryData}})
    }
}