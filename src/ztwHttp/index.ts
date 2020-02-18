import {Observable} from "rxjs";
const {CacheHttp}=require("cache-ajax");

export interface Params2{
    header?:{[key:string]:any},
    expires?:number;
    key?:string;
}


export class Http{
    store:{[key:string]:string}={};
    cacheHttp:any;
    beforeFn:any;
    afterFn:any;
    hostUrl:string;
    ticketKey:string;
    ticketValue:string;
    constructor() {
        this.cacheHttp=new CacheHttp({},
            (params:any)=>this.beforeFn(params),
            (params:any)=>this.afterFn(params)
            );
    }
    appendTicketHeader=(params2:Params2={}):Params2=>{
        if(this.ticketKey&&this.ticketValue) {
            params2.header = params2.header ? {
                ...params2.header,
                [this.ticketKey]:this.ticketValue
            } : {[this.ticketKey]:this.ticketValue}
        }
        return params2;
    };

    setBeforeHandler(fn:(params:Record<any, any>)=>void){
        this.beforeFn=fn;
    };

    setAfterHandler(fn:(params:{status:number,content:string})=>Promise<any>){
        this.afterFn=fn;
    }
    setHost(host:string){
        this.hostUrl=host;
    }
    setTicketKey(key:string){
        this.ticketKey=key;
    }
    setTicketValue(v:string){
        this.ticketValue=v;
    }

    xhr=(
        method:string,
        relativeUrl:string,
        params?:Record<any,any>,
        params2?:Params2
    ):Observable<any>=>{
        return this.cacheHttp.xhr(
            method,
            this.hostUrl+relativeUrl.startsWith("/")?relativeUrl:"/"+relativeUrl,
            params,
            this.appendTicketHeader(params2)
        )
    }
}
export const http=new Http();