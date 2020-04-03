import { Validator, ValidatorErrMessage } from "../share";
export default class implements Validator {
    name: string;
    errMessage: ValidatorErrMessage;
    minValue: number;
    apply(value: any): boolean;
    constructor(errMessage: ValidatorErrMessage, minValue: number);
}
