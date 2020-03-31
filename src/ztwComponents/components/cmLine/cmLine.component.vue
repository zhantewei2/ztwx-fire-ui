<template>
  <li
    class="cm-line"
    :class="{border:border}"
    v-cm-ripple>
    <slot></slot>
  </li>
</template>

<script lang="ts">
import {Prop} from "vue-property-decorator";
import Vue from "vue";

(window as any).testVue=Vue;

export default class extends Vue{
  @Prop({default:true})border!:boolean;
  mounted(){}
}
</script>