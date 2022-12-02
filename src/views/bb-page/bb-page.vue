<!--
    auto created by @ztwx vue template!!

    @pageAuthor  :  zhantewei2
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-2-17 6:1:1
-->

<template>
    <div>
        <ice-login-page
                :login="isLogin"
            bg-img="/1.png"
        >
            <header class="ice-brand text-center" slot="header">
                header
            </header>

            <div class="ice-login-row">
                 <ice-input
                    :color="themeColor"
                    v-model="testValue"
                    placeholder="账号"
                >
                    <i slot="prefix" class="fa fa-user ice-input-icon"/>
                </ice-input>
            </div>
            <div class="ice-login-row">
                 <ice-input
                    :color="themeColor"
                    v-model="password"
                    placeholder="密码"
                    type="password"
                >
                    <i slot="prefix" class="fa fa-changeKey ice-input-icon"/>
                </ice-input>
            </div>
            <div class="ice-login-row">
                <ice-button
                    @click="login()"
                    color="primary"
                    size="medium"
                    class="ice-btn-block">登录</ice-button>
            </div>
        </ice-login-page>

<!--        <div style="width:400px;">-->

<!--        </div>-->

<!--        <ice-button >clear</ice-button>-->
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import IceLoginPageComponent
    from "../../ztwComponents/module/ice-login-page/ice-login-page-component/ice-login-page-component.vue";

@Component({
    components: {IceLoginPageComponent}
})
export default class extends Vue{
    size:string[]=["small","now","medium","large"];
    colors:string[]=["default","primary","assist","success","warn","error"].slice(0,2);
    testValue:string="testValue";
    password:string="";
    isLogin:boolean=false;
    themeColor:string="default";
    login(){
        this.isLogin=true;
        setTimeout(()=>{
            this.isLogin=false
        },300);
    }

}
</script>
<style scoped src="./bb-page.scss" lang="scss"></style>
