import db from "$Database"
import cms from "$Cms"
import bcrypt from "bcrypt"
import svelteCMS from "$svelteCMS"
import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import type { ApiUserCreateLoad,ApiUserCreateData, ApiUserDeleteLoad, ApiUserDeleteData, ApiUserUpdateLoad, ApiUserUpdateData } from "$Types"
import type { FetchUsersLoad } from "$Types/cms"
import { ObjectId } from "mongodb"

// Search / get list of users
export const PATCH:RequestHandler = async({ request }) => {
    const jsonData:FetchUsersLoad = await request.json()
    const pageNumber = jsonData.pageNumber
    const filter = jsonData.filter ? { firstName:new RegExp(jsonData.filter.firstName,"ig" )} : {}
    const count = jsonData.count
    const users = await cms.Fetch.users({ count:count,pageNumber,filter})
    return json(users)
}

// Create user
export const PUT:RequestHandler = async({request}) => {
    const jsonData:ApiUserCreateLoad = await request.json()
    const usersCollection = db.collection(`${svelteCMS.collections.users}`)
    /** Check if user with this email exists */
    const userDataDB = await usersCollection.findOne({ email:jsonData.email })
    if(userDataDB){
        const response:ApiUserCreateData = { ok:false,msg:`User with email:${jsonData.email} already exists`}
        return json(response)
    }
    // Hash password and create new user
    const hashedPassword = await bcrypt.hash(jsonData.password,10)
    const newUserData:any = { ...jsonData,password:hashedPassword}
    // Insert new user
    const userInsertedDB = await usersCollection.insertOne(newUserData)
    if(userInsertedDB.acknowledged){
        // Return response
        const response:ApiUserCreateData = { ok:true,msg:`User ${jsonData.firstName} created` }
        return json(response) 
    }
    // Else return bad response
    const response:ApiUserCreateData = { ok:false,msg:`User ${jsonData.firstName} was not created` }
    return json(response) 
}

// Delete user
export const DELETE:RequestHandler = async({request}) => {
    const jsonData:ApiUserDeleteLoad = await request.json()
    const userFilter = { _id:new ObjectId(jsonData._id) }
    const usersCollection = db.collection(`${svelteCMS.collections.users}`)
    /** Check if user exists */
    const userDataDB = await usersCollection.findOne(userFilter)
    // If user do not exists, return error
    if(!userDataDB){
        const response:ApiUserDeleteData = { ok:false,msg:`User with ${jsonData.email} do not exists`}
        return json(response)
    }
    // Check if user is not the default root user
    const isDefaultUser = jsonData.email==="root@sveltecms.dev" && jsonData.firstName==="svelte" && jsonData.lastName==="cms"
    if(isDefaultUser){
        const response:ApiUserDeleteData = { ok:false,msg:"Root user can never be deleted" }
        return json(response)
    }
    // Delete user
    await usersCollection.deleteOne(userFilter)
    const response:ApiUserDeleteData = { ok:true,msg:`User ${jsonData.firstName} was deleted` }
    return json(response) 
}

// Update user
export const POST:RequestHandler = async({request}) => {
    const jsonData:ApiUserUpdateLoad = await request.json()
    const userFilter = { _id:new ObjectId(jsonData._id) }
    const usersCollection = db.collection(`${svelteCMS.collections.users}`)
    /** Check if user exists */
    const userDataDB = await usersCollection.findOne(userFilter)
    // If user do not exists, return error
    if(!userDataDB){
        const response:ApiUserUpdateData = { ok:false,msg:`User with: ${jsonData._id} do not exists`}
        return json(response)
    }
    // Update user
    const newUserData = jsonData
    delete newUserData['_id']
    await usersCollection.updateOne(userFilter,{$set:{...newUserData}})
    const response:ApiUserUpdateData = { ok:true,msg:`User ${jsonData.firstName} was updated` }
    return json(response) 
}