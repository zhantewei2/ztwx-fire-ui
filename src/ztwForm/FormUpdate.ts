import {Form} from "./validators";
import {Controller} from "./share";
import {filterUpdate} from "./filterUpdate";
import {ControllerUpdate} from "./ControllerUpdate";
/**
 * 相同为 true,不同为false
 * 忽略为 undefined;
 */
export type CheckMiddleFn=(key:string,originalValue:any,changedValue:any)=>boolean|undefined;

export class FormUpdateVersion extends Form{
    controllerUpdate:ControllerUpdate;
    constructor(
         controllers: Controller[]
    ) {
        super(controllers);
        this.controllerUpdate=new ControllerUpdate(this);
        this.controllerUpdate.defineControllersUpdate();
    }

    originalValue:Record<string, any>={};
    clearChange(){
        this._isChanged=false;
        this.controllerUpdate.clearChange();
    }
    /**
     * 设置待更新的原始数据
     * @param originalValue
     */
    setOriginValue(
        originalValue:Record<string, any>,
    ){
        this.originalValue={};
        this.clearChange();
        Object.keys(this.value).forEach((key:string)=>{
            this.value[key]=this.originalValue[key]=originalValue[key];
        })
    }

    updateOriginValue(
        updateValue:Record<string, any>
    ){
        Object.keys(updateValue).forEach(key=>{
            this.value[key]=this.originalValue[key]=updateValue[key];
        });
        if(!this.getUpdatedValue())this.clearChange();
    }

    resetOriginValue(){
        Object.keys(this.originalValue).forEach((key:string)=>{
            this.value[key]=this.originalValue[key];
        });
        this.clearChange();
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

            ([originValue,currentValue]=filterUpdate(originValue,currentValue));

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
    checkMiddleFn?:CheckMiddleFn;

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
}