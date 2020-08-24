import Vue from "vue";
import { BaseColors } from "../../../types";
export default class extends Vue {
    login: boolean;
    color: BaseColors;
    bgImg: string;
    bgImg2: string;
    imgLoading: boolean;
    watchLogin(v: boolean): void;
    watchBgImg(v: string): void;
}
