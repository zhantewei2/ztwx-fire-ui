"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.tpDict = {
    'vuePage': "vuePage"
};
var subprocess = require("child_process");
var BaseData = /** @class */ (function () {
    function BaseData() {
    }
    BaseData.prototype.appendBaseData = function (tb) {
        var gitName;
        var gitEmail;
        try {
            gitName = subprocess.execSync("git config user.name").toString().trim();
        }
        catch (e) { }
        try {
            gitEmail = subprocess.execSync("git config user.email").toString().trim();
        }
        catch (e) { }
        var now = new Date();
        var nowDate = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        return __assign(__assign({}, tb), { gitName: gitName, gitEmail: gitEmail, nowDate: nowDate });
    };
    return BaseData;
}());
exports.BaseData = BaseData;
