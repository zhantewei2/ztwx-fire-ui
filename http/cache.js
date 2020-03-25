import { Store } from "./store";
import { of, Subject } from "rxjs";
import { tap } from "rxjs/operators";
var Cache = /** @class */ (function () {
    function Cache(http) {
        this.cacheExpireTag = "ztwx-http-cache-expire-tag";
        this.cacheDestroyDict = new Store();
        this.http = http;
    }
    Cache.prototype.cacheXhr = function (_a) {
        var _this = this;
        var method = _a.method, expires = _a.expires, relativeUrl = _a.relativeUrl, params = _a.params, params2 = _a.params2, destroyOnXhr = _a.destroyOnXhr;
        var key = method + '-' + relativeUrl + '-' + JSON.stringify(params);
        var existsCacheDestroyDict = this.cacheDestroyDict.getValue(key);
        if (existsCacheDestroyDict) {
            /**
             * is loading
             */
            if (existsCacheDestroyDict.xhrLoad) {
                return existsCacheDestroyDict.xhrLoad;
            }
            else {
                var resultValue = existsCacheDestroyDict.cacheValue;
                if (resultValue != this.cacheExpireTag)
                    return of(resultValue);
            }
        }
        var cacheDestroy = {
            key: key,
            cacheValue: ""
        };
        this.cacheExpiredJsonForCacheValue(cacheDestroy, expires);
        if (destroyOnXhr) {
            cacheDestroy["matchedDestroyFn"] = this.matchedDestroyFnFactory(destroyOnXhr);
            cacheDestroy["subscription"] = this.http.httpReceiveHook.subscribe(function (_a) {
                var result = _a.result, relativeUrl = _a.relativeUrl;
                if (cacheDestroy.matchedDestroyFn(relativeUrl)) {
                    _this.removeCacheDestroy(key);
                }
            });
        }
        this.cacheDestroyDict.setValue(key, cacheDestroy);
        cacheDestroy.xhrLoad = new Subject();
        return this.http.xhr(method, relativeUrl, params, params2).pipe(tap(function (result) {
            var _a;
            cacheDestroy.cacheValue = result;
            (_a = cacheDestroy.xhrLoad) === null || _a === void 0 ? void 0 : _a.next(result);
            cacheDestroy.xhrLoad = undefined;
        }));
    };
    Cache.prototype.cacheExpiredJsonForCacheValue = function (cacheDestroy, expires) {
        var _cacheValue = "";
        var setTime = 0;
        var self = this;
        Object.defineProperty(cacheDestroy, "cacheValue", {
            get: function () {
                if (expires && new Date().getTime() > setTime) {
                    self.removeCacheDestroy(cacheDestroy.key);
                    return self.cacheExpireTag;
                }
                return JSON.parse(_cacheValue);
            },
            set: function (v) {
                if (expires) {
                    setTime = new Date().getTime() + expires;
                }
                _cacheValue = JSON.stringify(v);
            }
        });
    };
    Cache.prototype.removeCacheDestroy = function (key) {
        var cacheDestroy = this.cacheDestroyDict.getValue(key);
        if (!cacheDestroy)
            return;
        cacheDestroy.subscription && cacheDestroy.subscription.unsubscribe();
        this.cacheDestroyDict.deleteKey(key);
    };
    Cache.prototype.matchedDestroyFnFactory = function (matchedList) {
        var fnc;
        var oldFn = function (url) {
            return false;
        };
        matchedList.forEach(function (i) {
            if (i instanceof RegExp) {
                fnc = function (url) {
                    if (oldFn(url))
                        return true;
                    return i.test(url);
                };
                oldFn = fnc;
            }
            else {
                fnc = function (url) {
                    if (oldFn(url))
                        return true;
                    return i === url;
                };
                oldFn = fnc;
            }
        });
        return fnc || oldFn;
    };
    return Cache;
}());
export { Cache };
