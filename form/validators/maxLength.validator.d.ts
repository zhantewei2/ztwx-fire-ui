import { Validator, ValidatorErrMessage, ValueType } from "../share";
export default class implements Validator {
    name: string;
    errMessage: ValidatorErrMessage;
    length: number;
    apply(value: ValueType): boolean;
    constructor(errMessage: ValidatorErrMessage, length: number);
}
