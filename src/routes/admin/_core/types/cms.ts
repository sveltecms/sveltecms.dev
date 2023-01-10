import type { AssetData,CategoryData, RouteData, ObjectData, TagData, UserData } from "$Types"
import type { ObjectId } from "mongodb"

/** Data needed to fetch single route */
export type FetchRouteLoad = { _id:ObjectId } | { ID:string } | { title:string } | { [key:string]:any } | {}
/** Data returned from fetching route */
export type FetchRouteRes = RouteData|null
/** Data needed to fetch routes */
export interface FetchRoutesLoad {
    filter:{ _id:ObjectId } | { ID:string } | { title:string } | { [key:string]:any } | {}
    count:number
    pageNumber?:number
    sort?:"newFirst"|"oldFirst"
}
/** Data returned from fetching routes */
export type FetchRoutesRes = RouteData[]


/** Data needed to fetch single route object */
export type FetchRouteObjectLoad = { _id:ObjectId } | { [key:string]:any }
/** Data returned from fetching route object */
export type FetchRouteObjectRes = ObjectData|null
/** Data needed to fetch route objects */
export interface FetchRouteObjectsLoad {
    filter:{ _id:ObjectId } | { [key:string]:any }
    /** Route ID example posts */
    routeID:any
    count:number
    pageNumber?:number
    sort?:"newFirst"|"oldFirst"
}
/** Data returned from fetching route objects */
export type FetchRouteObjectsRes = any[]


/** Data needed to fetch single asset */
export type FetchAssetLoad = { _id:ObjectId } | { name:any } | { [key:string]:any } | {}
/** Data returned from fetching asset */
export type FetchAssetRes = AssetData|null
/** Data needed to fetch assets */
export interface FetchAssetsLoad {
    filter:{ name:string|RegExp } | null
    count:number
    pageNumber?:number
    sort?:"newFirst"|"oldFirst"
}
/** Data returned from fetching assets */
export type FetchAssetsRes = AssetData[]


/** Data needed to fetch single asset */
export type FetchUserLoad = { _id:ObjectId } | { email:string } | { [key:string]:any } | {}
/** Data returned from fetching user */
export type FetchUserRes = UserData|null
/** Data needed to fetch users */
export interface FetchUsersLoad {
    filter:{ _id:ObjectId } | { email:string } | { [key:string]:any } | {}
    count:number
    pageNumber?:number
    sort?:"newFirst"|"oldFirst"
}
/** Data returned from fetching users */
export type FetchUsersRes = UserData[]


/** Data needed to fetch single category */
export type FetchCategoryLoad = { _id:ObjectId,routeID:any } | { name:string,routeID:any } | { [key:string]:any,routeID:any } | { routeID:any }
/** Data returned from fetching category */
export type FetchCategoryRes = CategoryData | null
/** Data needed to fetch category */
export interface FetchCategoriesLoad {
    filter:{ [key:string]:any }
    routeID:any
    count:number
    pageNumber?:number
    sort?:"newFirst"|"oldFirst"
}
/** Data returned from fetching categories */
export type FetchCategoriesRes = CategoryData[]


/** Data needed to fetch single tag */
export type FetchTagLoad = { _id:ObjectId,routeID:any } | { name:string,routeID:any } | { [key:string]:any,routeID:any } | { routeID:any }
/** Data returned from fetching tag */
export type FetchTagRes = TagData | null
/** Data needed to fetch tag */
export interface FetchTagsLoad {
    filter:{ [key:string]:any }
    routeID:any
    count:number
    pageNumber?:number
    sort?:"newFirst"|"oldFirst"
}
/** Data returned from fetching tags */
export type FetchTagsRes = TagData[]

/** Object to create cookie */
export type CookieSessionData = {
    /** Token / Session */
    t:string
    /** User id / MongoID */
    u:string
}

/** Data needed to login user */
export type AuthLoginLoad = {
    email:string
    password:string
}

/** Response from login api endpoint */
export type ApiAuthLoginData = {
    ok:boolean
    msg:string
}