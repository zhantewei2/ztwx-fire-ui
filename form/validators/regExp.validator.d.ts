import { Validator, ValidatorErrMessage, ValueType } from "../share";
export default class implements Validator {
    name: string;
    errMessage: ValidatorErrMessage;
    regExp: RegExp;
    apply(value: ValueType): boolean;
    constructor(errMessage: ValidatorErrMessage, regExp: RegExp);
}
