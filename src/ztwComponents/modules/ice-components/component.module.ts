import IceButtonComponent from "./ice-button-component/ice-button-component.vue";
import IceInputComponent from "./ice-input-component/ice-input-component.vue";
import IceDropdownComponent from "./ice-dropdown-component/ice-dropdown-component.vue";
export const IceComponentModule:any={
  key:"cmIce-component",
  install:function(vue:any){
      (vue as any).prototype.$pageLoading=true;
      vue.component("cmIce-btn",IceButtonComponent);
      vue.component("cmIce-input",IceInputComponent);
      vue.component("cmIce-dropdown",IceDropdownComponent);
  }
};

export {
    IceButtonComponent,
    IceInputComponent
}