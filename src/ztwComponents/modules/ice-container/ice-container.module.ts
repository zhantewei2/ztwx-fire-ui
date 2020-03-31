import IceBodyComponent from "./ice-body-component/ice-body-component.vue";
import IceContainerComponent from "./ice-container-component/ice-container-component.vue";
import IceHeaderComponent from "./ice-header-component/ice-header-component.vue";
import IceNavComponent from "./ice-nav-component/ice-nav-component.vue";
import IceNavItemComponent from "./ice-nav-item-component/ice-nav-item-component.vue";
import {keepOneVue} from "../oneVue";

export const IceContainerModule:any= {
    install: function (v:any) {
        keepOneVue(v);
        v.component("cmIce-container", IceContainerComponent);
        v.component("cmIce-header", IceHeaderComponent);
        v.component("cmIce-nav-item", IceNavItemComponent);
        v.component("cmIce-nav", IceNavComponent);
        v.component("cmIce-body", IceBodyComponent);
    }
};
