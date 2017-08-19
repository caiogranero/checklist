/* eslint no-param-reassign: ["error", { "props": false }] */
import moment from 'moment';

moment.locale('pt-br');

const mixins = {
  data() {
    return {
      taskDataDefault: {
        task_date: this.moment().startOf('day'),
        task_week: this.moment().week(),
        task_month: this.moment().month(),
        last_update: this.moment().format(),
        created_at: this.moment().format(),
        isRemoved: false,
        isOpen: false,
        isCompleted: false,
      },
    };
  },

  methods: {
    moment(param) {
      return moment(param);
    },

    // Load all tasks of current period
    loadCurrentTasks() {
      const params = {};

      params[this.$store.state.filter] = true;

      switch (this.$route.params.period) {
        case 'week':
          params.task_week = moment().week().toString();
          break;
        case 'today':
          params.task_date = moment().startOf('day').format();
          break;
        case 'month':
          params.task_month = moment().month().toString();
          break;
        default:
          break;
      }

      const tasks = this.GetRequestTask(params);

      tasks.then((response) => {
        this.$data.currentTasks = [];

        this.$data.currentTasks = response.data.reduce((r, a) => {
          const taskDateFormated = moment(a.task_date).format('DD/MM/YYYY');

          r[taskDateFormated] = r[taskDateFormated] || [];

          r[taskDateFormated].push(a);

          return r;
        }, Object.create(null));
      });
    },
    // Make a GET request and return a promise
    GetRequestTask(params) {
      const currentUserId = 1;
      let filter = '';

      Object.keys(params).forEach((key) => {
        filter += `${key}=${params[key]}&`;
      });


      filter = filter.slice(0, -1);

      return this.$http.get(`http://localhost:3000/users/${currentUserId}/tasks?${filter}`);
    },

    // Use this when you want to edit a task.
    // Just send the idTask and all new infos about that task.
    EditTask(idTask, newParams) {
      return this.$http.get(`http://localhost:3000/tasks/${idTask}`).then((response) => {
        const db = response.data;

        Object.keys(newParams).forEach((key) => {
          if (db[key] !== newParams[key]) {
            db[key] = newParams[key];
          }
        });

        return this.$http.put(`http://localhost:3000/tasks/${idTask}`, JSON.stringify(db));
      });
    },
  },
};

export default mixins;
