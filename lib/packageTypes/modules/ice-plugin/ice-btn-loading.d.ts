import { PluginObject } from "vue";
export interface BtnLoadRef {
    btn: HTMLElement;
    cancel: () => void;
}
export declare class IceBtnLoading {
    /**
     * 储放于 btn element 的key 值，保存loadSpan,用于防止重复录入。
     */
    btnKey: string;
    btnLoadingClass: string[];
    render(): string;
    constructor();
    originBtnAddEventListener: any;
    catchElement: HTMLElement | null;
    /**
     * 加入加载条，并添加加载属性
     * @param btn
     */
    appendLoading(btn: HTMLElement): HTMLElement;
    cancelLoading(btn: HTMLElement, loadSpan: HTMLElement): () => void;
    watchBtnClick(): void;
    btnLoad(): BtnLoadRef | null;
}
export declare const IceBtnLoadingModule: PluginObject<any>;
