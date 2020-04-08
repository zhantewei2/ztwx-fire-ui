"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var vue_1 = require("vue");
var vue_property_decorator_1 = require("vue-property-decorator");
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    default_1.prototype.created = function () {
        this.parent.instance = this;
    };
    default_1.prototype.mounted = function () {
        this.mainElement = this.$refs.mainElement;
    };
    default_1.prototype.toDestroy = function () {
        if (this.mainElement && this.mainElement.parentElement)
            this.mainElement.parentElement.removeChild(this.mainElement);
    };
    default_1.prototype.beforeDestroy = function () {
        this.toDestroy();
    };
    default_1.prototype.enter = function () {
    };
    default_1.prototype.leave = function (e) {
        if (this.parent.triggerType !== "hover")
            return;
        var targetEl = e.relatedTarget;
        if (targetEl === this.parent.parentElement || this.parent.parentElement.contains[targetEl]) {
            //pass
        }
        else {
            this.parent.hide();
        }
    };
    __decorate([
        vue_property_decorator_1.Prop({})
    ], default_1.prototype, "parent");
    default_1 = __decorate([
        vue_property_decorator_1.Component({})
    ], default_1);
    return default_1;
}(vue_1["default"]));
exports["default"] = default_1;
