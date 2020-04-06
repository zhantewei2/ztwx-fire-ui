import {Validator, ValidatorErrMessage, ValueType} from "../share";

export default class implements Validator {
    name = "max";
    errMessage: ValidatorErrMessage;
    maxValue: number;

    apply(value: ValueType) {
        if (!value && value !== 0) return true;
        value = Number(value);
        if (value !== 0 && !value) return false;
        return value <= this.maxValue;
    }

    constructor(errMessage: ValidatorErrMessage, maxValue: number) {
        this.errMessage = errMessage;
        this.maxValue = maxValue;
    }
}