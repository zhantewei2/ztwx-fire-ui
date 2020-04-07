<template>
    <div id="app" style="padding:2rem">
        <button class="ice-btn ice-btn-size-now ice-btn-primary">
            button
        </button>
        <div class="cm-search-card">
            <ice-button
                    :key="i"
                    v-for="i in colors"
                    :color="i"
            >ice-button</ice-button>
        </div>
        <div class="cm-content-card">
            <ice-button
                    v-for="i in colors"
                    :color="i"
                    :key="i"
                    outline
            >
                <i class="fa fa-exit"></i>
                submit
            </ice-button>
        </div>
        <div class="cm-content-card">
            <ice-button
                    v-for="i in colors"
                    :color="i"
                    :key="i"
                    pure
            >
                <i class="fa fa-user"></i>
                submit
            </ice-button>
        </div>
        <div class="cm-search-card">
            <ice-button disabled>
                disabled
            </ice-button>
            <ice-button disabled outline>disabled</ice-button>
            <ice-button disabled pure>disabled
            </ice-button>
        </div>
        <div class="cm-search-card">
            <ice-icon-button size="now" v-for="i in colors" :key="i" :color="i">
                <i class="fa fa-changeKey"></i>
            </ice-icon-button>
        </div>
        <div class="cm-search-card">
            <ice-icon-button disabled candy size="now" v-for="i in colors" :key="i" :color="i">
                <i class="fa fa-right"></i>
            </ice-icon-button>
        </div>
        <div class="cm-search-card">
            <ice-icon-button fab size="now" v-for="i in colors" :key="i" :color="i">
                <i class="fa fa-right"></i>
            </ice-icon-button>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component({})
    export default class App extends Vue {
        colors:any[]=["primary","assist","warn","success","error"];
        constructor(){
            super();

        }
        select(){

        }
    }
</script>

<style lang="scss">

</style>
