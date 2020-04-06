import Vue from "vue";
export default class extends Vue {
    parent: any;
    mainElement: HTMLElement;
    created(): void;
    mounted(): void;
    toDestroy(): void;
    beforeDestroy(): void;
    enter(): void;
    leave(e: MouseEvent): void;
}
