import {Validator, ValidatorErrMessage, ValueType} from "../share";

export default class implements Validator {
    name = "range";
    errMessage: ValidatorErrMessage;
    maxValue: number;
    minValue: number;

    apply(value: ValueType): boolean {
        if (!value && value !== 0) return true;
        value = Number(value);
        if (value !== 0 && !value) return false;
        return value >= this.minValue && value <= this.maxValue;
    }

    constructor(errMessage: ValidatorErrMessage, minValue: number, maxValue: number) {
        this.errMessage = errMessage;
        this.minValue = minValue;
        this.maxValue = maxValue;
    }
}