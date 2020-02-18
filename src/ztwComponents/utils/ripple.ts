import {isMobile} from './common';


export interface RippleOpts{
    deep?:boolean;
    size?:number;
}
const baseSize=12;
const removeTime=400;
const removeEndTime=400;
const body=document.body;

export const handleRipple=(
    el:HTMLElement,
    opts:RippleOpts
    )=>{
        let 
        one:HTMLElement,
        rect:ClientRect,
        x:number,
        y:number,
        halfSize:number=baseSize/2,
        //已插入的ripple
        rippleQueue:HTMLElement[]=[],
        //删除Bubbling
        removeQueueTimeout:any,
        //删除touchend class:
        removeEndTimeout:any,
        clearRemoveQueue:Function=()=>{
            clearTimeout(removeQueueTimeout);
            removeQueueTimeout=null;
        },
        clearTouchEnd:Function=()=>{
            clearTimeout(removeEndTimeout);
            removeEndTimeout=null;
        }
        const wrapper=document.createElement('span');
        wrapper.classList.add('ripple-wrapper',opts.deep?'ripple-wrapper-deep':'ripple-wrapper-light');
        el.appendChild(wrapper);

        const listenTouch=(e:any)=>{
            rect=el.getBoundingClientRect();
            x=e.clientX-rect.left;
            y=e.clientY-rect.top;
            one=document.createElement('span');
            one.className='ripple-bubbling';
            if(opts.size){
                one.style.fontSize=opts.size+'px';
                halfSize=opts.size/2;
            }
            one.style.left=x-halfSize+'px';
            one.style.top=y-halfSize+'px';
            rippleQueue.push(one);
            wrapper.appendChild(one);
            if(removeQueueTimeout)clearRemoveQueue();
            if(removeEndTime)clearTouchEnd();
            removeQueueTimeout=setTimeout(()=>{
                rippleQueue.forEach((child:HTMLElement)=>{
                    wrapper.removeChild(child)
                })
                rippleQueue=[];
            },removeTime);
            wrapper.classList.add('ripple-active');
        };
        const touchEnd=()=>{
            setTimeout(()=>wrapper.classList.remove('ripple-active'),removeEndTime);
        }
        if(isMobile){
            el.addEventListener('touchstart',(e:any)=>{
                listenTouch(e.touches[0]);
            });
            el.addEventListener('touchend',touchEnd);
        }else{
            el.addEventListener('mousedown',e=>{
                listenTouch(e);
                body.addEventListener('mouseup',function mouseUp(){
                    touchEnd();
                    body.removeEventListener('mouseup',mouseUp);
                });
            });
        }
        // el.addEventListener('contextmenu',e=>e.preventDefault());
    }