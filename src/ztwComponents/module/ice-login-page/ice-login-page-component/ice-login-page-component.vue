<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-4-9 0:58:25
-->

<template>
    <div class="ice-login-page-wrapper"
        :style="{
            backgroundImage:'url('+bgImg2+')'
        }"
    >
        <self-ice-loader :color="color" :show="imgLoading" abs="true" size="large"/>
        <div class="ice-login-page-article cover-floor" v-if="bgImg2"
            :class="[
                login?'openDoor':''
            ]"
        >
            <div class="ice-login-page-article-bg1"
             :style="{
                 backgroundImage:'url('+bgImg2+')'
            }"
            ></div>
             <div class="ice-login-page-article-bg0"></div>
            <header>
                <slot name="header"></slot>
            </header>
            <article>
                <slot></slot>
            </article>
            <footer>
                <slot name="footer"></slot>
            </footer>

            <div class="cover-tower"></div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop, Watch} from "vue-property-decorator";
import IceLoaderComponent from "../../../components/iceLoaderComponent/iceLoaderComponent.vue";
import {BaseColors} from "../../../types";

@Component({
    name:"ice-login-page",
    components:{
        'self-ice-loader':IceLoaderComponent
    }
})
export default class extends Vue{
    @Prop({default:false})login:boolean;
    @Prop({default:'default'})color:BaseColors;
    @Prop()bgImg:string;
    bgImg2:string="xx";
    imgLoading:boolean=false;
    @Watch("login")
    watchLogin(v:boolean){
        this.imgLoading=v;
    }
    @Watch("bgImg",{immediate:true})
    watchBgImg(v:string){
        // this._bgImg="";
        this.imgLoading=true;
        const img=new Image();
        img.onload=()=>{
            this.imgLoading=false;
            this.bgImg2=v;
        };
        img.src=v;
    }
}
</script>