import {Form} from "./validators";
import {Controller} from "./share";

/**
 * 相同为 true,不同为false
 * 忽略为 undefined;
 */
export type CheckMiddleFn=(key:string,originalValue:any,changedValue:any)=>boolean|undefined;

export class FormUpdateVersion extends Form{
    constructor(
         controllers: Controller[]
    ) {
        super(controllers);
    }
    originalValue:Record<string, any>={};

    /**
     * 设置待更新的原始数据
     * @param originalValue
     */
    setOriginValue(
        originalValue:Record<string, any>,
    ){
        this.originalValue={};
        this._isChanged=false;
        Object.keys(this.value).forEach((key:string)=>{
            this.value[key]=this.originalValue[key]=originalValue[key];
        })
    }

    updateOriginValue(
        updateValue:Record<string, any>
    ){
        this._isChanged=false;
        Object.keys(updateValue).forEach(key=>{
            this.value[key]=this.originalValue[key]=updateValue[key];
        })
    }


    resetOriginValue(){
        Object.keys(this.originalValue).forEach((key:string)=>{
            this.value[key]=this.originalValue[key];
        });
        this._isChanged=false;
    }
    /**
     * 获取发生更改的值
     */
    getUpdatedValue():undefined|Record<string, any>{
        const updatedValue:Record<string, any>={};
        let originValue:any,currentValue:any;
        let checkResult:boolean|undefined;
        Object.keys(this.originalValue).forEach(key=>{
            originValue=this.originalValue[key];
            currentValue=this.value[key];
            if(currentValue==="")currentValue=undefined;
            if(originValue==="")originValue=undefined;
            if(this.checkMiddleFn){
                checkResult=this.checkMiddleFn(key,originValue,currentValue);
                if(checkResult!==undefined){
                    if(!checkResult)updatedValue[key]=currentValue;
                    return;
                }
            }
            if(originValue!==currentValue){
                updatedValue[key]=currentValue
            }
        });
        return Object.keys(updatedValue).length>0?updatedValue:undefined;
    }
    checkMiddleFn:CheckMiddleFn;

    setCheckMiddleware(checkFn:CheckMiddleFn){
        this.checkMiddleFn=checkFn;
    }

    changeOrderExists:boolean=false;
    _isChanged:boolean=false;
    get isChanged():boolean{
        if(!this.changeOrderExists){
            this.valueChange.subscribe(()=>{
                this._isChanged=!!this.getUpdatedValue();
            });
            this.changeOrderExists=true;
            return !!this.getUpdatedValue();
        }
        return this._isChanged;
    }
    noChange(){
        this._isChanged=false;
    }
}