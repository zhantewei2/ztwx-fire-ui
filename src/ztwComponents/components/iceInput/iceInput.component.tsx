import Vue from "vue";
import {Component, Emit, Prop} from "vue-property-decorator";
import {BaseColors, BaseSize} from "../../types";

@Component({
    render(this:IceInputComponent,h:any){
        console.log("value",this.value);
        const listeners:any=Object.assign({},this.$listeners,{
            input:(e:any)=>{
                this.input(e.target.value);
                this.$emit("input",e.target.value)
            },
            focus:()=>{
                this.$listeners.focus&&(this.$listeners as any).focus.call(this);
                this.inputFocus();
            },
            blur:()=>{
                this.$listeners.blur&&(this.$listeners as any).blur.call(this);
                this.inputBlur();
            },
            keydown:(e:any)=>{
                this.$listeners.keydown&&(this.$listeners as any).keydown.call(this);
                this.keydown(e);
            }
        });

        const attrs=Object.assign({},this.$attrs,{
            value:this.value,
            placeholder:''
        });
        return (

        <div class={`ice-input-wrapper${(this as any).wrapperAttach}`}>
            <header></header>
            <article>
                {this.$slots.prefix?
                    <span ref={'prefix'} class={'ice-input-prefix'}>
                        {this.$slots.prefix}
                    </span>:null
                }
                <span class={'ice-input-container'}>
                    {h("input",{
                        on:listeners,
                        attrs:attrs,
                        class:'ice-input'
                    })}
                    <div ref={'placeholder'} class={'ice-input-placeholder'}>
                        {this.$slots.placeholder}{this.placeholder}
                    </div>
                </span>
                {(this as any).isClear?
                    <span class={'ice-input-attach-clear'}>
                        <ice-icon-button onclick={this.clearValue} size={'small'} color={this.color} >
                            <i class={'fa fa-close'}> </i>
                        </ice-icon-button>
                    </span>:null
                }

                {this.$slots.suffix?
                    <span ref={'suffix'} class={'ice-input-suffix'}>
                        {this.$slots.suffix}
                    </span>:null
                }

                <div class={'ice-input-line'}></div>
            </article>
            <footer>
            </footer>
        </div>
        )
    },
    computed:{
        wrapperAttach(this:IceInputComponent){
            let str='';

            let openPlaceHolder:boolean=!this.isEmpty||this.isFocus;
            this.setOpenPlaceHolder(openPlaceHolder);
            if(openPlaceHolder)str+=' --with-open-placeholder';
            if(this.$slots.prefix)str+=' --with-prefix';
            if(this.$slots.suffix)str+=' --with-suffix';
            if(this.isFocus)str+=' --with-focus';
            if(this.color)str+=` ice-wrapper-color-${this.color}`;
            if(this.size)str+=` ice-wrapper-size-${this.size}`;
            return str;
        },
        isClear(this:IceInputComponent){
            return (this.clearable||this.clearable==='')&&this.value!==""&&this.value!==undefined;
        }
    }
})
export class IceInputComponent extends Vue{
    @Prop({})value:any;
    @Prop({default:'default'})color:BaseColors;
    @Prop({default:"now"})size:BaseSize;
    @Prop({default:false})useEnter:boolean;
    @Prop({})placeholder:string;
    @Prop({default:true})clearable:any;
    @Emit("enter")
    emitEnter(){}
    isFocus:boolean=false;
    isEmpty:boolean=false;

    input(v:any){
        this.isEmpty=v===""||v===undefined;
    }
    inputFocus(){
        this.isFocus=true;
    }
    inputBlur(){
        this.isFocus=false;
    }
    keydown(e:any){
        if(!this.useEnter)return;
        const charCode=e.which||e.keyCode;
        if(charCode===13)this.emitEnter();
    }
    mounted(){
    }
    openPlaceholder:boolean=false;
    setOpenPlaceHolder(open:boolean){
        if(open==this.openPlaceholder)return;
        //for initialize after created
        setTimeout(()=>{
            this.openPlaceholder=open;
            const placeholderEl:HTMLElement=(this.$refs as any).placeholder;
            const prefixEl:HTMLElement=(this.$refs as any).prefix;
            if(!placeholderEl||!prefixEl)return;
            //use default css transform if prefixEl not exists
            placeholderEl.style.transform=open?`translate3d(${0 - prefixEl.offsetWidth}px,-100%,0)`:"";
        })
    }
    clearValue(){
        console.log("clearValue");
        this.$emit("input","");
    }
}
