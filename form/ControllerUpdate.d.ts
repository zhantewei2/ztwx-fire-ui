import { Controller } from "./share";
import { FormUpdateVersion } from "./FormUpdate";
export declare class ControllerUpdate {
    form: FormUpdateVersion;
    constructor(form: FormUpdateVersion);
    checkControllerChange(controller: Controller): boolean | undefined;
    defineControllerUpdate: (controller: Controller, key: string) => void;
    defineControllersUpdate: () => void;
    clearChange(): void;
}
