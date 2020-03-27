import { __extends } from "tslib";
import { Form } from "./validators";
var FormUpdateVersion = /** @class */function (_super) {
    __extends(FormUpdateVersion, _super);
    function FormUpdateVersion(controllers) {
        var _this = _super.call(this, controllers) || this;
        _this.originalValue = {};
        _this.changeOrderExists = false;
        _this._isChanged = false;
        return _this;
    }
    /**
     * 设置待更新的原始数据
     * @param originalValue
     */
    FormUpdateVersion.prototype.setOriginValue = function (originalValue) {
        var _this = this;
        this.originalValue = {};
        this._isChanged = false;
        Object.keys(this.value).forEach(function (key) {
            _this.value[key] = _this.originalValue[key] = originalValue[key];
        });
    };
    FormUpdateVersion.prototype.updateOriginValue = function (updateValue) {
        var _this = this;
        this._isChanged = false;
        Object.keys(updateValue).forEach(function (key) {
            _this.value[key] = _this.originalValue[key] = updateValue[key];
        });
    };
    FormUpdateVersion.prototype.resetOriginValue = function () {
        var _this = this;
        Object.keys(this.originalValue).forEach(function (key) {
            _this.value[key] = _this.originalValue[key];
        });
        this._isChanged = false;
    };
    /**
     * 获取发生更改的值
     */
    FormUpdateVersion.prototype.getUpdatedValue = function () {
        var _this = this;
        var updatedValue = {};
        var originValue, currentValue;
        var checkResult;
        Object.keys(this.originalValue).forEach(function (key) {
            originValue = _this.originalValue[key];
            currentValue = _this.value[key];
            if (currentValue === "") currentValue = undefined;
            if (originValue === "") originValue = undefined;
            if (_this.checkMiddleFn) {
                checkResult = _this.checkMiddleFn(key, originValue, currentValue);
                if (checkResult !== undefined) {
                    if (!checkResult) updatedValue[key] = currentValue;
                    return;
                }
            }
            if (originValue !== currentValue) {
                updatedValue[key] = currentValue;
            }
        });
        return Object.keys(updatedValue).length > 0 ? updatedValue : undefined;
    };
    FormUpdateVersion.prototype.setCheckMiddleware = function (checkFn) {
        this.checkMiddleFn = checkFn;
    };
    Object.defineProperty(FormUpdateVersion.prototype, "isChanged", {
        get: function () {
            var _this = this;
            if (!this.changeOrderExists) {
                this.valueChange.subscribe(function () {
                    _this._isChanged = !!_this.getUpdatedValue();
                });
                this.changeOrderExists = true;
                return !!this.getUpdatedValue();
            }
            return this._isChanged;
        },
        enumerable: true,
        configurable: true
    });
    FormUpdateVersion.prototype.noChange = function () {
        this._isChanged = false;
    };
    return FormUpdateVersion;
}(Form);
export { FormUpdateVersion };