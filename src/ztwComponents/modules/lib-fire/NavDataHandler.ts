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
            i.selected=false;
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
    /**
     *
     * @param items navData数据
     * @param allData 是否 inner data..
     * @param itemsLevel item处于allData的层级
     */
    constructor(itemsLevel:number=0) {
        this.itemsLevel=itemsLevel;
        // this.navListItems=items;
        // if(allData)this.allData=allData;
        // if(initItem){
        //     const initActiveItem=this.findActiveItem(items);
        //     if(initActiveItem)this.preActiveItem=initActiveItem;
        // }
    }
    setLevel(level:number){
        this.itemsLevel=level;
    }
    /**
     * 写入navData
     * @param currentNavData 当前导航激活的navData
     * @param fullNavData 完整navData
     */
    setData(currentNavData:NavListItem[],fullNavData:NavListItem[]){
        if(this.fullNavData!=fullNavData)this.fullNavData=fullNavData;
        this.currentNavData=currentNavData;
    }
    itemsLevel:number;
    preCurrentNavData:NavListItem[];
    _currentNavData:NavListItem[];

    set currentNavData(items:NavListItem[]){
        if(items==this._currentNavData)return;
        this.preCurrentNavData=this._currentNavData;
        this._currentNavData=items;
    }
    get currentNavData(){
        return this._currentNavData;
    }

    fullNavData:NavListItem[];
    navListItems:NavListItem[];
    preActiveItem!:NavListItem;
    preventFromUrl:boolean;

    /**得到item的所有父级对象
     *
     * @param i
     * @param parents
     */
    getItemQueueList(i:NavListItem,parents:NavListItem[]=[]):NavListItem[]{
        parents.unshift(i);
        if(i.parent){
            this.getItemQueueList(i.parent,parents);
        }
        return parents;
    }

    /**根据item检查navData是否需要更新
     *
     * @param item
     */
    checkAndResetCurrentNavData(item:NavListItem){
        if(this.itemsLevel<=0)return;
        const navItemQueue:NavListItem[]=this.getItemQueueList(item);
        const targetItem=navItemQueue[this.itemsLevel-1];
        if(!targetItem||!targetItem.children)return;
        //reset currentNavData;
        this.currentNavData=targetItem.children;
    }

    /**查找已激活 de item
     *
     * @param navList
     */
    findActiveItem(navList:NavListItem[]):NavListItem|null{
        const find=(list:NavListItem[]):NavListItem|null=>{
            for(let i of list){
                if(i.active)return i;
                if(i.children){
                    const existsItem:NavListItem|null=find(i.children);
                    if(existsItem)return existsItem;
                }
            }
            return null;
        };

        return find(navList);
    }

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
            // 暂时不使用preActiveItem.
            // if(this.preActiveItem){
            //     this.preActiveItem.active=false;
            // }
            this.resetData(this.fullNavData);
            i.active=true;
            // this.preActiveItem=i;
            //如果为点击，则阻止自动触发.
            this.preventFromUrl=true;
            this.openParents(i);
            activeNext(i);
        }}

    /**
     * watch “route.path” 触发
     * 从 url path 中展开collapse
     * @param navListItems
     * @param path
     */
    collapseNavCardFromPath(path:string):void{
        /**
         * 阻止 导航菜单的点击事件触发的展开
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
        /**
         * 如果存在allData 则从allData中查询
         */
        const item:NavListItem|null=findItem(this.fullNavData);
        if(!item)return;

        //重置其他item
        this.resetData(this.fullNavData);

        this.openParents(item);
        item.active=true;
        /**检查该item 是否在本导航数据表内，
         * 如果不存在， 则切换navData为改item所在的数据表0
         *
         **/
        this.checkAndResetCurrentNavData(item);
        // if(this.preActiveItem)this.preActiveItem.active=false;
        // this.preActiveItem=item;
    }

    /**
     * 展开 parent item
     * @param i
     */
    openParents(i:NavListItem){
        if(i.parent){
                i.parent.open=true;
                i.parent.selected=true;
                this.openParents(i.parent);
        }
    }
    /** 重置Data
     *
     * @param navListItems
     */
    resetData(navListItems:NavListItem[]){
        navListItems.forEach((i:NavListItem)=>{
            i.open=false;
            i.active=false;
            i.selected=false;
            i.children&&this.resetData(i.children);
        })
    }
}