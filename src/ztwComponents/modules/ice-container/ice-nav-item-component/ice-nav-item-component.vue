<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhantewei2
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-2-17 3:1:1
-->

<template>
    <main class="ice-nav-block">
        <article class="ice-nav-item"
            v-for="(i) in data"
            :key="i.label"
        >
            <div
                class="ice-nav-item-line"
                :class="{
                    active:i.active,
                    open:i.open
                }"
                @click="itemFn(i)"
                v-cm-ripple
            >
                <label>{{i.label}} </label>
                <span v-if="i.children&&i.children.length">
                    <i class="fa fa-right arrow"></i>
                </span>
            </div>

            <nav class="ice-nav-item-nav" v-if="i.open">
                <cmIce-nav-item :data="i.children" :itemFn="itemFn"></cmIce-nav-item>
            </nav>
        </article>

    </main>
</template>

<script lang="ts">
import Vue from "vue";
import {Component,Prop} from "vue-property-decorator";
import {NavListItem} from "../../lib-fire/data.interface";
import {RippleDirection} from "../../../directive/ripple/ripple.directive";
@Component({
    directives:{
        "cm-ripple":RippleDirection
    }
})
export default class extends Vue{
    @Prop()data:NavListItem[];
    @Prop()itemFn:any;
}
</script>
