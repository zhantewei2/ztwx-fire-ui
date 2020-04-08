<template>
  <div id="app" style="padding:2rem">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {
  constructor(){
    super();

  }
  select(){

  }
}
</script>

<style lang="scss">

</style>
