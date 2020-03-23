import {Validator, ValidatorErrMessage, ValueType} from "../share";

export default class implements Validator {
    name = "min";
    errMessage: ValidatorErrMessage;
    minValue: number;

    apply(value: any) {
        if (!value && value !== 0) return true;
        value = Number(value);
        if (value !== 0 && !value) return false;
        return value >= this.minValue;
    }

    constructor(errMessage: ValidatorErrMessage, minValue: number) {
        this.errMessage = errMessage;
        this.minValue = minValue;
    }
}