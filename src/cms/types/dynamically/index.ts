//TYPE:PagesData:start
export type PagesData = {
    _id:any
    title:string
    slug:string
    content:import("cms/packages/editor/types").EditorJsData
}
//TYPE:PagesData:end

//TYPE:TagsData:start
export type TagsData = {
    _id:any
    title:string
    slug:string
    description:string
    image:import("cms/types").AssetData
}
//TYPE:TagsData:end