<!--
    auto created by @ztwx vue template!!
    @pageAuthor  :  zhan
    @AuthorEmail :  zhantewei@gmail.com
    @pageCreated :  2020-2-24 17:7:43
-->

<template>
    <div ref="parentElement"
         @mouseenter="enter"
         @mouseleave="leave"
         @click="click"
    >
        <slot></slot>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component,Prop} from "vue-property-decorator";
import IceDropdownMain from "../ice-dropdown-main-component/ice-dropdown-main-component.vue";
import {OutClick} from "../../lib-fire/OutClick";
import {RelativeFixed} from "../../lib-fire/RelativeFixed";
@Component({})
export default class extends Vue{
    @Prop({default:"hover"})triggerType:"hover"|"click";
    @Prop({default:"bottom"})position:"top"|"left"|"bottom"|"right";
    public instance:IceDropdownMain|any;
    private outClick:OutClick=new OutClick();
    parentElement:HTMLElement;
    relativeFixed:RelativeFixed=new RelativeFixed();
    positionTop:number=0;
    positionLeft:number=0;
    mounted(){
        this.parentElement=(this.$refs as any).parentElement;
    }

    click(){
        if(this.triggerType!=="click")return;
        this.toggle();
    }
    enter(){
        if(this.triggerType!=="hover")return;
        this.show();
    }
    leave(e:MouseEvent){
        if(this.triggerType!=="hover")return;
        const targetEl:any=e.relatedTarget;
        if(this.instance&&targetEl===this.instance.mainElement||this.instance.mainElement.contains(targetEl)){
            //pass
        }else{
            this.hide();
        }
    }

    isShow:boolean=false;
    /**
     * hide dropdown
     */
    hide(){
        if(this.isShow)this.isShow=false;
    }

    /**
     * show dropdown
     */
    async show(){
        if(this.isShow)return;

        const isPristine:boolean=this.initializeTemplate();
        /**
         * 如果初始化执行，则创建后，再执行true ，以便transition 动画正常工作.
         */
        if(isPristine){
            await this.$nextTick().then(()=>{
                this.isShow=true;
            })
        }else{
            this.isShow=true;
        }
        await this.$nextTick().then(()=>{
            const {top,left}=this.relativeFixed.relativePosition(this.instance.mainElement,this.parentElement,this.position);
            this.positionTop=top;
            this.positionLeft=left;
        });

        /**
         *Add the outClick , if it is a click event;
         */
        if(this.triggerType==="click")this.outClick.once(()=>this.hide(),[this.parentElement,this.instance.mainElement]);
    }

    /**
     * toggle dropdown
     */
    toggle(){
        !this.isShow?this.show():this.hide();
    }
    instanceRef:any;
    initializeTemplate():boolean{
        if(!this.instanceRef){
            const templateWrapper:HTMLElement=document.createElement("div");
            document.body.appendChild(templateWrapper);
            this.instanceRef=new Vue({
                render:h=>h(IceDropdownMain,{
                    props:{
                        parent:this
                    }
                },this.$slots.dropdown)
            }).$mount(templateWrapper);
            return true;
        }
        return false;
    }

    updated(){
        if(!this.instanceRef)return;
        this.instanceRef.$forceUpdate();
    }
    destroyed():void{
        this.instance&&this.instance.toDestroy();
        this.instanceRef&&this.instanceRef.$destroy();
    }

}
</script>
