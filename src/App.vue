<template>
  <div id="app">
    <cmIce-container :data="navData">
      <router-view></router-view>
      <span slot="header-left">
        <button @click="select('one')">list-one</button>
        <button @click="select('two')">list-two</button>
      </span>
      <span slot="header-right">
        header-right
      </span>
    </cmIce-container>
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
    this.navData=dataFactory([
      {label:"aa-label",children:[
          {path:"/aa",label:"aa"},
          {path:"/bb",label:"bb"},
      ]},
      {label:"bb-label",children:[
          {path:"/cc",label:"cc-active"}
      ]}
      ]);
  }
  select(){

  }
}
</script>

<style lang="scss">

</style>
