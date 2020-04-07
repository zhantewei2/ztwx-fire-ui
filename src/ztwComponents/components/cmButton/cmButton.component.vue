<template>
    <button class="btn ice-btn"
        :class="[
            'ice-btn-size-'+size,
            pure||pure===''?('ice-btn-pure-'+color):
            (outline||outline===''?('ice-btn-outline-'+color):('ice-btn-'+color))
        ]"
        :disabled="disabled||disabled===''"
    >
        <slot></slot>
    </button>
</template>

<script lang="ts">
    import {Prop,Component} from "vue-property-decorator";
    import Vue from "vue";
    import {handleRipple} from "../../utils/ripple";
    import {BaseSize,BaseColors} from "../../types"
    (window as any).testVue=Vue;

    @Component({
        name:"cm-ice-button"
    })
    export default class extends Vue{
        @Prop({default:true})border!:boolean;
        @Prop({default:"now"})size:BaseSize;
        @Prop({default:"primary"})color:BaseColors;
        @Prop({default:false})outline:boolean;
        @Prop({default:false})pure:boolean;
        @Prop({default:false})disabled:boolean;
        mounted(){
            handleRipple((this.$el as any),{css:"ripple-btn",autoSize:true});
        }
    }
</script>