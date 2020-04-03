import Vue from "vue";
import IceDropdownMain from "../ice-dropdown-main-component/ice-dropdown-main-component";
import { RelativeFixed } from "../../lib-fire/RelativeFixed";
export default class extends Vue {
    triggerType: "hover" | "click";
    position: "top" | "left" | "bottom" | "right";
    instance: IceDropdownMain | any;
    private outClick;
    parentElement: HTMLElement;
    relativeFixed: RelativeFixed;
    positionTop: number;
    positionLeft: number;
    mounted(): void;
    click(): void;
    enter(): void;
    leave(e: MouseEvent): void;
    isShow: boolean;
    /**
     * hide dropdown
     */
    hide(): void;
    /**
     * show dropdown
     */
    show(): Promise<void>;
    /**
     * toggle dropdown
     */
    toggle(): void;
    instanceRef: any;
    initializeTemplate(): boolean;
    updated(): void;
    destroyed(): void;
}
