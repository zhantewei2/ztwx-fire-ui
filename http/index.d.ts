import { Observable } from "rxjs";
export interface Params2 {
    headers?: {
        [key: string]: any;
    };
    expires?: number;
    key?: string;
}
export declare type FilterFn = (result: any, retryFn: any) => Promise<any>;
export declare class Http {
    store: {
        [key: string]: string;
    };
    cacheHttp: any;
    beforeFn: any;
    afterFn: FilterFn;
    hostUrl: string;
    ticketKey: string;
    ticketValue: string;
    constructor();
    appendTicketHeader: (params2?: Params2) => Params2;
    setBeforeHandler(fn: (params: Record<any, any>) => void): void;
    setAfterHandler(fn: (params: {
        status: number;
        content: string;
    }, retryFn: any) => Promise<any>): void;
    setHost(host: string): void;
    setTicketKey(key: string): void;
    setTicketValue(v: string): void;
    xhr: (method: string, relativeUrl: string, params?: Record<any, any> | undefined, params2?: Params2 | undefined) => Observable<any>;
}
export declare const http: Http;
