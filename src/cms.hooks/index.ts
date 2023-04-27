//VERSION:0.22.0
import { beforeAddingObject,beforeDeletingRoute,beforeUpdatingRoute,beforeUpdatingObject,beforeDeletingObject,beforeUpdatingSetting,demoFunc } from "./functions"
import type { HookFuncs } from "./types"

/** Export all functions that will run */
const hookFuncs:HookFuncs = {
    /** Run custom function before inserting / creating */
    beforeAdding : {
        route:demoFunc,
        object:beforeAddingObject,
        user:demoFunc,
    },
    beforeUpdating : {
        route:beforeUpdatingRoute,
        object:beforeUpdatingObject,
        user:demoFunc,
        asset:demoFunc,
        setting:beforeUpdatingSetting
    },
    beforeDeleting : {
        route:beforeDeletingRoute,
        object:beforeDeletingObject,
        user:demoFunc,
        asset:demoFunc,
    }
}
export default hookFuncs