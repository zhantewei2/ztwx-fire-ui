import Vue from "vue";

import {RippleDirection} from "./directive/ripple/ripple.directive";
import CmHeightTransitionComponent from "./components/TransitionHeight/TransitionHeight.vue";
import CmFireLine from "./components/cmLine/cmLine.component.vue";

Vue.directive("cm-ripple",RippleDirection);
Vue.component("cm-height-transition",CmHeightTransitionComponent);
Vue.component("cm-line",CmFireLine);

//container 引入
import {FireContainerModule} from "./modules/modules";
