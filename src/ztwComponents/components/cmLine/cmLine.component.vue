<template>
  <li
    class="cm-line"
    :class="{border:border}"
    v-cm-ripple>
    <slot></slot>
  </li>
</template>

<script lang="ts">
import {Vue,Component,Prop} from "vue-property-decorator";
@Component({})
export default class extends Vue{
  @Prop({default:true})border!:boolean;
}
</script>