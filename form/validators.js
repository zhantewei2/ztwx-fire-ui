import { Subject } from "./Subject";
export { Subject };
var Form = /** @class */function () {
    function Form(controllers) {
        var _this = this;
        this.controllerChangeSubject = new Subject();
        this.valueChange = new Subject();
        this.controllerDict = {};
        this.value = {};
        if (!controllers || !controllers.length) return;
        this.controllers = controllers;
        this.controllers.forEach(function (controller) {
            _this.handleController(controller);
            _this.appendValue(controller);
            _this.controllerDict[controller.id] = controller;
        });
        this.controllerChangeSubject.subscribe(function (controller) {
            _this.valueChange.next(_this.controllerDict);
        });
    }
    Form.prototype.appendValue = function (controller) {
        this.value[controller.id] = controller.value;
        Object.defineProperty(this.value, controller.id, {
            get: function () {
                return controller.value;
            },
            set: function (v) {
                controller.value = v;
            }
        });
    };
    Form.prototype.handleController = function (controller) {
        var _this = this;
        controller._value = controller.value;
        controller.errors = [];
        var self = this;
        controller.valueChange = new Subject();
        Object.defineProperty(controller, "value", {
            get: function () {
                return this._value;
            },
            set: function (v) {
                this._value = v;
                if (!controller.validator) return;
                controller.errors = [];
                self.handleControllerValidators(controller);
                this.valueChange.next(controller);
                self.controllerChangeSubject.next(controller);
            }
        });
        controller.reset = function () {
            _this.value[controller.id] = undefined;
            controller.errors = [];
            controller.valueChange && controller.valueChange.next(controller);
        };
    };
    Form.prototype.handleControllerValidators = function (controller) {
        var _this = this;
        if (controller.validator instanceof Array) {
            controller.validator.forEach(function (validator) {
                return _this.handleControllerValidator(controller, validator);
            });
        } else {
            this.handleControllerValidator(controller, controller.validator);
        }
    };
    Form.prototype.handleControllerValidator = function (controller, validator) {
        var isPass = validator.apply(controller.value);
        if (isPass || !controller.errors) return;
        controller.errors.push(typeof validator.errMessage == "string" ? validator.errMessage : validator.errMessage(controller.value));
    };
    Form.prototype.reset = function () {
        this.controllers.forEach(function (controller) {
            controller.reset && controller.reset();
        });
    };
    Form.prototype.toSerializer = function () {
        return this.value;
    };
    Object.defineProperty(Form.prototype, "isPass", {
        get: function () {
            for (var _i = 0, _a = this.controllers; _i < _a.length; _i++) {
                var controller = _a[_i];
                if (controller.errors && controller.errors.length) return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Form.prototype.checkValidators = function () {
        var _this = this;
        this.controllers.forEach(function (controller) {
            controller.errors = [];
            _this.handleControllerValidators(controller);
            //提交检测
            controller.valueChange && controller.valueChange.next(controller);
        });
        return this.isPass;
    };
    return Form;
}();
export { Form };