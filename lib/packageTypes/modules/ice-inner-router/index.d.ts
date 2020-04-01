export { IceInnerRouterPlugin } from "./innerRouterPlugin";
import { IceRouterPlugin } from "./interface";
import Vue from "vue";
export declare class IceRouterPluginManager {
    plugins: IceRouterPlugin[];
    store: {};
    Vue: Vue;
    registry(plugin: IceRouterPlugin): void;
    constructor(Vue: Vue);
    getPlugins(): any[];
    getStore(): {};
}
export declare const IceInnerRouterModule: (plugins: any[]) => {
    install(Vue: any): void;
};
