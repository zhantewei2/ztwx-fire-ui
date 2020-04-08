<!--
    auto created by @ztwx vue template!!

    @pageAuthor  :  zhantewei2
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-2-17 6:1:1
-->

<template>
    <div>
        <ice-login-page
            bg-img="/1.png"
        >
            <div class="ice-login-row">
                 <ice-input
                    color="default"
                    v-model="testValue"
                    placeholder="账号"
                >
                    <i slot="prefix" class="fa fa-user ice-input-icon"/>
                </ice-input>
            </div>
            <div class="ice-login-row">
                 <ice-input
                    style="margin-bottom:1rem"
                    v-model="password"
                    placeholder="密码"
                    type="password"

                >
                    <i slot="prefix" class="fa fa-changeKey ice-input-icon"/>
                </ice-input>
            </div>
            <div class="ice-login-row">
                <ice-button
                    color="default"
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
    from "../../ztwComponents/modules/ice-login-page/ice-login-page-component/ice-login-page-component.vue";

@Component({
    components: {IceLoginPageComponent}
})
export default class extends Vue{
    size:string[]=["small","now","medium","large"];
    colors:string[]=["default","primary","assist","success","warn","error"].slice(0,2);
    testValue:string="testValue";
    password:string="";

}
</script>
<style scoped src="./bb-page.scss" lang="scss"></style>