<!--
    auto created by @ztwx vue template!!

    @pageAuthor  :  zhantewei2
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-2-17 6:1:1
-->

<template>
    <div>
        pageBB
        <div style="width:400px;">
            <ice-input @focus="focus" :useEnter="true" @enter="pressEnter" v-model="testValue"
                placeholder="是是是"
            >
                <span slot="prefix">prefix</span>
            </ice-input>
        </div>
        <div>{{testValue}}</div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";

@Component({})
export default class extends Vue{
    focus(){
        console.log("focus")
    }
    testValue:string="testValue";
    pressEnter(e:any){
        console.log(e)
    }
}
</script>
<style scoped src="./bb-page.scss" lang="scss"></style>