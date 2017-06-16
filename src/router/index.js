import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/tarefas/week'
    },
    {
      path: '/tarefas/:period',
      component: Tasks,
      name: 'Tasks'
    },
  ],
});
