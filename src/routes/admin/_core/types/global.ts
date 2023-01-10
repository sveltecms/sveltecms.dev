import type { ObjectId } from "mongodb"
import type { AssetData } from "./asset"

// CATEGORY ============================================

/** Object data to create new category */
export type CategoryLoad = {
    /** Category name */
    name:string
    /** Category slug (unique) */
    slug:string
    /** Category description */
    description:string
    /** Category image(asset) */
    image:AssetData
    /** Only to bypass type check */
    _id?:any
}
/** Object data returned from category */
export interface CategoryData extends CategoryLoad {
    /** MongoDB super key id */
    _id:any
}

// TAG ============================================

/** Object data to create new tag */
export type TagLoad = {
    /** Tag name */
    name:string
    /** Tag description */
    description:string
    /** Tag slug (unique) */
    slug:string
    /** Only to bypass type check */
    _id?:any
}
/** Object data returned from tag */
export interface TagData extends TagLoad {
    /** MongoDB super key id */
    _id:any
}

// LINKED CATEGORY AND TAG ============================================

/** Data needed to link new category to collections */
export type LinkedCategoryLoad = {
    /** Collection name */
    collection:string
    /** Collection's element targeting */
    target:string
}
/** Data object returned from linking new category to collections */
export interface LinkedCategoryData extends LinkedCategoryLoad {
    /** MongoDB _id */
    _id:ObjectId
}
/** Data needed to link new tag to collections */
export type LinkedTagLoad = {
    /** Collection name */
    collection:string
    /** Collection's element targeting */
    target:string
}
/** Data object returned from linking new tag to collections */
export interface LinkedTagData extends LinkedTagLoad {
    /** MongoDB _id */
    _id:ObjectId
}

export type StatusData = "public"|"private"