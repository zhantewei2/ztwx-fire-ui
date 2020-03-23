var Session = /** @class */ (function () {
    function Session() {
        var _this = this;
        this.sessionKey = "ztwx-fire-session-key";
        this.isMemeroy = function () {
            return Promise.resolve(_this.sessionValue || "");
        };
        this.isStorage = function () {
            return Promise.resolve(sessionStorage[_this.sessionKey]);
        };
        /**
         * 清除session
         */
        this.clearSession = function () {
            _this.sessionValue = undefined;
            delete sessionStorage[_this.sessionKey];
        };
    }
    Session.prototype.setSessionKey = function (key) {
        this.sessionKey = key;
    };
    Session.prototype.setSession = function (value) {
        this.sessionValue = sessionStorage[this.sessionKey] = value;
    };
    return Session;
}());
export { Session };
export var session = new Session();
