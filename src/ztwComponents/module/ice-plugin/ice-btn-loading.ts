import Vue,{PluginFunction,PluginObject} from "vue";

export interface BtnLoadRef{
    btn:HTMLElement;
    cancel:()=>void;
}

export class IceBtnLoading{
    /**
     * 储放于 btn element 的key 值，保存loadSpan,用于防止重复录入。
     */
    btnKey:string="ztwx-ice-btn-loading";
    btnLoadingClass:string[]=["is-disabled"];
    render(){
        return `
    <i class="fa fa-loader ice-fa-loader"></i>
        `
    }
    constructor(){
        this.watchBtnClick();
    }
    originBtnAddEventListener:any;
    catchElement:HTMLElement|null;

    /**
     * 加入加载条，并添加加载属性
     * @param btn
     */
    appendLoading(btn:HTMLElement):HTMLElement{
        if((btn as any)[this.btnKey])return (btn as any)[this.btnKey] as HTMLElement;
        btn.style.height=btn.offsetHeight+"px";
        //写入滚动
        const loadSpan=document.createElement("span");
        loadSpan.innerHTML=this.render();
        loadSpan.className="an-fade-in";
        btn.appendChild(loadSpan);
        (btn as any)[this.btnKey]=loadSpan;
        //添加load属性
        btn.setAttribute("disabled","disabled");
        btn.classList.add(...this.btnLoadingClass);
        return loadSpan;
    }
    cancelLoading(btn:HTMLElement,loadSpan:HTMLElement):()=>void{
        return ()=>{
             loadSpan.parentElement&&loadSpan.parentElement.removeChild(loadSpan);
            (btn as any)[this.btnKey]=undefined;
            btn.removeAttribute("disabled");
            btn.classList.remove(...this.btnLoadingClass);
            (btn.style as any)["height"]=null;
        }
    }


    watchBtnClick(){
        const self=this;
        this.originBtnAddEventListener=HTMLButtonElement.prototype.addEventListener;
        HTMLButtonElement.prototype.addEventListener=function(method:string,fn:any){
            self.originBtnAddEventListener.call(this,method,function(e:Event){
                /**赋值
                 * 保证 fn 中能够获取catchElement;
                 */
                self.catchElement=e.currentTarget as HTMLElement;
                fn(e);
                //清除值
                self.catchElement=null;
            }.bind(this))
        }
    }
    btnLoad():BtnLoadRef|null{
        if(!this.catchElement)return null;
        const btn:HTMLElement=this.catchElement;
        const loadSpan:HTMLElement=this.appendLoading(btn);
        return {
            btn,
            cancel:this.cancelLoading(btn,loadSpan)
        }
    }
}


export const IceBtnLoadingModule:PluginObject<any>={
    install:function(vue:typeof Vue,v:any):void{
        const iceBtnLoading=new IceBtnLoading();
        vue.prototype.$iceBtnLoad=()=>iceBtnLoading.btnLoad();
    }
};