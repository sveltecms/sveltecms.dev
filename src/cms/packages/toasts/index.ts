import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

/** Data needed to create new toast */
export type ToastLoad = {
    type:TypeData,title?:string, msg:string
}
/** Toast data */
export type ToastData = {
    type:TypeData, title?:string, msg:string, id:number
}
/** TypeData = error, good or neutral */
type TypeData = "error" | "ok" | "neutral"

/** Export toasts store/Writable */
export const TOASTS:Writable<ToastData[]> =  writable([])

/**
 * Create new toast
 * @param toast - New toast object
 * @param removeIn - Set timer to remove toast
 */
export function newToast(toast:ToastLoad,removeIn=4000){
    const title = toast.title ? toast.title : toast.type
    const id = Date.now()
    // update current toasts
    TOASTS.update(oldData=>{
        oldData = [{...toast,id,title},...oldData]
        return oldData
    })
    // auto remove after 4 seconds
    if(removeIn){
        setTimeout(()=>{
            TOASTS.update(data=>data.filter(d=>d.id!==id))
        },removeIn)
    }
}

export const addToast = newToast
export const createToast = newToast