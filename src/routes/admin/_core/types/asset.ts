import type { ObjectId } from "mongodb"

/** Data need to upload new asset */
export interface AssetLoad {
    name:string
    path:string
    type:"image"|"video"|"other"
    extension:string
}

/** Data object from asset to upload new asset */
export interface AssetData extends AssetLoad {  _id:ObjectId|string }

/** Response from new asset created */
export type ApiAssetCreateLoad = FormData

/** Response from new asset created */
export type ApiAssetCreateData = {
    ok:false,
    msg:string
} | {
    ok:true,
    msg:string
    _id:any
    name:string
    path:string
    type:"image"|"video"|"other"
    extension:string
}

/** Data needed to link new asset */
export type LinkedAssetLoad = {
    /** Collection name */
    collection:string
    /** Collection's element targeting */
    target:string
}

/** Data object returned from linked asset */
export interface LinkedAssetData extends LinkedAssetLoad {
    /** MongoDB _id */
    _id:ObjectId
}