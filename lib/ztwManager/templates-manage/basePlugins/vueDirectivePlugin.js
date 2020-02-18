"use strict";
exports.__esModule = true;
var path = require("path");
var host_path = path.dirname(path.dirname(path.dirname(path.dirname(__dirname))));
var VueDirectivePlugin = /** @class */ (function () {
    function VueDirectivePlugin() {
        this.pluginName = "@ztwx/vue-directive-template";
        this.version = "0.0.1";
        this.templatePath = path.join(host_path, "assets/templates/vueDirective");
    }
    VueDirectivePlugin.prototype.activeTemplate = function (dirName) {
        return dirName.endsWith("directive") || dirName.endsWith("Directive");
    };
    VueDirectivePlugin.prototype.handleTemplateSource = function (data) {
        return {
            "tp_name": data.completeName
        };
    };
    return VueDirectivePlugin;
}());
exports.VueDirectivePlugin = VueDirectivePlugin;
