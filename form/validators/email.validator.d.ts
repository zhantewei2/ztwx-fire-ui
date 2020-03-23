import { Validator, ValidatorErrMessage, ValueType } from "../share";
export default class implements Validator {
    name: string;
    errMessage: ValidatorErrMessage;
    reg: any;
    apply(value: ValueType): any;
    constructor(errMessage: ValidatorErrMessage);
}
