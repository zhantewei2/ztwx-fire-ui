import {Subject} from "./Subject";

export type ValidatorErrMessage = ((value: any) => string) | string;

export type ValueType = string | number | undefined |boolean;

export interface Validator {
    apply: (value: ValueType) => boolean;
    name: string;
    errMessage: ValidatorErrMessage;
}


export interface Controller {
    id: string;
    validator: Validator | Validator[];
    value?: ValueType;
    errors?: string[];
    valueChange?: Subject<Controller>;
    reset?: () => void;
    _value?: ValueType;
}
