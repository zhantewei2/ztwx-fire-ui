import CmButton from "./cmButton/cmButton.component.vue";
import CmIconButton from "./cmIconButton/cmIconButton.component.vue";
// import IceInput from "./iceInput/iceInput.component.vue";
import {IceInputComponent} from "./iceInput/iceInput.component";
import IceLoader from "./iceLoaderComponent/iceLoaderComponent.vue";
export const ComponentModule={
    key:"ice-component-module",
    install(v:any){
        v.component("ice-button",CmButton);
        v.component("ice-icon-button",CmIconButton);
        v.component("ice-input",IceInputComponent);
        v.component("ice-loader",IceLoader);
    }
};