<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhantewei2
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-2-17 0:1:1
-->

<template>
    <nav class="ice-container-nav">
        <aside class="brand">
            <slot name="top"></slot>
        </aside>
        <aside class="content">
            <cmIce-nav-item :data="showAll?allNavData:navDataHandler.currentNavData" :itemFn="itemClick"></cmIce-nav-item>
        </aside>
        <aside class="footer" v-cm-ripple @click="toFold()">
            <i class="fa fa-collapse"></i>
        </aside>
    </nav>
</template>

<script lang="ts">
import Vue from "vue";
import {Component,Prop,Watch} from "vue-property-decorator";
import {NavListItem} from "../../lib-fire/data.interface";
import {NavDataHandler} from "../../lib-fire/NavDataHandler";
import IceNavItemComponent from "../ice-nav-item-component/ice-nav-item-component.vue";

@Component({
    name:"ice-container-nav",
    components:{
        "cmIce-nav-item":IceNavItemComponent
    }
})
export default class extends Vue{
    @Prop()allNavData:NavListItem[];
    @Prop()navData:{[key:string]:NavListItem[]};
    @Prop()dataLevel:number;
    @Prop()showAll:boolean; //展示所有navData;
    navDataHandler:NavDataHandler=new NavDataHandler(3);
    created(){
        console.log('ice-nav',this.$route);
    }

    @Watch("navData",{
        immediate:true
    })
    watchData(dataDict:{[key:string]:NavListItem[]}){
        const currentNavData=dataDict["key"];
        if(currentNavData==this.navDataHandler.currentNavData)return;
        this.navDataHandler.setData(currentNavData,this.allNavData);
    }
    @Watch("$route.path",{immediate:true})
    watchPath(path:string){
        if(!this.navData)return;
        setTimeout(()=>{
            this.navDataHandler.collapseNavCardFromPath(path);
        })
    }
    @Watch("dataLevel",{immediate:true})
    watchLevel(level:number){
        if(!level&&level!==0)return;
        this.navDataHandler.setLevel(level);
    }

    /**折叠
     */
    toFold(){
        this.$emit("fold");
    }

    /**
     * 点击item 所有item均触发此方法
     * @param i
     */
    itemClick(i:NavListItem){
        if(this.$route.path===i.path)return;
        this.navDataHandler.handleItemClickDataChange(i,(item:NavListItem)=>{
            if(item.path)this.$router.push(item.path);
        })
    }
}
</script>
<style scoped src="./ice-nav-component.scss" lang="scss"></style>