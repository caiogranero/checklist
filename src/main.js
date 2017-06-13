// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router'
import VueResource from 'vue-resource';

import Hello from './components/Hello.vue'
import Tasks from './components/Tasks.vue'

window.Vue = Vue;

const moment = require('moment');

Vue.use(VueRouter)
Vue.use(VueResource);

const router = new VueRouter({
	routes: [
		{path: '/tarefas/:period', component: Tasks, name: 'Tasks'},
		{path: '/', component: Hello},
	],
});

Vue.mixin({
  methods: {

    // Make a GET request and return a promise
    GetRequestTask: function(params) {
      const currentUserId = 1
      let filter = ""

      for(var key in params){
        filter += key + "=" + params[key] + "&"
      }

      filter = filter.slice(0, -1);

      return this.$http.get('http://localhost:3000/users/'+currentUserId+'/tasks?'+filter);
    }
  }
});

let vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
