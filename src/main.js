import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueComposotionApi from '@vue/composition-api';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.use(VueComposotionApi)
Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
