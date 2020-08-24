import CmLine from "../components/cmLine/cmLine.component.vue";
import {RippleDirection} from "../directive/ripple/ripple.directive";

export {dataFactory,handleListData} from "./lib-fire/NavDataHandler";

export {IceComponentModule}from "./ice-components/component.module";

//plugin module
export {IceBtnLoadingModule,BtnLoadRef} from "./ice-plugin/ice-btn-loading";

//router module
export {IceInnerRouterModule,IceInnerRouterPlugin} from "./ice-inner-router";
export {CacheComponentRef} from "./ice-inner-router/innerCache";

//component module
export {ComponentModule} from "../components/component.module";

//login module
export {IceLoginPageModule} from "./ice-login-page/ice-login-page.module";

export {
    IceContainerModule,
} from "./ice-container/ice-container.module";


export const FireContainerModule:any={
  key:"fire-container",
  install:function(v:any){
      v.directive("cm-ripple",RippleDirection);
      v.component("cmFire-line",CmLine);
  }
};

//export interface
export {NavListItem} from "./lib-fire/data.interface";