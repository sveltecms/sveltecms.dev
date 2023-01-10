import type { AssetData } from "$Types"
import type { CategoryLoad,CategoryData,TagLoad,TagData, RouteData, RouteLoad, ElementData, ObjectData, UserLoad, UserData } from "$Types"
import type { FetchAssetsLoad, FetchCategoriesLoad, FetchTagsLoad } from "$Types/cms"

/** Data needed to search categories */
export type ApiCategorySearchLoad = FetchCategoriesLoad
/** Response from search categories */
export type ApiCategorySearchData = CategoryData[]

/** Data needed to update category */
export type ApiCategoryCreateLoad = CategoryLoad & { routeID:any }
/** Response from updating category */
export type ApiCategoryCreateData = {
    ok:false
    msg:string
} | {
    ok:true
    msg:string
    category:CategoryData
}
/** Data needed to update category */
export type ApiCategoryUpdateLoad = CategoryLoad & { routeID:any }
/** Response from updating category */
export type ApiCategoryUpdateData = {
    ok:boolean
    msg:string
}
/** Data needed to delete category */
export type ApiCategoryDeleteLoad = CategoryData & { routeID:any }
/** Response from deleting category */
export type ApiCategoryDeleteData = {
    ok:boolean
    msg:string
}

/** Data needed to search tags */
export type ApiTagSearchLoad = FetchTagsLoad
/** Response from search tags */
export type ApiTagSearchData = TagData[]
/** Data needed to update tag */
export type ApiTagCreateLoad = TagLoad & { routeID:any }
/** Response from updating tag */
export type ApiTagCreateData = {
    ok:false
    msg:string
} | {
    ok:true
    msg:string
    tag:TagData
}
/** Data needed to update tag */
export type ApiTagUpdateLoad = TagData & { routeID:any }
/** Response from updating tag */
export type ApiTagUpdateData = {
    ok:boolean
    msg:string
}
/** Data needed to delete tag */
export type ApiTagDeleteLoad = TagData & { routeID:any }
/** Response from deleting tag */
export type ApiTagDeleteData = {
    ok:boolean
    msg:string
} 

/** Load data needed to create route */
export type ApiRouteCreateLoad = RouteLoad
/** Response from creating route */
export type ApiRouteCreateData = {
    ok:false
    msg:string
} | {
    ok:true
    msg:string
    routeData:RouteData
}
/** Load data needed to update route */
export type ApiRouteUpdateLoad = RouteData
/** Response from updating route */
export type ApiRouteUpdateData = {
    ok:false
    msg:string
} | {
    ok:true
    msg:string
    routeData:RouteData
}
/** Data needed to delete route */
export type ApiRouteDeleteLoad = RouteData
/** Response from deleting route */
export type ApiRouteDeleteData = {
    ok:boolean
    msg:string
}

/** Load data needed to create route object */
export type ApiObjectCreateLoad = { elements:ElementData[],routeID:any }
/** Response from creating route object */
export type ApiObjectCreateData = {
    ok:boolean
    msg:string
}
/** Load data needed to update route object */
export type ApiObjectUpdateLoad = { objectID:any,routeID:any,elements:ElementData[] }
/** Response from updating route object */
export type ApiObjectUpdateData = {
    ok:boolean
    msg:string
}
/** Data needed to delete route object */
export type ApiObjectDeleteLoad = ObjectData & { routeID:any }
/** Response from deleting route object */
export type ApiObjectDeleteData = {
    ok:boolean
    msg:string
}

/** Data needed to create user */
export type ApiUserCreateLoad = UserLoad
/** Response from creating new user */
export type ApiUserCreateData = {
    ok:boolean
    msg:string
}
/** Data needed to update user */
export type ApiUserUpdateLoad = UserData
/** Response from update new user */
export type ApiUserUpdateData = {
    ok:boolean
    msg:string
}
/** Data needed to delete user */
export type ApiUserDeleteLoad = UserLoad
/** Response from deleting user */
export type ApiUserDeleteData = {
    ok:boolean
    msg:string
}

/** Data needed to Update asset */
export type ApiAssetUpdateLoad = AssetData
/** Response from updating asset */
export type ApiAssetUpdateData = {
    ok:boolean
    msg:string
}
/** Data needed to delete asset */
export type ApiAssetDeleteLoad = AssetData
/** Response from deleting asset */
export type ApiAssetDeleteData = {
    ok:boolean
    msg:string
}


/** Data needed to search assets */
export type ApiAssetsSearchLoad = FetchAssetsLoad
/** Data needed to search assets */
export type ApiAssetsSearchData = AssetData[]