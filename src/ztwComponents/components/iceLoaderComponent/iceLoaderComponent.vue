<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhantewei
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-4-9 10:49:31
-->

<template>
    <div>
        <transition name="animate-fade">
        <div
            v-if="show"
            class="ice-loader"
            :class="[
                abs?'abs':'',
                'ice-loader-size-'+size,
                'ice-loader-color-'+color
            ]"
        >
            <i class="fa fa-loader ice-loader"></i>
        </div>
        </transition>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import {BaseColors,BaseSize} from "../../types";

@Component({
    name:"ice-loader"
})
export default class extends Vue{
    @Prop({default:false})abs:boolean;
    @Prop({default:"default"})color:BaseColors;
    @Prop({default:"now"})size:BaseSize;
    @Prop({default:false})show:boolean;
}
</script>