import {Observable, Subject,throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

const {CacheHttp}=require("cache-ajax");

export interface Params2{
    headers?:{[key:string]:any};
    expires?:number;
    key?:string;
}

export interface ValueChangePostParams{
    method:string;
    relativeUrl:string;
    url:string;
    params?:any;
    params2?:Params2;
}

export interface ValueChangeResultParams{
    status:number;
    content:string;
}


export type FilterFn=(result:any,retryFn:any)=>Promise<any>;
export class Http{
    store:{[key:string]:string}={};
    cacheHttp:any;
    beforeFn:any;
    afterFn:FilterFn;
    hostUrl:string;
    ticketKey:string;
    ticketValue:string;
    constructor() {
        this.cacheHttp=new CacheHttp({},
            (params:any)=>this.beforeFn?this.beforeFn(params):params,
            (result:any,retryFn:any)=>this.afterFn?this.afterFn(result,retryFn):Promise.resolve(result)
            );
    }
    appendTicketHeader=(params2:Params2={}):Params2=>{
        if(this.ticketKey&&this.ticketValue) {
            params2.headers = params2.headers ? {
                ...params2.headers,
                [this.ticketKey]:this.ticketValue
            } : {[this.ticketKey]:this.ticketValue}
        }

        return params2;
    };

    setBeforeHandler(fn:(params:Record<any, any>)=>void){
        this.beforeFn=fn;
    }

    setAfterHandler(fn:(params:{status:number,content:string},retryFn:any)=>Promise<any>){
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
    httpSendBeforeHook:Subject<ValueChangePostParams>=new Subject<ValueChangePostParams>();
    httpReceiveHook:Subject<ValueChangeResultParams>=new Subject<ValueChangeResultParams>();
    httpReceiveErrorHook:Subject<any>=new Subject<any>();

    xhr=(
        method:string,
        relativeUrl:string,
        params?:Record<any,any>,
        params2?:Params2
    ):Observable<any>=>{
        const url=this.hostUrl+(relativeUrl.startsWith("/")?relativeUrl:"/"+relativeUrl);

        this.httpSendBeforeHook.next({
            url,
            relativeUrl,
            method,
            params,
            params2
        });

        return this.cacheHttp.xhr(
            method,
            url,
            params,
            this.appendTicketHeader(params2)
        ).pipe(
            catchError((err:any)=>{
                this.httpReceiveErrorHook.next(err);
                return throwError(err)
            }),
            tap((result:ValueChangeResultParams)=>{
                this.httpReceiveHook.next(result);
            })
        )
    }
}
export const http=new Http();