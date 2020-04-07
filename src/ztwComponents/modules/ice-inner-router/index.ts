import Vue from "vue";
import View from "./view";
export {IceInnerRouterPlugin} from "./innerRouterPlugin";
import {IceInnerRouterConfig,IceRouterPlugin} from "./interface";
import {iceCacheKeepAlive} from "./viewCache";

export class IceRouterPluginManager{
    plugins:IceRouterPlugin[]=[];
    store={};
    Vue:Vue;
    registry(plugin:IceRouterPlugin){
        this.plugins.push(plugin);
        plugin.defineVuePrototype(this.Vue);
        plugin.registryPlugin(this.store);
    }
    constructor(Vue:Vue) {
        this.Vue=Vue;
        (Vue as any).prototype.$iceRouteStore=this.store;
    }
    public getPlugins(){
        return this.plugins;
    }
    public getStore(){
        return this.store;
    }
}


export const IceInnerRouterModule=(plugins:IceRouterPlugin[]
)=>({
    install(Vue:any){
        if((this as any).installed)return;
        (this as any).installed=true;
        const iceRouterPluginManager=new IceRouterPluginManager(Vue);
        plugins.forEach(plugin=>
            iceRouterPluginManager.registry(plugin)
        );
        const viewComponent=View(
            iceRouterPluginManager.getPlugins(),
            iceRouterPluginManager.getStore()
        );
        // Vue.component("ice-router-view",viewComponent);
        Vue.component("ice-router-view",iceCacheKeepAlive(viewComponent));
    }
});