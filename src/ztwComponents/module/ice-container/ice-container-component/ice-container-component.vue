<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhantewei2
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-2-17 0:1:1
-->

<template>
    <main class="ice-container"
        :class="{trigger:trigger,fold:isFold}"
    >
        <cmIce-header @fold="toFold">
            <slot slot="bulletin" name="header-bulletin"></slot>
            <slot slot="left" name="header-left"></slot>
            <slot slot="right" name="header-right"></slot>
        </cmIce-header>
        <cmIce-nav :dataLevel="dataLevel" :showAll="showAll" :navData="data" :allNavData="allData" @fold="toFold">
            <slot slot="top" name="nav-top"></slot>
        </cmIce-nav>
        <div>
            <header class="ice-body-header"></header>
            <cmIce-body>
                <slot></slot>
            </cmIce-body>
        </div>
        <div v-if="!isFold" class="ice-cover" @click="toFold"></div>
    </main>
</template>

<script lang="ts">
import Vue from "vue";
import {Component,Prop} from "vue-property-decorator";
import {NavListItem} from "@/ztwComponents";

@Component({
    name:"ice-container"
})
export default class extends Vue{
    @Prop()data!:{[key:string]:NavListItem[]};
    @Prop()allData!:NavListItem[];
    @Prop({default:true})trigger:boolean;
    @Prop()dataLevel:number;
    @Prop()showAll:boolean;
    isFold:boolean=false;
    toFold(){
        this.isFold=!this.isFold;
    }
}
</script>
<style scoped src="./ice-container-component.scss" lang="scss"></style>
