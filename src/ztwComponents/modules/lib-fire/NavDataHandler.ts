/***
 * 操作navData数据
 */
import {NavListItem} from "./data.interface";


/**
     * 处理一个深度
     * 为所有item添加parent
     * @param navListItems
     * @param parent
     */
export const handleListData=(navListItems:NavListItem[],parent:NavListItem)=>{
        navListItems.forEach((i:NavListItem)=>{
            i.parent=parent;
            i.open=false;
            i.active=false;
            if(i.children)handleListData(i.children,i);
        })
    };

/** 返回处理后的List
*
* @param navListItems
*/
export const dataFactory=(navListItems:NavListItem[]):NavListItem[]=>{
        /**
         * 最外层构建一个虚拟parent
         */
        const parent={
            label:"parent",
            children:navListItems
        };
        handleListData(navListItems,parent);
        return navListItems;
};


export class NavDataHandler{
    constructor(items:NavListItem[]) {
        this.navListItems=items;
    }
    navListItems:NavListItem[];
    preActiveItem!:NavListItem;
    preventFromUrl:boolean;
    /**
     * 处理 item 点击时，折叠相关数据的更改
     * @param i
     * @param activeNext  当item为导航项时，触发该回调
     */
    handleItemClickDataChange(i:NavListItem,activeNext:(i:NavListItem)=>void):void{
        if(i.children){
            //当为父级时
            if(!i.open){
                if(i.parent&&i.parent.children){
                    // 关闭打开的item
                    for(let child of i.parent.children){
                        if(child.open){
                            child.open=false;
                            break;
                        }
                    }
                }
                i.open=true;
            }else{
                i.open=false;
            }
        }else{
            //为导航项时

            //如果存在前一个激活的item
            if(this.preActiveItem){
                this.preActiveItem.active=false;
            }
            i.active=true;
            this.preActiveItem=i;
            //如果为点击，则阻止自动触发.
            this.preventFromUrl=true;
            activeNext(i);
        }}

    /**
     * 从 url path 中展开collapse
     * @param navListItems
     * @param path
     */
    collapseNavCardFromPath(path:string):void{
        /**
         * 阻止 点击事件触发的展开
         */
        if (this.preventFromUrl){
            this.preventFromUrl=false;
            return;
        }

        const findItem=(list:NavListItem[]):NavListItem|null=>{
            for(let i of list){
                if(i.path===path){
                    return i;
                }
                if(i.children){
                    const existsItem:NavListItem|null=findItem(i.children);
                    if(existsItem)return existsItem;
                }
            }
            return null;
        };
        const item:NavListItem|null=findItem(this.navListItems);
        if(!item)return;

        //找到item,重置其他item
        this.resetData(this.navListItems);

        const openParent=(i:NavListItem)=>{
            if(i.parent){
                i.parent.open=true;
                openParent(i.parent);
            }
        };

        openParent(item);
        item.active=true;
    }

    /** 重置Data
     *
     * @param navListItems
     */
    resetData(navListItems:NavListItem[]){
        navListItems.forEach((i:NavListItem)=>{
            i.open=false;
            i.active=false;
            i.children&&this.resetData(i.children);
        })
    }
}