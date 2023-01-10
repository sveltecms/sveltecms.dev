import svelteCMS from "$svelteCMS"
import type { Collection, Db } from "mongodb"
import type { AssetData } from "$Types"
import type {
    FetchAssetLoad,FetchAssetsLoad, FetchUserLoad, FetchUsersLoad, FetchRouteLoad, FetchRoutesLoad,
    FetchRouteObjectLoad, FetchRouteObjectsLoad, FetchRouteObjectsRes,FetchCategoryLoad,FetchCategoriesLoad, FetchTagLoad, FetchTagsLoad
} from "$Types/cms"
import type { CategoryData, RouteData, ObjectData, TagData, UserData } from "$Types"

export default class Fetch {
    private routesCollection:Collection
    private assetsCollection:Collection
    private usersCollection:Collection
    private db:Db
    // Fetch constructor
    constructor(db:Db){
        this.db = db
        this.routesCollection = db.collection(svelteCMS.collections.routes)
        this.assetsCollection = db.collection(svelteCMS.collections.assets)
        this.usersCollection = db.collection(svelteCMS.collections.users)
    }

    /** Find one route */
    async route(props:FetchRouteLoad){
        const routeDbResult:any = this.routesCollection.findOne(props)
        const route:RouteData|null = await routeDbResult
        // Convert MongoDB ObjectID to string to avoid svelteKit non-POJOs error
        if(route) route['_id'] = route['_id'].toString()
        return route
    }
    /** Find multiple routes */
    async routes(props:FetchRoutesLoad){
        const routesCursor = this.routesCollection.find(props.filter).limit(props.count)
        routesCursor.sort("_id",props.sort?props.sort==="newFirst"?1:-1:-1)
        // Add skip objects
        if(props.pageNumber){
            const itemsToSkip = props.pageNumber*svelteCMS.config.routesPerPage - svelteCMS.config.routesPerPage
            routesCursor.skip(itemsToSkip)
        }
        const routesDbResult = routesCursor.map((data:any)=>{ data['_id']=data['_id'].toString();return data}).toArray()
        const routes:Promise<RouteData[]> = routesDbResult
        return routes
    }
    /** Count documents in routes collection */
    async routesCount(){
        return this.count(svelteCMS.collections.routes,{})
    }

    /** Find one route object */
    async routeObject(routeID:any,props:FetchRouteObjectLoad){
        const routeObjectsCollection = this.db.collection(routeID)
        const routeDbResult:any = routeObjectsCollection.findOne(props)
        const object:ObjectData|null = await routeDbResult
        // Convert MongoDB ObjectID to string to avoid svelteKit non-POJOs error
        if(object) object['_id'] = object['_id'].toString()
        return object
    }
    /** Find one route object */
    async routeObjects(props:FetchRouteObjectsLoad){
        const routeObjectsCollection = this.db.collection(props.routeID)
        const routeObjectsCursor = routeObjectsCollection.find(props.filter).limit(props.count)
        routeObjectsCursor.sort("_id",props.sort?props.sort==="newFirst"?1:-1:-1)
        // Add skip objects
        if(props.pageNumber){
            const itemsToSkip = props.pageNumber*svelteCMS.config.objectsPerPage - svelteCMS.config.objectsPerPage
            routeObjectsCursor.skip(itemsToSkip)
        }
        const routeObjectsDbResult = routeObjectsCursor.map((data:any)=>{ data['_id']=data['_id'].toString();return data}).toArray()
        const routes:Promise<FetchRouteObjectsRes> = routeObjectsDbResult
        return routes
    }
    /** Count documents in routeObjects collection */
    async routeObjectsCount(routeID:any){
        return this.count(routeID,{})
    }

    /** Find one asset */
    async asset(props:FetchAssetLoad){
        const exclude = { path:{$ne:"no-image.jpeg"} }
        const assetDbResult:any = this.assetsCollection.findOne({...props,...exclude})
        const asset:AssetData|null = await assetDbResult
        // @ts-ignore Convert MongoDB ObjectID to string to avoid svelteKit non-POJOs error
        if(asset) asset['_id'] = asset['_id'].toString()
        return asset
    }
    /** Find multiple assets */
    async assets(props:FetchAssetsLoad){
        const exclude = { path:{$ne:"no-image.jpeg"} }
        const assetsCursor = this.assetsCollection.find({...props.filter,...exclude}).limit(props.count)
        assetsCursor.sort("_id",props.sort?props.sort==="newFirst"?1:-1:-1)
        // Add skip objects
        if(props.pageNumber){
            const itemsToSkip = props.pageNumber*svelteCMS.config.assetsPerPage - svelteCMS.config.assetsPerPage
            assetsCursor.skip(itemsToSkip)
        }
        const assetsDbResult = assetsCursor.map((data:any)=>{ data['_id']=data['_id'].toString();return data}).toArray()
        const assets:Promise<AssetData[]> = assetsDbResult
        return assets
    }
    /** Count documents in assets collection */
    async assetsCount(){
        const exclude = { path:{$ne:"no-image.jpeg"} }
        return this.count(svelteCMS.collections.assets,exclude)
    }

    /** Find one user */
    async user(props:FetchUserLoad){
        const exclude = { email:{$ne:"root@sveltecms.dev"} }
        const userDbResult:any = this.usersCollection.findOne({...props,...exclude})
        const user:UserData|null = await userDbResult
        // Convert MongoDB ObjectID to string to avoid svelteKit non-POJOs error
        if(user) user['_id'] = user['_id'].toString()
        return user
    }
    /** Find multiple users */
    async users(props:FetchUsersLoad){
        const exclude = { email:{$ne:"root@sveltecms.dev"} }
        const usersCursor = this.usersCollection.find({...props.filter,...exclude}).limit(props.count)
        usersCursor.sort("_id",props.sort?props.sort==="newFirst"?1:-1:-1)
        // Add skip objects
        if(props.pageNumber){
            const itemsToSkip = props.pageNumber*svelteCMS.config.usersPerPage - svelteCMS.config.usersPerPage
            usersCursor.skip(itemsToSkip)
        }
        const usersDbResult:any = usersCursor.map((data:any)=>{ data['_id']=data['_id'].toString();return data}).toArray()
        const users:Promise<UserData[]> = usersDbResult
        return users
    }
    /** Count documents in users collection */
    async usersCount(){
        const exclude = { email:{$ne:"root@sveltecms.dev"} }
        return this.count(svelteCMS.collections.users,exclude)
    }

    /** Find one category */
    async category(props:FetchCategoryLoad){
        const filter = {...props}
        delete filter['routeID']
        const categoryDbResult:any = this.db.collection(`__categories_${props.routeID}`).findOne(filter)
        const category:CategoryData|null = await categoryDbResult
        // Convert MongoDB ObjectID to string to avoid svelteKit non-POJOs error
        if(category) category['_id'] = category['_id'].toString()
        return category
    }
    /** Find multiple categories */
    async categories(props:FetchCategoriesLoad){
        const categoriesCursor = this.db.collection(`__categories_${props.routeID}`).find(props.filter).limit(props.count)
        categoriesCursor.sort("_id",props.sort?props.sort==="newFirst"?1:-1:-1)
        // Add skip objects
        if(props.pageNumber){
            const itemsToSkip = props.pageNumber*svelteCMS.config.categoriesPerPage - svelteCMS.config.categoriesPerPage
            categoriesCursor.skip(itemsToSkip)
        }
        const categoriesDbResult:any = categoriesCursor.map((data:any)=>{ data['_id']=data['_id'].toString();return data}).toArray()
        const categories:Promise<CategoryData[]> = categoriesDbResult
        return categories
    }
    /** Count documents in route>categories collection */
    async categoriesCount(routeID:any,exclude:any){
        return this.count(`${svelteCMS.collections.baseCategories}_${routeID}`,exclude)
    }

    /** Find one tag */
    async tag(props:FetchTagLoad){
        const filter = {...props}
        delete filter['routeID']
        const tagDbResult:any = this.db.collection(`__tags_${props.routeID}`).findOne(filter)
        const tag:TagData|null = await tagDbResult
        // Convert MongoDB ObjectID to string to avoid svelteKit non-POJOs error
        if(tag) tag['_id'] = tag['_id'].toString()
        return tag
    }
    /** Find multiple tags */
    async tags(props:FetchTagsLoad){
        const tagsCursor = this.db.collection(`__tags_${props.routeID}`).find(props.filter).limit(props.count)
        tagsCursor.sort("_id",props.sort?props.sort==="newFirst"?1:-1:-1)
        // Add skip objects
        if(props.pageNumber){
            const itemsToSkip = props.pageNumber*svelteCMS.config.tagsPerPage - svelteCMS.config.tagsPerPage
            tagsCursor.skip(itemsToSkip)
        }
        const tagsDbResult:any = tagsCursor.map((data:any)=>{ data['_id']=data['_id'].toString();return data}).toArray()
        const tags:Promise<TagData[]> = tagsDbResult
        return tags
    }
    /** Count documents in route>tags collection */
    async tagsCount(routeID:any,exclude:any){
        return this.count(`${svelteCMS.collections.baseTags}_${routeID}`,exclude)
    }

    /** Count documents in collection */
    private async count(collection:string,exclude:any){
        const count = this.db.collection(collection).countDocuments(exclude)
        return count
    }
}