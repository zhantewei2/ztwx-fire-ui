"use strict";
exports.__esModule = true;
var TemplateManagePlugin = /** @class */ (function () {
    function TemplateManagePlugin() {
        this.templatePlugins = [];
    }
    ;
    /**
     * 添加plugin
     * @param templatePlugin
     */
    TemplateManagePlugin.prototype.addPlugin = function (templatePlugin) {
        this.templatePlugins.push(templatePlugin);
    };
    /**
     * 根据目录名，来选择激活某个plugin
     * @param dirName
     */
    TemplateManagePlugin.prototype.switchTemplatePlugin = function (dirName) {
        for (var _i = 0, _a = this.templatePlugins; _i < _a.length; _i++) {
            var plugin = _a[_i];
            if (plugin.activeTemplate(dirName))
                return plugin;
        }
        return null;
    };
    return TemplateManagePlugin;
}());
exports.TemplateManagePlugin = TemplateManagePlugin;
