<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhantewei2
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-2-17 0:1:1
-->

<template>
    <main class="ice-container">
        <cmIce-header>
            <slot slot="left" name="header-left"></slot>
            <slot slot="right" name="header-right"></slot>
        </cmIce-header>
        <cmIce-nav :navData="data">
            <slot name="nav-top"></slot>
        </cmIce-nav>
        <cmIce-body>
            <slot></slot>
        </cmIce-body>
    </main>
</template>

<script lang="ts">
import Vue from "vue";
import {Component,Prop} from "vue-property-decorator";
import {NavListItem} from "../../lib-fire/data.interface";
import IceHeaderComponent from "../ice-header-component/ice-header-component.vue";
import IceBodyComponent from "../ice-body-component/ice-body-component.vue";
import IceNavComponent from "../ice-nav-component/ice-nav-component.vue";

@Component({
       components:{
        "cmIce-header":IceHeaderComponent,
        "cmIce-nav":IceNavComponent,
        "cmIce-body":IceBodyComponent
    }
})
export default class extends Vue{
    @Prop()data!:NavListItem[];

}
</script>
<style scoped src="./ice-container-component.scss" lang="scss"></style>