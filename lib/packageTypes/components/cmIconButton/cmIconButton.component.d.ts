import Vue from "vue";
import { BaseSize, BaseColors } from "../../types";
export default class extends Vue {
    border: boolean;
    size: BaseSize;
    color: BaseColors;
    candy: any;
    disabled: boolean;
    fab: boolean;
    mounted(): void;
}
