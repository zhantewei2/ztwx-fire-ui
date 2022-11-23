export class OutClick{
    body:HTMLElement;
    onceCb:((e:Event)=>void)|null;
    constructor() {
        this.body=document.body;
    }

    /**关闭时，即外部点击时触发cb
     * 但 程序可能不通过点击触发关闭.所以得保证cb 内方法得安全性... 比如判断是否关闭，再执行相应代码
     *
     * @param cb 关闭回调
     * @param insideEls  不触发的elements
     */
    once(cb:(e:Event)=>void,insideEls:HTMLElement[]=[]){
        if(this.onceCb)return;
        const triggerClose=(e:any)=>{
            cb(e);
            this.onceCb&&this.body.removeEventListener("click",this.onceCb);
            this.onceCb=null;
        };
        this.onceCb=(e:Event)=>{
            if(insideEls&&insideEls.length){
                const node:any=e.target;
                let isInside:boolean=false; //是否在内部
                for(let el of insideEls){
                    if(node===el||el.contains(node)){
                        isInside=true;
                        break;
                    }
                }
                //如果不是内部点击，则触发关闭回调
                if(!isInside)triggerClose(e)
            }else{
                triggerClose(e);
            }
        };
        setTimeout(()=>this.onceCb&&this.body.addEventListener("click",this.onceCb));

    }
}