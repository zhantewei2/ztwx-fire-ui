import {Controller, Validator, ValueType} from "./share";
import {SubjectOrder, Subject} from "./Subject";

export {
    Controller,
    Validator,
    ValueType,
    Subject,
    SubjectOrder
}

export class Form {
    controllers: Controller[];
    controllerChangeSubject: Subject<Controller> = new Subject<Controller>();
    valueChange: Subject<{ [key: string]: Controller }> = new Subject<{ [key: string]: Controller }>();
    controllerDict: { [key: string]: Controller } = {};
    public value: Record<string, ValueType> = {};

    constructor(
        controllers: Controller[]
    ) {
        if (!controllers || !controllers.length) return;
        this.controllers = controllers;
        this.controllers.forEach(controller => {
            this.handleController(controller);
            this.appendValue(controller);
            this.controllerDict[controller.id] = controller;
        });
        this.controllerChangeSubject.subscribe(controller => {
            this.valueChange.next(this.controllerDict);
        })
    }

    appendValue(controller: Controller) {
        this.value[controller.id] = controller.value;
        Object.defineProperty(this.value, controller.id, {
            get() {
                return controller.value;
            },
            set(v: ValueType) {
                controller.value = v;
            }
        });
    }

    handleController(controller: Controller) {
        controller._value = controller.value;
        controller.errors = [];
        const self = this;
        controller.valueChange = new Subject<Controller>();
        Object.defineProperty(controller, "value", {
            get() {
                return this._value;
            },
            set(v: ValueType) {
                this._value = v;
                if (!controller.validator) return;
                controller.errors = [];
                self.handleControllerValidators(controller);
                this.valueChange.next(controller);
                self.controllerChangeSubject.next(controller);
            }
        });
        controller.reset = () => {
            this.value[controller.id] = undefined;
            controller.errors = [];
            controller.valueChange && controller.valueChange.next(controller);
        }
    }

    handleControllerValidators(controller: Controller) {
        if (controller.validator instanceof Array) {
            controller.validator.forEach(validator => this.handleControllerValidator(controller, validator))
        } else {
            this.handleControllerValidator(controller, controller.validator);
        }
    }

    handleControllerValidator(controller: Controller, validator: Validator) {
        const isPass = validator.apply(controller.value);
        if (isPass || !controller.errors) return;
        controller.errors.push(
            typeof (validator.errMessage) == "string" ? validator.errMessage : validator.errMessage(controller.value)
        )
    }

    reset() {
        this.controllers.forEach(controller => {
            controller.reset && controller.reset();
        });
    }

    toSerializer(): Record<string, any> {
        return this.value;
    }

    get isPass(): boolean {
        for (let controller of this.controllers) {
            if (controller.errors && controller.errors.length) return false;
        }
        return true;
    }

    checkValidators(): boolean {
        this.controllers.forEach(controller => {
            controller.errors = [];
            this.handleControllerValidators(controller);
            //提交检测
            controller.valueChange && controller.valueChange.next(controller);
        });
        return this.isPass;
    }
}