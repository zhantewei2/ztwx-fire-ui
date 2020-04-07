import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import "./ztwComponents/styles/index.scss";
import {FireContainerModule,IceContainerModule,ComponentModule} from "./ztwComponents/modules/modules";

Vue.config.productionTip = false;

Vue.use(FireContainerModule);
Vue.use(IceContainerModule);
Vue.use(ComponentModule);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
