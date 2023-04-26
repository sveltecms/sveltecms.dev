import type { UserData } from "cms/types"

/** Data that most be returned from regular api requests */
type ApiResponse<Data> = {
    ok:false
    msg:string
} | {
    ok:true
    msg:string
    data: Data
}

/** Data needed to login user */
export type UserLoginLoad = {
    email:string
    password:string
}
/** Data return from api when login user */
export type UserLoginData = ApiResponse<UserData>