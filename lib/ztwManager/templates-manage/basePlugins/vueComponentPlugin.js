"use strict";
exports.__esModule = true;
var path = require("path");
var host_path = path.dirname(path.dirname(path.dirname(path.dirname(__dirname))));
var VueComponentPlugin = /** @class */ (function () {
    function VueComponentPlugin() {
        this.pluginName = "@ztwx/vue-component-template";
        this.version = "0.0.1";
        this.templatePath = path.join(host_path, "assets/templates/vueComponent");
    }
    VueComponentPlugin.prototype.activeTemplate = function (dirName) {
        return dirName.endsWith("component") || dirName.endsWith("Component");
    };
    VueComponentPlugin.prototype.handleTemplateSource = function (data) {
        return {
            "tp_name": data.completeName,
            "tp_file_name": data.dirName,
            "tp_user": data.gitName || "",
            "tp_email": data.gitEmail || "",
            "tp_now": data.nowDate || ""
        };
    };
    return VueComponentPlugin;
}());
exports.VueComponentPlugin = VueComponentPlugin;
