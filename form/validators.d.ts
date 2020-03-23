import { Controller, Validator, ValueType } from "./share";
import { SubjectOrder, Subject } from "./Subject";
export { Controller, Validator, ValueType, Subject, SubjectOrder };
export declare class Form {
    controllers: Controller[];
    controllerChangeSubject: Subject<Controller>;
    valueChange: Subject<{
        [key: string]: Controller;
    }>;
    controllerDict: {
        [key: string]: Controller;
    };
    value: Record<string, ValueType>;
    constructor(controllers: Controller[]);
    appendValue(controller: Controller): void;
    handleController(controller: Controller): void;
    handleControllerValidators(controller: Controller): void;
    handleControllerValidator(controller: Controller, validator: Validator): void;
    reset(): void;
    toSerializer(): Record<string, any>;
    get isPass(): boolean;
    checkValidators(): boolean;
}
