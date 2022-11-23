import IceLoginPageComponent from "./ice-login-page-component/ice-login-page-component.vue";


export const IceLoginPageModule={
    key:"ice-login-page-module",
    install(v:any){
        v.component('ice-login-page',IceLoginPageComponent);
    }
};