// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router'
import Hello from './components/Hello.vue'
import Tasks from './components/Tasks.vue'

Vue.use(VueRouter)

// Vue.config.productionTip = false;

const router = new VueRouter({
	routes: [
		{path: '/tarefas/:period', component: Tasks, name: 'Tasks'},
		{path: '/', component: Hello},
	],
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
