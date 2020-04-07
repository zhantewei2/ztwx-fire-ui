<template>
    <div>
        <input v-bind="$attrs" v-on="$listeners"/>
    </div>
</template>

<script lang="ts">
    import {Prop,Component} from "vue-property-decorator";
    import Vue from "vue";

    (window as any).testVue=Vue;

    @Component({
        name:"ice-input",
    })
    export default class extends Vue{
        mounted(){

        }
    }
</script>