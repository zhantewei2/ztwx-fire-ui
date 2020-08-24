import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
export default new Router({
    mode:"history",
    base:"/",
    routes:[
        {path:"/aa",component:()=>import("./views/aaPage/aaPage.vue")},
        {path:"/bb",component:()=>import("./views/bb-page/bb-page.vue")},
        {path:"/cc",component:()=>import("./views/cc-page/cc-page.vue")}
    ]
})