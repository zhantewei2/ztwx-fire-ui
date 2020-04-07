import CmButton from "./cmButton/cmButton.component.vue";
import CmIconButton from "./cmIconButton/cmIconButton.component.vue";

export const ComponentModule={
    key:"ice-component-module",
    install(v:any){
        v.component("ice-button",CmButton);
        v.component("ice-icon-button",CmIconButton);
    }
};