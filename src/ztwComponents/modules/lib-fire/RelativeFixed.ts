export class RelativeFixed{
    constructor(space=10){
        this.space=space;
    }
    space:number;
    relativePosition(targetEl:HTMLElement,relativeEl:HTMLElement,position:"top"|"left"|"right"|"bottom"="top"){
        const rect=relativeEl.getBoundingClientRect();
        const obj={
            rect,
            centerX:rect.left+rect.width/2,
            centerY:rect.top+rect.height/2,
            winH:document.documentElement.offsetHeight,
            winW:document.documentElement.offsetWidth,
            target:targetEl
        }
        setTimeout(()=>{
            const positionDict=this.switchPosition(position,obj);
            let value;
            for (let i of Object.keys(positionDict)){
                value=positionDict[i];
                if(value!==undefined){
                    (targetEl.style as any)[i]=value+"px";
                }
            }
        },1)
       
    }
    /**
     * 
     * @param {"top"|"left"|"right"|"bottom"} position 
     */
    switchPosition(position:"top"|"left"|"right"|"bottom",obj:any,history:any[]=[]):any{
        let top,left;
        const targetH=obj.target.offsetHeight;
        const targetW=obj.target.offsetWidth;
        if(position=="top"){
            top=obj.rect.top-this.space-targetH;
            left=obj.centerX-targetW/2;
        }else if(position=="left"){
            left=obj.rect.left-this.space-targetW;
            top=obj.centerY-targetH/2;

        }else if(position=="right"){
            left=obj.rect.right+this.space;
            top=obj.centerY+targetH/2;
        }else if(position=="bottom"){
            top=obj.rect.bottom+this.space;
            left=obj.centerX-targetW/2;
        }
        if (top!==undefined&&top<0&& !history.includes("top")){
            history.push("top");
            return this.switchPosition("bottom",obj,history);
        }
        if (left!==undefined&&left<0&& !history.includes("left")){
            history.push("left");
            return this.switchPosition("right",obj,history);
        }
        if (left!==undefined&&left+this.space+targetW>obj.winW&& !history.includes("right")){
            history.push("right");
            return this.switchPosition("left",obj,history);
        }
        if (top!==undefined&&top+this.space+targetH>obj.winH&& !history.includes("bottom")){
            history.push("bottom");
            return this.switchPosition("top",obj,history);
        }
        return {
            top,left
        }
    }

}