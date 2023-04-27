import type { Db } from "mongodb"
import type { RequestEvent,SearchAssetsFunc } from "."
import type { AssetData } from "cms/types"

// TODO: update asset on any linked data
export default async function handleFunc(db:Db,event:RequestEvent,funcInputData:any,json:Function) {
    const inputData:SearchAssetsFunc['input'] = funcInputData
    const funcData = inputData.data
    // search
    const filter = { title: new RegExp(funcData.query,"ig")}
    const assetsCol = db.collection("_assets")
    const assetsPerSearch = event.locals.appData.config.assetsPerSearch
    const numToSkip = funcData.pageNum<=1 ? 0 : assetsPerSearch*funcData.pageNum - assetsPerSearch
    const assets = await assetsCol.find(filter).skip(numToSkip).limit(assetsPerSearch).toArray() as AssetData[]
    const response:SearchAssetsFunc['output'] = {
        ok:true,
        msg:"List of assets",
        data:assets
    }
    return json(response)
}