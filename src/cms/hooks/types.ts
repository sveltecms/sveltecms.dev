import type { ElementData } from "cms/types";
import type { Db as DB } from "mongodb"

/** Response from hooks */
export type HookResponse = {
    ok:boolean
    msg:string
}

export type BeforeAddingObject = (db:DB,funcData:{elements: ElementData[],routeID:string}) => Promise<HookResponse>;

export type BeforeUpdatingObject = (db:DB,funcData:{elements: ElementData[],routeID:string}) => Promise<HookResponse>;