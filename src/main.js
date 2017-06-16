import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Tasks from './components/Tasks.vue';
import VueSweetAlert from 'vue-sweetalert';

window.Vue = Vue;

Vue.use(VueSweetAlert);
Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  routes: [
    { path: '/tarefas/:period', component: Tasks, name: 'Tasks' },
    { path: '/', redirect: '/tarefas/week' },
  ],
});

Vue.mixin({
  methods: {
    // Make a GET request and return a promise
    GetRequestTask: function(params) {
      const currentUserId = 1;
      let filter = "";

      for (var key in params) {
        filter += key + "=" + params[key] + "&";
      }

      filter = filter.slice(0, -1);

      return this.$http.get('http://localhost:3000/users/' + currentUserId + '/tasks?' + filter);
    },

    // Use this when you want to edit a task.
    // Just send the idTask and all new infos about that task.
    EditTask: function(idTask, newParams) {
      return this.$http.get('http://localhost:3000/tasks/' + idTask).then(function(response) {

        let db = response.data;

        for (var key in newParams) {
          if (db[key] != newParams[key]) {
            db[key] = newParams[key];
          }
        }

        return this.$http.put('http://localhost:3000/tasks/' + idTask, JSON.stringify(db));
      });
    }
  }
});

let vm = new Vue({
  el: '#app',
  router,
  data() {
    return {
      filter: 'isOpen'
    };
  },
  template: '<App/>',
  components: { App }
});
