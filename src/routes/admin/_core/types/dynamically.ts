/** Object data for objects inside route:pages */
export type PagesObjectData = {
    title:string
    slug:string
    views:number
    content:any
    _id:import("mongodb").ObjectId
    _status:import("$Types").StatusData
    _createdAt:number
    _updatedAt:number
}