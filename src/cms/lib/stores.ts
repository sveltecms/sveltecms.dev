import { writable, type Writable } from "svelte/store";
import type {  UserData, AssetData, RouteData } from "cms/types"

/** List of assets */
export const ASSETS:Writable<AssetData[]> = writable([])

/** List of users */
export const USERS:Writable<UserData[]> = writable([])

/** Current logged on user */
export const USER:Writable<UserData|null> = writable(null)

/** Search props */
export const SEARCH = writable({
    query:"",
    fetching:false
})

/** Current object data being added */
export const ROUTE_OBJECT:Writable<RouteData> = writable()