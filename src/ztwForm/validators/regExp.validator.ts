import {Validator, ValidatorErrMessage, ValueType} from "../share";

export default class implements Validator {
    name = "required";
    errMessage: ValidatorErrMessage;
    regExp:RegExp;

    apply(value: ValueType) {
        if(!value&&value!==0)return true;
        return typeof(value)==="string"&&this.regExp.test(value);
    }

    constructor(errMessage: ValidatorErrMessage,regExp:RegExp) {
        this.errMessage = errMessage;
        this.regExp=regExp;

    }
}