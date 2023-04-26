//PROJECTION:PagesData:start
export type PagesProjection = {
    title?:boolean
    slug?:boolean
    content?:{[key:string]:boolean | {[key:string]:any}} | boolean
}
//PROJECTION:PagesProjection:end