import Vue from "vue";
import { BaseSize, BaseColors } from "../../types";
export default class extends Vue {
    border: boolean;
    size: BaseSize;
    color: BaseColors;
    outline: boolean;
    pure: boolean;
    disabled: boolean;
    mounted(): void;
}
