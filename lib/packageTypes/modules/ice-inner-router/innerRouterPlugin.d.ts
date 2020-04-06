import { IceRouterPlugin, RouteMatcher, IceInnerRouterConfig, IceMatcher } from "./interface";
import Vue, { CreateElement, VNode } from "vue";
import { InnerUrl } from "./innerUrl";
import { CacheComponentRef, InnerCache } from "./innerCache";
import { Subject } from "rxjs";
export declare class IceInnerRouterPluginInterface {
    icePush: (path: string, instance: any, params?: {
        [key: string]: any;
    }) => void;
    iceBack: (instance: any) => void;
    iceInnerRouteStore: any;
}
export declare class IceInnerRouterPlugin implements IceInnerRouterPluginInterface, IceRouterPlugin {
    iceInnerRouteStore: any;
    history: boolean;
    visitByUrl: boolean;
    innerUrl: InnerUrl;
    innerCache: InnerCache;
    Vue: Vue;
    matcher: RouteMatcher;
    subView: any;
    private clear;
    listenHistory(): Subject<CacheComponentRef[]>;
    returnVnode(h: CreateElement, data: any, children: any, primaryVNode: VNode, matcher: RouteMatcher, parent: any, iceMatcher: IceMatcher): any;
    /**
     * 惰性模块，未加载时候，async 否则sync
     * @param path
     * @param instance
     * @param params
     */
    icePush(path: string, instance: Vue, params?: {
        [key: string]: any;
    }): void;
    iceBack(instance: Vue): void;
    iceToPrimary(instance: Vue): void;
    defineVuePrototype(Vue: Vue): void;
    constructor({ history, visitByUrl }: IceInnerRouterConfig);
    registryPlugin(store: any): any;
}
