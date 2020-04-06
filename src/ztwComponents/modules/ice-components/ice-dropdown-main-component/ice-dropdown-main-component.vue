<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-2-24 17:10:36
-->

<template>
    <div ref="mainElement"
         class="ice-dropdown-main"
         :class="[parent.position]"
         @mouseenter="enter"
         @mouseleave="leave"
         :style="{
             top:parent.positionTop+'px',
             left:parent.positionLeft+'px'
         }"
    >
        <transition name="ice-dropdown-animate">
            <main v-if="parent.isShow">
                <slot></slot>
            </main>
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component,Prop} from "vue-property-decorator";

@Component({})
export default class extends Vue{
    @Prop({})parent:any;
    mainElement:HTMLElement;
    created(){
        this.parent.instance=this;
    }
    mounted(){
         this.mainElement=(this.$refs as any).mainElement;
    }
    toDestroy(){
        if(this.mainElement&&this.mainElement.parentElement)
            this.mainElement.parentElement.removeChild(this.mainElement);
    }
    beforeDestroy(){
        this.toDestroy();
    }
    enter(){

    }
    leave(e:MouseEvent){
        if(this.parent.triggerType!=="hover")return;
        const targetEl:any=e.relatedTarget;
        if(targetEl===this.parent.parentElement||this.parent.parentElement.contains[targetEl]){
            //pass
        }else{
            this.parent.hide();
        }
    }
}
</script>
