import { writable, type Writable } from "svelte/store";
import type { RouteData, UserData, AssetData} from "$Types"

/** Is nav open when browsing mobiles or not  */
export const IS_NAV_OPEN:Writable<boolean> = writable(false)

/** Site routes config, it will be set when /admin/+layout.svelte run */
export const ROUTES:Writable<RouteData[]> = writable([])

/** List of assets */
export const ASSETS:Writable<AssetData[]> = writable([])

/** List of users */
export const USERS:Writable<UserData[]> = writable([])

/** Previously url (go back path) */
export const PREV_PATH:Writable<string> = writable("/admin")

/** Current logged on user */
export const USER:Writable<UserData|null> = writable(null)