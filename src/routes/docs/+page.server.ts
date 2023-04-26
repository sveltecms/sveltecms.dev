import db from "cms/lib/db.server"
import { error } from "@sveltejs/kit"
import type { PagesData } from "cms/types/dynamically"
import type { PagesProjection } from "cms/types/dynamically/projection"

// Create type for the data that will be returned, using the generated Projection type
type ResultData = Omit<PagesData, "updatedAt">

/** Export load function
 * 1: (collection) create collection variable for route where you would like to fetch data from
 * 2: (filter) an object to only return objects that match filter requirement
 * 3: (projection) an object to select what keys will be returned
 * 4: (pageData) data returned from MongoDB, remember to convert ObjectId to string to avoid svelteKit error */
export async function load(){
    const collection = db.collection("pages")
    const filter = { slug:"get-started" }
    const projection:PagesProjection = { title:true,slug:true,content:true }
    const pageData = await collection.findOne(filter,{projection})
    // if page do not exists, throw error
    if(!pageData) throw error(404,{ message:"Page not founded "})
    // else return page data
    const page = { ...pageData,_id:pageData['_id'].toString() } as ResultData
    return { page }
}