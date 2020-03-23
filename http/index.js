import { __assign } from "tslib";
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
        this.xhr = function (method, relativeUrl, params, params2) {
            return _this.cacheHttp.xhr(method, _this.hostUrl + (relativeUrl.startsWith("/") ? relativeUrl : "/" + relativeUrl), params, _this.appendTicketHeader(params2));
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
