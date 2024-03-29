export * from "./modules/modules";
import Vue from "vue";

declare module "vue/types/vue" {
    interface Vue {
        $iceSub:{
            push:(path:string,params?:Record<string, any>)=>void;
            back:()=>void;
            toPrimary:()=>void;
            clearCache:()=>void;
        }
        $iceRouteStore:{[key:string]:any}
        $iceInnerRouteTargetComponent:any;
    }
}
