import {NavListItem} from "../lib-fire/data.interface";
import {of,merge,Observable, fromEvent} from "rxjs";
import {map,debounceTime,filter} from "rxjs/operators";
import {ContainerToggleScreenWidth} from "./config";
export type NavListResult=NavListItem|void;

export const getFirstNav=(list:NavListItem[]):NavListResult=>{
    for(let i of list){
        if(i.path)return i;
        if(i.children&&i.children.length){
            const findItem:NavListResult=getFirstNav(i.children);
            if(findItem)return findItem;
        }
    }
}

export const orderScreenWidth=():Observable<number>=>{
    const getWidth=():number=>window.innerWidth;
    const observer:Observable<number>=merge(
            of(getWidth()),
            fromEvent(window,"resize")
                .pipe(
                    debounceTime(100),
                    map(()=>getWidth())
                )
        )
    return observer;
}

export const screenSmallSub=():Observable<boolean>=>{
    let isSmall:boolean;
    
    return orderScreenWidth().pipe(
        map((w:number)=>w<=ContainerToggleScreenWidth),
        filter((pass:boolean)=>{
            const isPass=pass!=isSmall
            isSmall=pass;
            return isPass;
        })
    )
}
    