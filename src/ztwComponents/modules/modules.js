"use strict";
exports.__esModule = true;
var vue_property_decorator_1 = require("vue-property-decorator");
var cmLine_component_vue_1 = require("../components/cmLine/cmLine.component.vue");
exports.CmLine = cmLine_component_vue_1["default"];
var ripple_directive_1 = require("../directive/ripple/ripple.directive");
exports.RippleDirection = ripple_directive_1.RippleDirection;
var NavDataHandler_1 = require("./lib-fire/NavDataHandler");
exports.dataFactory = NavDataHandler_1.dataFactory;
exports.handleListData = NavDataHandler_1.handleListData;
var ice_container_module_1 = require("./ice-container/ice-container.module");
exports.IceContainerModule = ice_container_module_1.IceContainerModule;
exports.IceBodyComponent = ice_container_module_1.IceBodyComponent;
exports.IceNavItemComponent = ice_container_module_1.IceNavItemComponent;
exports.IceNavComponent = ice_container_module_1.IceNavComponent;
exports.IceHeaderComponent = ice_container_module_1.IceHeaderComponent;
exports.IceContainerComponent = ice_container_module_1.IceContainerComponent;
exports.FireContainerModule = {
    install: function () {
        var v = window.Vue || vue_property_decorator_1.Vue;
        v.directive("cm-ripple", ripple_directive_1.RippleDirection);
        v.component("cmFire-line", cmLine_component_vue_1["default"]);
    }
};
