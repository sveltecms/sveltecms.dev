import type { ObjectId } from "mongodb"

/** Data object from route object */
export type ObjectData = { [key:string]:any }

/** Elements types allow in route data */
export type ElementType = "dateTime" | "textArea" | "input" | "inputNumber" | "slug" | "content" | "image" | "images" | "_categories" | "_tags" | "_status" | "_createdAt" | "_updatedAt"

/** Route element object data */
export type ElementData = {
    /** Unique id for each element */
    ID:string
    /** Name of element */
    name:string
    /** Type of element "dateTime" | "textArea" | "input" | "inputNumber" | "slug" | "content" | "image" | "images" | "_categories" | "_tags" | "_status" | "_createdAt" | "_updatedAt" */
    type:ElementType
    /** Element value (data) */
    value:any
}

/** Route object data needed to create or update route */
export type RouteLoad = {
    /** Route title */
    title:string
    /** Route id = slug (unique) */
    ID:string
    /** If yes we will generate a categories collection for route */
    includeCategories:"yes"|"no"
    /** If yes we will generate a tags collection for route */
    includeTags:"yes"|"no"
    /** Page info */
    meta:{ title:string, description:string }
    /** Route elements that will be displayed */
    elements:ElementData[]
    /** Only here to bypass type checks */
    _id?:ObjectId | string
}

/** Route object data returned from route */
export interface RouteData extends RouteLoad  {
    /** MongoDB super key id */
    _id:ObjectId | string
}

/** Routes key objects */
export type RoutesData = {
    /** Route id = slug (unique) */
    [id:string]:RouteData
}