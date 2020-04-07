<<<<<<< HEAD
=======
import Vue from "vue";
>>>>>>> 8e2b240ee92f572de52eda8081ff9e1dbe5f9189
import View from "./view";

import {IceInnerRouterConfig,IceRouterPlugin} from "./interface";
import {iceCacheKeepAlive} from "./viewCache";
export {IceInnerRouterPlugin} from "./innerRouterPlugin";

export class IceRouterPluginManager{
    plugins:IceRouterPlugin[]=[];
    store={};
    Vue:any;
    registry(plugin:IceRouterPlugin){
        this.plugins.push(plugin);
        plugin.defineVuePrototype(this.Vue);
        plugin.registryPlugin(this.store);
    }
    constructor(Vue:any) {
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