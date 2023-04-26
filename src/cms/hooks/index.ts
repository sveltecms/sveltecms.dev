import type { BeforeAddingObject,BeforeUpdatingObject } from "./types"

/** Run before adding route object */
export const beforeAddingObject:BeforeAddingObject = async(db,funcData)=>{
    // check if slug exists for posts
    if(funcData.routeID==="posts"){
        const collection = db.collection("posts")
        const slug = funcData.elements.find(data=>data.type==="slug")?.value as string
        const slugExists = await collection.findOne({ slug })
        if(slugExists){
            const response = {
                ok:false,
                msg:`Post with slug:${slug} already exists`
            }
            return response
        }
    }
    // return response
    const response = {
        ok:true,
        msg:"beforeAddingObject hook passed"
    }
    return response
}

/** Run before updating route object */
export const beforeUpdatingObject:BeforeUpdatingObject = async(db,funcData)=>{
    // return response
    const response = {
        ok:true,
        msg:"beforeUpdatingObject hook passed"
    }
    return response
}