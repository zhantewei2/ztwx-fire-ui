import { Validator, ValidatorErrMessage, ValueType } from "../share";
export default class implements Validator {
    name: string;
    errMessage: ValidatorErrMessage;
    minLength: number;
    maxLength: number;
    apply(value: ValueType): boolean;
    constructor(errMessage: ValidatorErrMessage, minLength: number, maxLength: number);
}
