import type { ObjectId } from "mongodb"
import type { AssetData } from "./asset"

/** Data needed to create new user */
export type UserLoad = {
    firstName:string
    lastName:string
    email:string
    password:string
    image:AssetData
    verified:boolean
    role:"root"|"admin"|"user"
    sessions:SessionData
    /** MongoDB _id only to bypass type checks */
    _id?:ObjectId|string
}
/** Data return from user object */
export interface UserData extends UserLoad{
    _id:any
}

export type SessionData = {
    [key:string]:{
        token:string
        userAgent:string
        createdAt: Date
        expireOn: Date
    }
}