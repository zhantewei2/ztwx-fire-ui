import {CreateElement,VNode} from "vue";

/**
 * 获得真实的vNode后，传递componentInstance
 * @param view
 */

export const iceCacheKeepAlive=(view:any):any=>({
    render(h:CreateElement){
        const routerView:VNode=h(view);
        const data:any=routerView.data;
        if(data&&data.iceInstance)routerView.componentInstance=data.iceInstance;
        return routerView;
    }
});