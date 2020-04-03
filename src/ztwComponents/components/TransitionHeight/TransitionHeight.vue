<template>
  <div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

const TransitionName='cma-height-transition';
const DurationTime=200;

@Component({})
export default class extends Vue {
  mounted() {
    const el: any = this.$el;
    const append = el.appendChild;
    const remove = el.removeChild;
    let height: number;
    let isRemove: boolean;
    let oldNode: HTMLElement;
    let dirty: boolean;
    const hid = (node: HTMLElement) => {
      node.style.height = '0px';
      node.style.opacity = '0';
    };
    const show = (node: HTMLElement) => {
      node.style.height = height + 'px';
      node.style.opacity = '1';

    };
    const listenTransitionEnd = (node: HTMLElement) => {
      if (oldNode != node) {
        setTimeout(() => {
          if (!isRemove) return;
          node.classList.remove(TransitionName);
          remove.call(el, node);
        }, DurationTime);
      }
    };
    el.appendChild = (node: HTMLElement) => {
      isRemove = false;
      append.call(el, node);
      height = node.offsetHeight;
      hid(node);
      node.classList.add(TransitionName);
      listenTransitionEnd(node);
      setTimeout(() => show(node), 50);
      oldNode = node;
      dirty = true;
    };
    el.removeChild = (node: HTMLElement) => {
      node.classList.add(TransitionName);
      if (!dirty) {
        height = node.offsetHeight;
        show(node);
        setTimeout(() => hid(node), 50);
        listenTransitionEnd(node);
      } else {
        hid(node);
      }
      dirty = isRemove = true;
    }
  }
}

</script>