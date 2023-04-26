/** ApiFuncData takes: 1:function name, 2:function load data, 3:function return data */
export type ApiFuncData<FuncName,InputData,OutputData> = {
    input:{
        name:FuncName
        data:InputData
    }
    output:ApiFuncResponse<OutputData>
}

/** The response from any api function
 * 1:ok true|false
 * 2:msg a any message from api
 * 3:data any data to be returned if ok is true */
export type ApiFuncResponse<Data> = {
    ok:false
    msg:string
} | {
    ok:true
    msg:string
    data: Data
}

export type ApiResponse<Data> = {
    ok:false
    msg:string
} | {
    ok:true
    msg:string
    data: Data
}