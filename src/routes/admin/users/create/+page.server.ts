import db from "cms/lib/db.server"
import { ObjectId } from "mongodb"
import type { RequestEvent } from "@sveltejs/kit"
import type { AssetData } from "cms/types"

export const load = async(event:RequestEvent)=> {
    const assetFilter = { _id:new ObjectId("000000000000000000000000") }
    const defaultAsset = await db.collection("_assets").findOne(assetFilter) as AssetData
    return { defaultAsset:{...defaultAsset,_id:defaultAsset._id.toString() } }
}