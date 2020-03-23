import { Validator, ValidatorErrMessage, ValueType } from "../share";
export default class implements Validator {
    name: string;
    errMessage: ValidatorErrMessage;
    maxValue: number;
    apply(value: ValueType): boolean;
    constructor(errMessage: ValidatorErrMessage, maxValue: number);
}
