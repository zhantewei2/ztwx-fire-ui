import Vue, {CreateElement, VNode} from "vue";

export interface RouteMatcher{
    path:string;
    props:any;
    instances:{[key:string]:Vue};
    vNode:VNode;
}
export interface IceMatcher{
    vNode?:VNode;
    instanceComponent?:Vue;
    callback?:()=>void;
}

export interface IceInnerRouterConfig{
    history:boolean;
    visitByUrl:boolean;
}
export interface IceSubViewRoute{
    path:string;
    component:any;
    subName:string;
}
export interface IceSubViewRef{
    path:string;
    subName:string;
    instanceComponent:Vue|Promise<Vue>;
}


export interface IceRouterPlugin{
    /**
     * view 中调用方法，返回Vnode;
     * @param primaryVNode
     * @param Matcher
     */
    returnVnode:(
        h:CreateElement,
        data:any,
        children:any|undefined,
        primaryVNode:VNode,
        Matcher:any|RouteMatcher,
        parent:any,
        iceMatcher:IceMatcher
    )=>VNode|undefined;

    /**
     * 给vue.prototype 添加属性
     * @param vue
     */
    defineVuePrototype:(vue:Vue)=>void;

    registryPlugin<T>(store:T):T;

}

