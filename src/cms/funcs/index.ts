export type { RequestEvent } from "@sveltejs/kit"
import type { ApiFuncData,App,AssetData,ElementData,RouteData,RouteLoad,RouteObjectData,UserData, UserLoad } from "cms/types"

/** Api function for route: /<cms-path>/settings/+server.ts */
export type ApiFunc = UpdateSettingFunc | UploadFileFunc | UpdateUserFunc | UpdateAssetFunc | DeleteAssetFunc 
| SearchAssetsFunc | CreateUserFunc | DeleteUserFunc | CreateRouteFunc | UpdateRouteFunc | DeleteRouteFunc
| CreateObjectFunc | DeleteObjectFunc | UpdateObjectFunc | GetRoutesFunc | SearchObjectsFunc | UploadUrlFileFunc | UpdatePasswordFunc

/** Update app/user settings : /<cms-path>/settings */
export type UpdateSettingFunc = ApiFuncData<"updateSettings",App,App>

/** Upload file : /<any> */
export type UploadFileFunc = ApiFuncData<"uploadFile",FormData,AssetData>

/** Update file : /<any> */
export type UpdateUserFunc = ApiFuncData<"updateUser",{[key:string]:any},UserData>

/** Delete asset */
export type UpdateAssetFunc = ApiFuncData<"updateAsset",AssetData,AssetData>

/** Upload asset */
export type DeleteAssetFunc = ApiFuncData<"deleteAsset",AssetData,AssetData>

/** Search assets */
export type SearchAssetsFunc = ApiFuncData<"searchAssets",{query:string,pageNum:number},AssetData[]>

/** Create user */
export type CreateUserFunc = ApiFuncData<"createUser",UserLoad,UserData>

/** Delete user */
export type DeleteUserFunc = ApiFuncData<"deleteUser",UserData,UserData>

/** Create route */
export type CreateRouteFunc = ApiFuncData<"createRoute",RouteLoad,RouteData>

/** Update route */
export type UpdateRouteFunc = ApiFuncData<"updateRoute",RouteData,RouteData>

/** Delete route */
export type DeleteRouteFunc = ApiFuncData<"deleteRoute",RouteData,RouteData>

/** Create route object */
export type CreateObjectFunc = ApiFuncData<"createObject",{elements:ElementData[],routeID:string},RouteObjectData>

/** Delete route object */
export type DeleteObjectFunc = ApiFuncData<"deleteObject",{object:RouteObjectData,routeID:string},RouteObjectData>

/** Update route object */
export type UpdateObjectFunc = ApiFuncData<"updateObject",{elements:ElementData[],routeID:string,objectID:string},RouteObjectData>

/** Get all routes */
export type GetRoutesFunc = ApiFuncData<"getRoutes",{count:number},RouteData[]>

/** Search route objects */
export type SearchObjectsFunc = ApiFuncData<"searchObjects",{filter:{key:string,value:string},count:number,routeID:string},RouteObjectData[]>

/** Upload url file */
export type UploadUrlFileFunc = ApiFuncData<"uploadUrlFile",{ url:string },AssetData>

/** Update password */
export type UpdatePasswordFunc = ApiFuncData<"updatePassword",{ currentPassword:string,newPassword:string },null>