import Vue from "vue";
import { BaseColors, BaseSize } from "../../types";
export declare class IceInputComponent extends Vue {
    value: any;
    color: BaseColors;
    size: BaseSize;
    useEnter: boolean;
    placeholder: string;
    clearable: any;
    emitEnter(): void;
    isFocus: boolean;
    isEmpty: boolean;
    input(v: any): void;
    inputFocus(): void;
    inputBlur(): void;
    keydown(e: any): void;
    mounted(): void;
    openPlaceholder: boolean;
    setOpenPlaceHolder(open: boolean): void;
}
