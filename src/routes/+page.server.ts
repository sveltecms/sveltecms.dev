import db from "cms/lib/db.server"
import type { PagesData } from "cms/types/dynamically"
import type { PagesProjection } from "cms/types/dynamically/projection"
type ResultData = Omit<PagesData, "updatedAt">

export async function load(){
    const collection = db.collection("pages")
    const filter = {}
    const projection:PagesProjection = { title:true,slug:true,content:true }
    const cursor = collection.find(filter,{projection}).map((data:any)=>{ return{ ...data,_id:data['_id'].toString() } })
    const pages:ResultData[] = await cursor.toArray() 
    // console.log(pages)
    return { pages }
}


// type ResultData = Omit<PagesData, "updatedAt"> & { image:Pick<CharactersData['image'], 'src'|"title"|"_id" > }