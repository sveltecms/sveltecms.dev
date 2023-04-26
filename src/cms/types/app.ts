
//TFromJ:App:start
export type App = {
    _id:string
    site:AppSite
    config:AppConfig
}
export type AppConfig = {
    assetsPerSearch:number
    assetsPerPage:number
    usersPerPage:number
    routesPerPage:number
    objectsPerPage:number
    routesLinkedPerPage:number
    allowNewUser:boolean
    cmsPath:string
}
export type AppSite = {
    name:string
    title:string
    description:string
    socialMedias:AppSiteSocialMedias
    baseUrl:string
}
export type AppSiteSocialMedias = {
    twitter:string
    instagram:string
}
//TFromJ:App:end

