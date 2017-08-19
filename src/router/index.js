import Vue from 'vue';
import Router from 'vue-router';
import Tasks from '../components/Task/Tasks';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/tarefas/week',
    },
    {
      path: '/tarefas/:period',
      component: Tasks,
      name: 'Tasks',
    },
  ],
});
