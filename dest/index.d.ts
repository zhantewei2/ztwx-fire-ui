import { IceRouterPlugin } from "./interface";
export { IceInnerRouterPlugin } from "./innerRouterPlugin";
export declare class IceRouterPluginManager {
    plugins: IceRouterPlugin[];
    store: {};
    Vue: any;
    registry(plugin: IceRouterPlugin): void;
    constructor(Vue: any);
    getPlugins(): any[];
    getStore(): {};
}
export declare const IceInnerRouterModule: (plugins: any[]) => {
    install(Vue: any): void;
};
