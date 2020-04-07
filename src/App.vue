<template>
  <div id="app" style="padding:2rem">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {NavListItem} from "./ztwComponents/modules/lib-fire/data.interface";
import {dataFactory} from "./ztwComponents/modules/lib-fire/NavDataHandler";

@Component({})
export default class App extends Vue {
  navData:NavListItem[]=[];

  constructor(){
    super();

  }
  select(){

  }
}
</script>

<style lang="scss">

</style>
