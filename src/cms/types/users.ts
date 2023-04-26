import type { AssetData } from "cms/types"

/** Data needed to create user */
export type UserLoad = {
    firstName: string
    lastName: string
    email: string
    password: string
    role: "user"|"admin"
    image:AssetData
    createdAt:Date
    updatedAt:Date
}

/** Data returned from user */
export interface UserData extends UserLoad { _id:any }

/** Data needed to login user */
export type UserSessionLoad = {
    userID:string
    createdAt:Date
    expireAt:Date
    ip:string
    browser:string
}
export interface UserSessionData extends UserSessionLoad { _id:any }