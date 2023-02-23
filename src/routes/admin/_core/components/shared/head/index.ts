import { writable } from "svelte/store"
import type { Writable } from "svelte/store"

export let appName:string
/** Your app favicon */
export let favicon:string
/** Page title */
export let title:string
/** Page description */
export let description:string
/** Page image backdrop */
export let backdrop:string|undefined = undefined
/** Page Keywords */
export let keywords:string[]|undefined = undefined
/** Page type (Default:website) */
export let ogType:string = 'website'
/** Page location (Default:en_US) */
export let ogLocate:string = 'en_US'

export const CONFIG:Writable < {
    appName:string
    favicon:string
    title:string
    description:string
    backdrop:string|undefined 
    keywords:string[]|undefined
    ogType:string
    ogLocate:string
} > = writable()