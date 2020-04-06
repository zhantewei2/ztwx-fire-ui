"use strict";
exports.__esModule = true;
var view_1 = require("./view");
var viewCache_1 = require("./viewCache");
var innerRouterPlugin_1 = require("./innerRouterPlugin");
exports.IceInnerRouterPlugin = innerRouterPlugin_1.IceInnerRouterPlugin;
var IceRouterPluginManager = /** @class */ (function () {
    function IceRouterPluginManager(Vue) {
        this.plugins = [];
        this.store = {};
        this.Vue = Vue;
        Vue.prototype.$iceRouteStore = this.store;
    }
    IceRouterPluginManager.prototype.registry = function (plugin) {
        this.plugins.push(plugin);
        plugin.defineVuePrototype(this.Vue);
        plugin.registryPlugin(this.store);
    };
    IceRouterPluginManager.prototype.getPlugins = function () {
        return this.plugins;
    };
    IceRouterPluginManager.prototype.getStore = function () {
        return this.store;
    };
    return IceRouterPluginManager;
}());
exports.IceRouterPluginManager = IceRouterPluginManager;
exports.IceInnerRouterModule = function (plugins) { return ({
    install: function (Vue) {
        if (this.installed)
            return;
        this.installed = true;
        var iceRouterPluginManager = new IceRouterPluginManager(Vue);
        plugins.forEach(function (plugin) {
            return iceRouterPluginManager.registry(plugin);
        });
        var viewComponent = view_1["default"](iceRouterPluginManager.getPlugins(), iceRouterPluginManager.getStore());
        // Vue.component("ice-router-view",viewComponent);
        Vue.component("ice-router-view", viewCache_1.iceCacheKeepAlive(viewComponent));
    }
}); };
