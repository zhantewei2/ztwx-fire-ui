import {IceSubViewRef,IceSubViewRoute} from "./interface";

export class InnerUrl{
    sessionKey:string="ztwx-ice-inner-router-store";
    cacheComponentRefs:Record<string,IceSubViewRef>={};

    findInnerComponent=(path:string,subView:IceSubViewRoute[],matcherPath:string):IceSubViewRef|undefined=>{
        if(!subView)return undefined;
        const cacheKey=matcherPath+"-"+path;
        const cacheComponentRef=this.cacheComponentRefs[cacheKey];
        if(cacheComponentRef)return cacheComponentRef;

        const viewRoute=subView.find(view=>view.path==path);
        if(!viewRoute)return undefined;

        return {
            subName: viewRoute.subName,
            path: path,
            instanceComponent: viewRoute.component().then((dict: any) =>{
                this.cacheComponentRefs[cacheKey]={
                  path:path,
                  subName: viewRoute.subName,
                  instanceComponent:dict.default
                };
                return dict.default;
            })
        };
    };

    getInnerPath=():string|undefined=>{
        const matcher=location.href.match(/#(.*)$/);
        if(!matcher)return undefined;
        return matcher[1];
    };

    /**
     * 设置传递的参数
     * @param params
     * @param currentLevel
     */
    setParams(params:any,currentLevel:number){
        const sessionStore=sessionStorage.getItem(this.sessionKey);
        try {
            if (sessionStore) {
                const sessionValue = JSON.parse(sessionStore);
                Object.assign(sessionValue,{
                        [currentLevel]:params
                });
                sessionStorage.setItem(this.sessionKey,JSON.stringify(sessionValue))
            }
        }catch(e){
            console.error("get params failure");
            throw e;
        }
    }

    /**
     * 获取父级传递的参数
     * @param currentLevel
     */
    getParentParams(currentLevel:number):any{
        const sessionStore=sessionStorage.getItem(this.sessionKey);
        if(sessionStore){
            const sessionDict=JSON.parse(sessionStore);
            return sessionDict[currentLevel-1];
        }else{
            return undefined;
        }
    }
}
