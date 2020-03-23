import {Validator, ValidatorErrMessage, ValueType} from "../share";

export default class implements Validator {
    name = "email";
    errMessage: ValidatorErrMessage;
    reg: any = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;

    apply(value: ValueType) {
        return !value || (typeof (value) == "string" && this.reg.test(value));
    }

    constructor(errMessage: ValidatorErrMessage) {
        this.errMessage = errMessage;
    }
}