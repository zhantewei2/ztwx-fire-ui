<template>
    <button class="btn ice-icon-btn"
            :class="[
              'ice-icon-btn-size-'+size,
              appearCss
        ]"
            v-on="this.$listeners"
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
        name:"cm-ice-icon-button",
        computed:{
            appearCss:function(this:any){
                if(this.candy||this.candy==='')return 'ice-btn-candy-'+this.color;
                if(this.fab||this.fab==='')return 'ice-btn-'+this.color;
                return 'ice-btn-pure-'+this.color
            }
        }
    })
    export default class extends Vue{
        @Prop({default:true})border!:boolean;
        @Prop({default:"now"})size:BaseSize;
        @Prop({default:"primary"})color:BaseColors;
        @Prop({default:false})candy:any;
        @Prop({default:false})disabled:boolean;
        @Prop({default:false})fab:boolean;

        mounted(){
            let cssName:string=this.candy||this.candy===''?'ripple-color-'+this.color:'ripple-btn';

            handleRipple((this.$el as any),{
                css:cssName,
                autoSize:true
            });
        }
    }
</script>
