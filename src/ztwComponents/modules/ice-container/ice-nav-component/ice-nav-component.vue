<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhantewei2
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-2-17 0:1:1
-->

<template>
    <nav class="ice-container-nav">
        <aside>
            <slot></slot>
        </aside>
        <aside class="content">
            <cmIce-nav-item :data="navData" :itemFn="itemClick"></cmIce-nav-item>
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
    components:{
        "cmIce-nav-item":IceNavItemComponent
    }
})
export default class extends Vue{
    @Prop()navData:NavListItem[];
    navDataHandler!:NavDataHandler;
    @Watch("navData",{
        immediate:true
    })
    watchData(data:NavListItem[]){
        this.navDataHandler=new NavDataHandler(data);
    }

    @Watch("$route.path",{immediate:true})
    watchPath(path:string){
        if(!this.navData)return;
        setTimeout(()=>{
            this.navDataHandler.collapseNavCardFromPath(path);
        })
    }

    /**
     * 点击item 所有item均触发此方法
     * @param i
     */
    itemClick(i:NavListItem){
        this.navDataHandler.handleItemClickDataChange(i,(item:NavListItem)=>{
            if(item.path)this.$router.push(item.path);
        })
    }
}
</script>
<style scoped src="./ice-nav-component.scss" lang="scss"></style>