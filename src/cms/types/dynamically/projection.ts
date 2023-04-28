//PROJECTION:PagesData:start
export type PagesProjection = {
    title?:boolean
    slug?:boolean
    content?:{[key:string]:boolean | {[key:string]:any}} | boolean
}
//PROJECTION:PagesProjection:end

//PROJECTION:TagsData:start
export type TagsProjection = {
    title?:boolean
    slug?:boolean
    description?:boolean
    image?:{[key:string]:boolean | {[key:string]:any}} | boolean
}
//PROJECTION:TagsProjection:end