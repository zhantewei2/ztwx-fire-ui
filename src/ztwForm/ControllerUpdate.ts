import {Controller} from "./share";
import {FormUpdateVersion} from "./FormUpdate";
import {filterUpdate} from "./filterUpdate";
import {Subject} from "./Subject";


export class ControllerUpdate{
    form:FormUpdateVersion;
    constructor(form:FormUpdateVersion) {
        this.form=form;
    }


    checkControllerChange(controller:Controller){
        const [originValue,currentValue]=filterUpdate(this.form.originalValue[controller.id],controller.value);
        const end=()=>{
            if(controller._changed)controller._changeObservable?.next(controller);
            return controller._changed;
        };

        if(this.form.checkMiddleFn){
            const checkResult=this.form.checkMiddleFn(controller.id,originValue,currentValue);
            if(checkResult!==undefined){
                controller._changed=checkResult;
                return end();
            }
        }
        
        controller._changed=originValue!==currentValue;
        return end();
    }
    
    
    defineControllerUpdate=(controller:Controller,key:string)=>{
        const self:ControllerUpdate=this;
        controller._changeObservable=new Subject<Controller>();

        const m=()=>{
            if(!controller.valueChangeSubjectOrder){
                controller.valueChangeSubjectOrder=controller.valueChange?.subscribe(controller=>{
                    self.checkControllerChange(controller);
                });
                self.checkControllerChange(controller);
            }
        };

        controller.changeObservable=()=>{
            m();
            return (controller._changeObservable as any);
        };

        Object.defineProperty(controller,"changed",{
            get(){
                m();
                return controller._changed;
            }
        })
    };
    defineControllersUpdate=()=>{
        for(let key in this.form.controllerDict){
            this.defineControllerUpdate(
                this.form.controllerDict[key],
                key
            );
        }
    };
    clearChange(){
        for(let key in this.form.controllerDict){
            this.form.controllerDict[key]._changed=false;
        }
    }
}