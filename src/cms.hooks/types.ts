import type {
    CreateRouteFunc, CreateObjectFunc, CreateUserFunc, UpdateRouteFunc,
    UpdateObjectFunc, UpdateUserFunc, UpdateAssetFunc, UpdateSettingFunc,
    DeleteRouteFunc, DeleteObjectFunc, DeleteAssetFunc, DeleteUserFunc
} from "cms/funcs";
import type { Db as DB } from "mongodb"

/** Response from hooks */
export type HookResponse = {
    ok:boolean
    msg:string
}

/** All available functions */
export type HookFuncs =  {
    beforeAdding: {
        route: (db:DB,funcInputData:CreateRouteFunc['input']['data']) => Promise<HookResponse>
        object: (db:DB,funcInputData:CreateObjectFunc['input']['data']) => Promise<HookResponse>
        user: (db:DB,funcInputData:CreateUserFunc['input']['data']) => Promise<HookResponse>
    }
    beforeUpdating: {
        route: (db:DB,funcInputData:UpdateRouteFunc['input']['data']) => Promise<HookResponse>
        object: (db:DB,funcInputData:UpdateObjectFunc['input']['data']) => Promise<HookResponse>
        user: (db:DB,funcInputData:UpdateUserFunc['input']['data']) => Promise<HookResponse>
        asset: (db:DB,funcInputData:UpdateAssetFunc['input']['data']) => Promise<HookResponse>
        setting: (db:DB,funcInputData:UpdateSettingFunc['input']['data']) => Promise<HookResponse>
    }
    beforeDeleting: {
        route: (db:DB,funcInputData:DeleteRouteFunc['input']['data']) => Promise<HookResponse>
        object: (db:DB,funcInputData:DeleteObjectFunc['input']['data']) => Promise<HookResponse>
        user: (db:DB,funcInputData:DeleteUserFunc['input']['data']) => Promise<HookResponse>
        asset: (db:DB,funcInputData:DeleteAssetFunc['input']['data']) => Promise<HookResponse>
    }
}