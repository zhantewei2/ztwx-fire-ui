import { __assign } from "tslib";
import { Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
var CacheHttp = require("cache-ajax").CacheHttp;
var Http = /** @class */ (function () {
    function Http() {
        var _this = this;
        this.store = {};
        this.appendTicketHeader = function (params2) {
            var _a, _b;
            if (params2 === void 0) { params2 = {}; }
            if (_this.ticketKey && _this.ticketValue) {
                params2.headers = params2.headers ? __assign(__assign({}, params2.headers), (_a = {}, _a[_this.ticketKey] = _this.ticketValue, _a)) : (_b = {}, _b[_this.ticketKey] = _this.ticketValue, _b);
            }
            return params2;
        };
        this.httpSendBeforeHook = new Subject();
        this.httpReceiveHook = new Subject();
        this.httpReceiveErrorHook = new Subject();
        this.xhr = function (method, relativeUrl, params, params2) {
            var url = _this.hostUrl + (relativeUrl.startsWith("/") ? relativeUrl : "/" + relativeUrl);
            _this.httpSendBeforeHook.next({
                url: url,
                relativeUrl: relativeUrl,
                method: method,
                params: params,
                params2: params2
            });
            return _this.cacheHttp.xhr(method, url, params, _this.appendTicketHeader(params2)).pipe(catchError(function (err) {
                _this.httpReceiveErrorHook.next(err);
                return throwError(err);
            }), tap(function (result) {
                _this.httpReceiveHook.next(result);
            }));
        };
        this.cacheHttp = new CacheHttp({}, function (params) { return _this.beforeFn ? _this.beforeFn(params) : params; }, function (result, retryFn) { return _this.afterFn ? _this.afterFn(result, retryFn) : Promise.resolve(result); });
    }
    Http.prototype.setBeforeHandler = function (fn) {
        this.beforeFn = fn;
    };
    Http.prototype.setAfterHandler = function (fn) {
        this.afterFn = fn;
    };
    Http.prototype.setHost = function (host) {
        this.hostUrl = host;
    };
    Http.prototype.setTicketKey = function (key) {
        this.ticketKey = key;
    };
    Http.prototype.setTicketValue = function (v) {
        this.ticketValue = v;
    };
    return Http;
}());
export { Http };
export var http = new Http();
