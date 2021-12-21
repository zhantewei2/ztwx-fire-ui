import {IceRouterPlugin, RouteMatcher, IceInnerRouterConfig, IceMatcher, IceSubViewRef} from "./interface";
import Vue, {CreateElement, VNode} from "vue";
import {InnerUrl} from "./innerUrl";
import View from "./view";
import {CacheComponentRef, InnerCache} from "./innerCache";
import {Subject} from "rxjs";
export class IceInnerRouterPluginInterface{
    public icePush:(path:string,instance:any,params?:{[key:string]:any})=>void;
    public iceBack:(instance:any)=>void;
    public iceInnerRouteStore:any;
}

export class IceInnerRouterPlugin implements IceInnerRouterPluginInterface,IceRouterPlugin{
    iceInnerRouteStore:any={};
    history:boolean=false;
    visitByUrl:boolean=false;
    innerUrl:InnerUrl=new InnerUrl();
    innerCache:InnerCache=new InnerCache();

    Vue:Vue;
    matcher:RouteMatcher;
    subView:any;
    public clear(){
        this.innerCache.clearCache();
    }
    public listenHistory():Subject<CacheComponentRef[]>{
        return this.innerCache.cacheHistory;
    }
    public returnVnode(
            h:CreateElement,
            data:any,
            children:any,
            primaryVNode:VNode,
            matcher:RouteMatcher,
            parent:any,
            iceMatcher:IceMatcher
    ){
        this.matcher=matcher;
        this.subView=matcher.props&&matcher.props.default&&matcher.props.default.subView;
        let subInnerPath;
        data.registerIceMatcher=(vm:Vue)=>{
            iceMatcher["instanceComponent"]=vm;
        };
        /**
         * routes对象上没有sub view
         * 无需任何处理
         */
        if(!this.subView){
            this.clear();
            return primaryVNode;
        }
        if(!(subInnerPath=this.innerUrl.getInnerPath()))return this.innerCache.cacheRender(primaryVNode,matcher.path,"",iceMatcher,"");

        /***
         * sub render
         */
        /**
         *
         */
        if(!this.innerCache.cacheComponentRefs.length){
            parent.$router.replace(matcher.path);
            return h("div");
        }
        const componentRef:IceSubViewRef|undefined|Promise<IceSubViewRef>=this.innerUrl.findInnerComponent(subInnerPath,this.subView,matcher.path);

        /**
         * tag 没有找到对应的 componentRef
         */

        if(!componentRef)return this.innerCache.cacheRender(primaryVNode,matcher.path,"",iceMatcher,"");
        const {instanceComponent:component,subName} :any=componentRef;

        if(this.Vue.$iceInnerRouteTargetComponent){
            const com= this.Vue.$iceInnerRouteTargetComponent;
            this.Vue.$iceInnerRouteTargetComponent=null;
            return this.innerCache.cacheRender(h(com,data,children),matcher.path,subInnerPath,iceMatcher,subName);
        }

        /**
         * 如果直接返回component (从缓存中)
         */
        if(!(component instanceof Promise)) return this.innerCache.cacheRender(h((component as any),data,children),matcher.path,subInnerPath,iceMatcher,subName);

        component.then(com=>{

           this.Vue.$iceInnerRouteTargetComponent=com;
            /**
             * 刷新，再次触发render;
             */
           parent._route={...parent._route};
        });
        return h("div");
    }

    /**
     * 惰性模块，未加载时候，async 否则sync
     * @param path
     * @param instance
     * @param params
     */
    public icePush(path:string,instance:Vue,params?:{[key:string]:any}){
        if(!path)return;
        const targetPath=this.matcher.path;
        const push=()=>{
            this.history?instance.$router.push({...params,hash:`#${path}`,path:targetPath}):instance.$router.replace({...params,hash:`#${path}`,path:targetPath});
        };
        const componentRef=this.innerUrl.findInnerComponent(path,this.subView,this.matcher.path);

        if(!componentRef||!(componentRef.instanceComponent instanceof Promise)){
            this.Vue.$iceInnerRouteTargetComponent=componentRef&&componentRef.instanceComponent;
            push();
        }else{
            componentRef.instanceComponent.then((com:any)=>{
                this.Vue.$iceInnerRouteTargetComponent=com;
                push();
            })
        }
    }

    public iceBack(instance:Vue):void{
        const backMessage=this.innerCache.back();
        if(!backMessage)return ;
        const {path,tag}=backMessage;
        instance.$router.replace(tag?`${path}#${tag}`:path);
    }
    public iceToPrimary(instance:Vue){
        instance.$router.replace(this.matcher.path);
    }

    defineVuePrototype(Vue:Vue){
        this.Vue=Vue;
        const self:this=this;

        (Vue as any).mixin({
            beforeCreate(): void {
                const i:any=this.$options._parentVnode;
                i&&i.data&&i.data.registerIceMatcher&&i.data.registerIceMatcher(this);
            }
        });

        Object.defineProperty((Vue as any).prototype,"$iceSub",{
            get(){
                return {
                    "push":(path:string,params:{[key:string]:any})=>{
                        self.icePush(path,this,params);
                    },
                    "back":()=>{
                        self.iceBack(this);
                    },
                    "toPrimary":()=>self.iceToPrimary(this),
                    "clearCache":()=>self.clear(),
                }
            },
        });

        (Vue as any).prototype.$iceInnerRouteTargetComponent=null;
    }
    constructor({history=false,visitByUrl=false}:IceInnerRouterConfig) {
        this.history=history;
        this.visitByUrl=visitByUrl;
    }

    registryPlugin(store:any){
        return Object.assign(store,{"innerRoute":this.iceInnerRouteStore});
    }
}
