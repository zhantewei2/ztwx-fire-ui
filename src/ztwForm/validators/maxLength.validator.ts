import {Validator, ValidatorErrMessage, ValueType} from "../share";

export default class implements Validator {
    name = "maxLength";
    errMessage: ValidatorErrMessage;
    length: number;

    apply(value: ValueType) {
        return !value || (typeof (value) == "string" && value.length <= this.length);
    }

    constructor(errMessage: ValidatorErrMessage, length: number) {
        this.errMessage = errMessage;
        this.length = length;
    }
}