const { CacheHttp } = require("cache-ajax");
export class Http {
    constructor() {
        this.store = {};
        this.appendTicketHeader = (params2 = {}) => {
            if (this.ticketKey && this.ticketValue) {
                params2.header = params2.header ? {
                    ...params2.header,
                    [this.ticketKey]: this.ticketValue
                } : { [this.ticketKey]: this.ticketValue };
            }
            return params2;
        };
        this.xhr = (method, relativeUrl, params, params2) => {
            return this.cacheHttp.xhr(method, this.hostUrl + (relativeUrl.startsWith("/") ? relativeUrl : "/" + relativeUrl), params, this.appendTicketHeader(params2));
        };
        this.cacheHttp = new CacheHttp({}, (params) => this.beforeFn ? this.beforeFn(params) : params, (result, retryFn) => this.afterFn ? this.afterFn(result, retryFn) : Promise.resolve(result));
    }
    setBeforeHandler(fn) {
        this.beforeFn = fn;
    }
    ;
    setAfterHandler(fn) {
        this.afterFn = fn;
    }
    setHost(host) {
        this.hostUrl = host;
    }
    setTicketKey(key) {
        this.ticketKey = key;
    }
    setTicketValue(v) {
        this.ticketValue = v;
    }
}
export const http = new Http();
