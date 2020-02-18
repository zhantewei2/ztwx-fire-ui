"use strict";
exports.__esModule = true;
var ice_body_component_vue_1 = require("./ice-body-component/ice-body-component.vue");
exports.IceBodyComponent = ice_body_component_vue_1["default"];
var ice_container_component_vue_1 = require("./ice-container-component/ice-container-component.vue");
exports.IceContainerComponent = ice_container_component_vue_1["default"];
var ice_header_component_vue_1 = require("./ice-header-component/ice-header-component.vue");
exports.IceHeaderComponent = ice_header_component_vue_1["default"];
var ice_nav_component_vue_1 = require("./ice-nav-component/ice-nav-component.vue");
exports.IceNavComponent = ice_nav_component_vue_1["default"];
var ice_nav_item_component_vue_1 = require("./ice-nav-item-component/ice-nav-item-component.vue");
exports.IceNavItemComponent = ice_nav_item_component_vue_1["default"];
var vue_property_decorator_1 = require("vue-property-decorator");
exports.IceContainerModule = {
    install: function (vue) {
        var v = window.Vue || vue_property_decorator_1.Vue;
        v.component("cmIce-container", ice_container_component_vue_1["default"]);
        v.component("cmIce-header", ice_header_component_vue_1["default"]);
        v.component("cmIce-nav-item", ice_nav_item_component_vue_1["default"]);
        v.component("cmIce-nav", ice_nav_component_vue_1["default"]);
        v.component("cmIce-body", ice_body_component_vue_1["default"]);
    }
};
