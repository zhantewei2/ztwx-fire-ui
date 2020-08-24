import Vue from "vue";
import { BaseColors, BaseSize } from "../../types";
export declare class IceInputComponent extends Vue {
    name: string;
    value: any;
    color: BaseColors;
    size: BaseSize;
    useEnter: boolean;
    placeholder: string;
    clearable: any;
    error: string;
    emitEnter(): void;
    watchValue(v: string): void;
    isFocus: boolean;
    isEmpty: boolean;
    inputFocus(): void;
    inputBlur(): void;
    keydown(e: any): void;
    mounted(): void;
    openPlaceholder: boolean;
    setOpenPlaceHolder(open: boolean): void;
    clearValue(): void;
    /**
     * value can not async when changed ..via createElement input
     */
    pristine: boolean;
    setInputValue(v: any): void;
}
