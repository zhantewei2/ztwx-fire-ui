"use strict";
exports.__esModule = true;
var path = require("path");
var host_path = path.dirname(path.dirname(path.dirname(path.dirname(__dirname))));
var VuePagePlugin = /** @class */ (function () {
    function VuePagePlugin() {
        this.pluginName = "@ztwx/vue-page-template";
        this.version = "0.0.1";
        this.templatePath = path.join(host_path, "assets/templates/vuePage");
    }
    VuePagePlugin.prototype.activeTemplate = function (dirName) {
        return dirName.endsWith("page") || dirName.endsWith("Page");
    };
    VuePagePlugin.prototype.handleTemplateSource = function (data) {
        return {
            "tp_name": data.completeName,
            "tp_file_name": data.dirName,
            "tp_user": data.gitName || "",
            "tp_email": data.gitEmail || "",
            "tp_now": data.nowDate || ""
        };
    };
    return VuePagePlugin;
}());
exports.VuePagePlugin = VuePagePlugin;
