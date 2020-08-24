import Vue from "vue";

declare module "vue/types/vue" {
    interface Vue {
        $iceSub:{
            push:(path:string,params?:Record<string, any>)=>void;
            back:()=>void;
            toPrimary:()=>void;
        }
        $iceRouteStore:{[key:string]:any}
        $iceInnerRouteTargetComponent:any;
    }
}