import {Validator, ValidatorErrMessage, ValueType} from "../share";

export default class implements Validator {
    name = "required";
    errMessage: ValidatorErrMessage;

    apply(value: ValueType) {
        return value === 0 || !!value;
    }

    constructor(errMessage: ValidatorErrMessage) {
        this.errMessage = errMessage;
    }
}