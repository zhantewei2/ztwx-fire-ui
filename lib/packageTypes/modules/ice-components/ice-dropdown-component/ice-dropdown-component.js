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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var vue_1 = require("vue");
var vue_property_decorator_1 = require("vue-property-decorator");
var ice_dropdown_main_component_vue_1 = require("../ice-dropdown-main-component/ice-dropdown-main-component.vue");
var OutClick_1 = require("../../lib-fire/OutClick");
var RelativeFixed_1 = require("../../lib-fire/RelativeFixed");
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.outClick = new OutClick_1.OutClick();
        _this.relativeFixed = new RelativeFixed_1.RelativeFixed();
        _this.positionTop = 0;
        _this.positionLeft = 0;
        _this.isShow = false;
        return _this;
    }
    default_1.prototype.mounted = function () {
        this.parentElement = this.$refs.parentElement;
    };
    default_1.prototype.click = function () {
        if (this.triggerType !== "click")
            return;
        this.toggle();
    };
    default_1.prototype.enter = function () {
        if (this.triggerType !== "hover")
            return;
        this.show();
    };
    default_1.prototype.leave = function (e) {
        if (this.triggerType !== "hover")
            return;
        var targetEl = e.relatedTarget;
        if (this.instance && targetEl === this.instance.mainElement || this.instance.mainElement.contains(targetEl)) {
            //pass
        }
        else {
            this.hide();
        }
    };
    /**
     * hide dropdown
     */
    default_1.prototype.hide = function () {
        if (this.isShow)
            this.isShow = false;
    };
    /**
     * show dropdown
     */
    default_1.prototype.show = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isPristine;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isShow)
                            return [2 /*return*/];
                        isPristine = this.initializeTemplate();
                        if (!isPristine) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.$nextTick().then(function () {
                                _this.isShow = true;
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        this.isShow = true;
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.$nextTick().then(function () {
                            var _a = _this.relativeFixed.relativePosition(_this.instance.mainElement, _this.parentElement, _this.position), top = _a.top, left = _a.left;
                            _this.positionTop = top;
                            _this.positionLeft = left;
                        })];
                    case 4:
                        _a.sent();
                        /**
                         *Add the outClick , if it is a click event;
                         */
                        if (this.triggerType === "click")
                            this.outClick.once(function () { return _this.hide(); }, [this.parentElement, this.instance.mainElement]);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * toggle dropdown
     */
    default_1.prototype.toggle = function () {
        !this.isShow ? this.show() : this.hide();
    };
    default_1.prototype.initializeTemplate = function () {
        var _this = this;
        if (!this.instanceRef) {
            var templateWrapper = document.createElement("div");
            document.body.appendChild(templateWrapper);
            this.instanceRef = new vue_1["default"]({
                render: function (h) { return h(ice_dropdown_main_component_vue_1["default"], {
                    props: {
                        parent: _this
                    }
                }, _this.$slots.dropdown); }
            }).$mount(templateWrapper);
            return true;
        }
        return false;
    };
    default_1.prototype.updated = function () {
        if (!this.instanceRef)
            return;
        this.instanceRef.$forceUpdate();
    };
    default_1.prototype.destroyed = function () {
        this.instance && this.instance.toDestroy();
        this.instanceRef && this.instanceRef.$destroy();
    };
    __decorate([
        vue_property_decorator_1.Prop({ "default": "hover" })
    ], default_1.prototype, "triggerType");
    __decorate([
        vue_property_decorator_1.Prop({ "default": "bottom" })
    ], default_1.prototype, "position");
    default_1 = __decorate([
        vue_property_decorator_1.Component({})
    ], default_1);
    return default_1;
}(vue_1["default"]));
exports["default"] = default_1;
