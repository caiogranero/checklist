import VueSweetAlert from 'vue-sweetalert';
import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App';
import store from './store';
import router from './router';

Vue.use(VueSweetAlert);
Vue.use(VueResource);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
