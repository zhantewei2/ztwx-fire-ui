<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-4-9 0:58:25
-->

<template>
    <div class="ice-login-page-wrapper"
        :style="{
            backgroundImage:'url('+bgImg+')'
        }"
    >
        <div class="ice-login-page-article">

            <div class="ice-login-page-article-bg1"
             :style="{
                 backgroundImage:'url('+bgImg+')'
            }"
            ></div>
             <div class="ice-login-page-article-bg0"></div>
            <header>
                <slot name="header"></slot>
                <div class="ice-brand text-center">大众</div>
            </header>
            <article>
                <slot></slot>
            </article>
            <footer>
                <slot name="footer"></slot>
                <div class="text-center ice-des">des</div>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component({})
export default class extends Vue{
    @Prop()bgImg:string;
}
</script>
<style src="./ice-login-page-component.scss" lang="scss"></style>