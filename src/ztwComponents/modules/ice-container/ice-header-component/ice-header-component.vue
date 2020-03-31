<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhantewei2
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-2-17 0:1:1
-->

<template>
    <header class="ice-container-header">
        <main class="ice-container-header-bulletin">
            <div @click="toFold" v-cm-ripple="{deep:true}" class="ice-container-header-btn">
                <i class="fa fa-menu"></i>
            </div>
            <slot name="bulletin"></slot>
        </main>
        <main class="ice-container-header-wrapper">
            <aside>
                <slot name="left"></slot>
            </aside>
            <aside>
                <slot name="right"></slot>
            </aside>
        </main>
    </header>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";

@Component({
    name:"cmIce-header"
})
export default class extends Vue{
    constructor() {
        super();
    }
    toFold(){
        this.$emit("fold");
    }
}
</script>
<style scoped src="./ice-header-component.scss" lang="scss"></style>