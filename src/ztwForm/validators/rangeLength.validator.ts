import {Validator, ValidatorErrMessage, ValueType} from "../share";

export default class implements Validator {
    name = "rangeLength";
    errMessage: ValidatorErrMessage;
    minLength: number;
    maxLength: number;

    apply(value: ValueType) {
        return !value || (typeof (value) == "string" && (value.length <= this.maxLength) && (value.length >= this.minLength));
    }

    constructor(errMessage: ValidatorErrMessage, minLength: number, maxLength: number) {
        this.errMessage = errMessage;
        this.minLength = minLength;
        this.maxLength = maxLength;
    }
}