
import IceDropdownComponent from "./ice-dropdown-component/ice-dropdown-component.vue";
export const IceComponentModule:any={
  key:"cmIce-component",
  install:function(vue:any){
      (vue as any).prototype.$pageLoading=true;
      vue.component("cmIce-dropdown",IceDropdownComponent);
  }
};
