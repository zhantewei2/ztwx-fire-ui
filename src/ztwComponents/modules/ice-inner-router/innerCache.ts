import Vue,{VNode} from "vue";
import {IceMatcher, RouteMatcher} from "./interface";
import {Subject} from "rxjs";

export interface CacheComponentRef{
    key:string;
    path:string;
    tag:string;
    component:VNode;
    iceMatcher:IceMatcher;
    subName:string;
}

export class InnerCache{
    hostComponentRef:CacheComponentRef|null=null;
    cacheComponentRefs:CacheComponentRef[]=[];
    cacheHistory:Subject<CacheComponentRef[]>=new Subject();

    get currentLevel():number{
        return this.cacheComponentRefs.length;
    }
    toPrimary():boolean{
        if(!this.cacheComponentRefs.length||this.cacheComponentRefs.length<2)return false;
        this.clearComponentRefs(false,1);
        return true;
    }
    back():{path:string,tag:string}|null{
        if(!this.cacheComponentRefs.length||this.cacheComponentRefs.length<2)return null;
        const targetIndex=this.cacheComponentRefs.length-2;
        const {path,tag}:CacheComponentRef=this.cacheComponentRefs[targetIndex];
        return {path,tag};
    }

    cacheRender(vNode:VNode,matcherPath:string,tag:string,iceMatcher:IceMatcher,subName:string):VNode{
        const preComponentRef:CacheComponentRef|null=this.cacheComponentRefs.length?
            this.cacheComponentRefs[this.cacheComponentRefs.length-1]:null;

        const currentComponentRef:CacheComponentRef={
            component:vNode,
            path:matcherPath,
            tag,
            key:matcherPath+"-"+tag,
            iceMatcher,
            subName
        };
        if(!preComponentRef||preComponentRef.key!=currentComponentRef.key){
            const existsComponentRef:CacheComponentRef|undefined=this.cacheComponentRefs.find((componentRef:CacheComponentRef)=>componentRef.key==currentComponentRef.key);
            if(existsComponentRef){
                // hot update时不回获取旧instanceComponent
                if(existsComponentRef.iceMatcher.instanceComponent)currentComponentRef.iceMatcher=existsComponentRef.iceMatcher;
                currentComponentRef.component.componentInstance=existsComponentRef.iceMatcher.instanceComponent;
                let data:any=currentComponentRef.component.data;
                if(data){
                    data.keepAlive=true;
                    data.iceInstance=existsComponentRef.iceMatcher.instanceComponent;
                }
                this.clearComponentRefs(false,this.cacheComponentRefs.findIndex(i=>i==existsComponentRef)+1);

            }
            else{
                if(preComponentRef){
                    //主路由更换
                    // 或是推入路由为主路由
                    if(preComponentRef.path!=currentComponentRef.path||
                        !currentComponentRef.tag
                    ){
                        this.clearComponentRefs(true);
                    }else{
                        //此时，为新入 子路由
                        preComponentRef.component.data&&(preComponentRef.component.data.keepAlive=true);
                    }

                }
                this.cacheComponentRefs.push(currentComponentRef);
                this.cacheHistory.next(this.cacheComponentRefs);
            }
        }

        /**
         * is primary
         */
        if(!currentComponentRef.tag){
            this.hostComponentRef=currentComponentRef;
            /**
             * 子 route 赋值
             */
        }else if(this.hostComponentRef){
            const instance:any=this.hostComponentRef.iceMatcher.instanceComponent;
            const data=currentComponentRef.component.data;
            /**
             * props 赋值
             */

            if(data){
                Object.assign(data.props||(data.props={}),{
                    "iceParentData":instance.$data,
                    "iceParent":instance,
                });
                currentComponentRef.component.componentOptions&&(
                    currentComponentRef.component.componentOptions.propsData=data.props
                );
            }
        }
        return currentComponentRef.component;
    }

    clearComponentRefs(all:boolean,start:number=0){
        let clearArr:CacheComponentRef[];
        if(all){
            clearArr=this.cacheComponentRefs;
            this.cacheComponentRefs=[];
            this.hostComponentRef=null;
        }else{
            clearArr=this.cacheComponentRefs.slice(start);
            this.cacheComponentRefs=this.cacheComponentRefs.slice(0,start);
        }
        clearArr.forEach((componentRef:CacheComponentRef)=>{
            const component:any=componentRef.component;
            component.data&&(component.data.keepAlive=false);
            componentRef.iceMatcher.instanceComponent&&componentRef.iceMatcher.instanceComponent.$destroy();
        })
        this.cacheHistory.next(this.cacheComponentRefs);
    }

    clearCache(){
        this.clearComponentRefs(true);
    }
}