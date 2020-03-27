import { filterUpdate } from "./filterUpdate";
import { Subject } from "./Subject";
var ControllerUpdate = /** @class */function () {
    function ControllerUpdate(form) {
        var _this = this;
        this.defineControllerUpdate = function (controller, key) {
            var self = _this;
            controller._changeObservable = new Subject();
            var m = function () {
                var _a;
                if (!controller.valueChangeSubjectOrder) {
                    controller.valueChangeSubjectOrder = (_a = controller.valueChange) === null || _a === void 0 ? void 0 : _a.subscribe(function (controller) {
                        self.checkControllerChange(controller);
                    });
                    self.checkControllerChange(controller);
                }
            };
            controller.changeObservable = function () {
                m();
                return controller._changeObservable;
            };
            Object.defineProperty(controller, "changed", {
                get: function () {
                    m();
                    return controller._changed;
                }
            });
        };
        this.defineControllersUpdate = function () {
            for (var key in _this.form.controllerDict) {
                _this.defineControllerUpdate(_this.form.controllerDict[key], key);
            }
        };
        this.form = form;
    }
    ControllerUpdate.prototype.checkControllerChange = function (controller) {
        var _a = filterUpdate(this.form.originalValue[controller.id], controller.value),
            originValue = _a[0],
            currentValue = _a[1];
        var end = function () {
            var _a;
            if (controller._changed) (_a = controller._changeObservable) === null || _a === void 0 ? void 0 : _a.next(controller);
            return controller._changed;
        };
        if (this.form.checkMiddleFn) {
            var checkResult = this.form.checkMiddleFn(controller.id, originValue, currentValue);
            if (checkResult !== undefined) {
                controller._changed = checkResult;
                return end();
            }
        }
        controller._changed = originValue !== currentValue;
        return end();
    };
    ControllerUpdate.prototype.clearChange = function () {
        for (var key in this.form.controllerDict) {
            this.form.controllerDict[key]._changed = false;
        }
    };
    return ControllerUpdate;
}();
export { ControllerUpdate };