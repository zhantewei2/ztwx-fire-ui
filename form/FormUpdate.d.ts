import { Form } from "./validators";
import { Controller } from "./share";
/**
 * 相同为 true,不同为false
 * 忽略为 undefined;
 */
export declare type CheckMiddleFn = (key: string, originalValue: any, changedValue: any) => boolean | undefined;
export declare class FormUpdateVersion extends Form {
    constructor(controllers: Controller[]);
    originalValue: Record<string, any>;
    /**
     * 设置待更新的原始数据
     * @param originalValue
     */
    setOriginValue(originalValue: Record<string, any>): void;
    updateOriginValue(updateValue: Record<string, any>): void;
    resetOriginValue(): void;
    /**
     * 获取发生更改的值
     */
    getUpdatedValue(): undefined | Record<string, any>;
    checkMiddleFn: CheckMiddleFn;
    setCheckMiddleware(checkFn: CheckMiddleFn): void;
    changeOrderExists: boolean;
    _isChanged: boolean;
    get isChanged(): boolean;
    noChange(): void;
}
