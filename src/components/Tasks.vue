<template>
  <div class="content">

    <!-- Tags above will show when click to add a new task -->
    <ui-grid container v-if="newTaskFast">
      <i class="close icon" v-on:click="hideAddTaskFast()"></i>
      <new-task-fast></new-task-fast>
    </ui-grid>

    <!-- Tags above will populate the task content -->
    <ui-grid container>
      <ui-row>
        <ui-column class="four wide">
          <h2>{{ msg[$route.params.period] }}</h2>
        </ui-column>
        <ui-column class="eleven wide right aligned" id="new-task">
          <i class="plus icon" v-on:click="showAddTaskFast()"></i> Nova tarefa
        </ui-column>
      </ui-row>
      <template v-for="(dates, v) in currentTasks">
        <ui-row id="date-title">
          <ui-column class="sixteen wide">
            {{v}}
          </ui-column>
        </ui-row>
        <ui-row v-for="task in dates" :key="task.id">
          <ui-column class="one wide">
            <i class="checkmark box icon" v-on:click="completeTask(task.id)"></i>
          </ui-column>
          <ui-column class="fourteen wide edit-task">
            <p v-on:click="showEditTaskModal(task.id)">{{task.name}}</p>
          </ui-column>
          <ui-column class="one wide">
            <i class="remove icon" v-on:click="deleteTask(task.id)"></i>
          </ui-column>
        </ui-row>
      </template>
    </ui-grid>

    <!-- Tags above will populate modal component -->

    <div v-if="showModal">
      <edit-task-modal>
        <header slot="header">
          <div class="ui right aligned grid">
            <div class="right floated left aligned two wide column">
              <i class="large remove icon" v-on:click="hideEditTaskModal()"></i>
            </div>
          </div>
          <center>
            <h3> Editar tarefa</h3></center>
        </header>
        <div slot="body">
          <form class="ui fluid form">
            <div class="field">
              <div class="ui pointing below label">
                Nome da tarefa
              </div>
              <input type="text" v-model="editModal.name" id="name">
            </div>
            <div class="field">
              <div class="ui pointing below label">
                Data
              </div>
              <datepicker placeholder="Data" v-model="editModal.task_date" id="task_date" language="pt-br" format="dd/MM/yyyy"></datepicker>
            </div>
            <div class="field">
              <div class="ui pointing below label">
                Duração
              </div>
              <input type="number" v-model="editModal.duration" step="5" min="0" id="duration" v-on:change="multipleFive">
            </div>
            <div class="field">
              <div class="ui pointing below label">
                Lembrar quantos minutos antes
              </div>
              <input type="number" v-model="editModal.remind" step="5" min="0" id="remind" v-on:change="multipleFive">
            </div>
            <div class="field">
              <div class="ui pointing below label">
                Descrição
              </div>
              <input type="text" v-model="editModal.description" id="description">
            </div>
          </form>
        </div>
        <div slot="footer">
          <center>
            <button v-on:click="saveEditTask()" id="save-modal" class="ui button">Salvar</button>
          </center>
        </div>
      </edit-task-modal>
    </div>
  </div>
</template>


<script>
  import Vue from 'vue';
  import { Mixin } from 'semantic-ui-vue2';
  import NewTaskFast from './NewTaskFast';
  import Datepicker from 'vuejs-datepicker';
  import EditTaskModal from './EditTaskModal';
  const moment = require('moment');
  moment.locale('pt-br');

  require('izimodal');

  Vue.mixin({
    methods: {
      //Load all tasks of current period
      loadCurrentTasks: function() {

        let params = {};

        params[this.$root.$data.filter] = true;

        switch (this.$route.params.period) {
          case "week":
            params.task_week = moment().week().toString();
            break;
          case "today":
            params.task_date = moment().startOf('day').format();
            break;
          case "month":
            params.task_month = moment().month().toString();
            break;
        }

        const tasks = this.GetRequestTask(params);

        tasks.then(function(response) {

          this.$data.currentTasks = [];

          this.$data.currentTasks = response.data.reduce(function(r, a) {
            let task_date_formated = moment(a.task_date).format("DD/MM/YYYY");

            r[task_date_formated] = r[task_date_formated] || [];

            r[task_date_formated].push(a);

            return r;
          }, Object.create(null));
        });
      }
    }
  });

  export default {
    name: 'Tasks',
    components: {
      NewTaskFast,
      EditTaskModal,
      Datepicker
    },
    mixins: [Mixin],
    data() {
      return {
        msg: {
          week: "Semana",
          today: "Hoje",
          month: "Esse mês"
        },
        editTask: false,
        newTaskFast: false,
        currentTasks: [],
        datesArray: [],
        showModal: false,
        editModal: {
          name: "",
          task_date: "",
          duration: "",
          remind: "",
          description: ""
        }
      };
    },
    watch: {
      '$route' () {
        this.loadCurrentTasks(); //Load all pendent task when change period.
      }
    },
    mounted: function() {
      this.loadCurrentTasks(); //Load all pendent task on page load.
    },
    methods: {

      // Limit modal fields to have just multiple five numbers.
      multipleFive: function(e){
        this.editModal[e.srcElement.id] = parseInt(Math.round(e.target.value/5)*5);
      },

      // This fill all fiels in model with there respective task values
      fillTaskModalFields: function(taskId) {
        const params = {
          id: taskId
        };

        const taskInfoPromises = this.GetRequestTask(params);
        taskInfoPromises.then(function(response) {
          for (var key in response.data[0]) {
            this.$data.editModal[key] = response.data[0][key];
          }
        });
      },

      //Show current task fields modal for enable user to edit some infos.
      showEditTaskModal: function(taskId) {
        this.showModal = true;
        this.fillTaskModalFields(taskId);
      },

      // Just hide the modal
      hideEditTaskModal: function() {
        this.showModal = false;
      },

      //Show task fields to user add a new task
      showAddTaskFast: function() {
        this.newTaskFast = true;
      },

      // Save in db all new values of a task
      saveEditTask: function() {

        this.$data.editModal.task_date = moment(this.$data.editModal.task_date, "DD/MM/YYYY").startOf('day').format();
        this.$data.editModal.last_update = moment().format();

        const savedTaskPromises = this.EditTask(this.$data.editModal.id, this.$data.editModal);

        savedTaskPromises.then(function() {

          this.$swal("Tarefa editada com sucesso!", "", "success");
          this.hideEditTaskModal();
          this.loadCurrentTasks();

        }, function() {
          this.$swal("Houve um erro enquanto concluia a tarefa.", "", "error");
        });

      },

      // Complete a task
      completeTask: function(taskId) {
        let param = {
          isOpen: false,
          isComplete: true,
          last_update: moment().format(),
          ended_at: moment().format()
        }

        let editPromise = this.EditTask(taskId, param);
        editPromise.then(function(response) {
          this.$swal("Tarefa concluída com sucesso!", "", "success");
          this.loadCurrentTasks(); //Recarrega as tarefas pendentes da página atual
        }, function() {
          this.$swal("Houve um erro enquanto concluia a tarefa.", "", "error");
        });
      },

      // Delete a task
      deleteTask: function(taskId) {
        const param = {
          isOpen: false,
          isRemoved: true,
          last_update: moment().format(),
          ended_at: moment().format()
        }

        let editPromise = this.EditTask(taskId, param);

        editPromise.then(function(response) {
          this.$swal("Tarefa removida com sucesso!", "", "success");
          this.loadCurrentTasks(); //Recarrega as tarefas pendentes da página atual
        }, function() {
          this.$swal("Houve um erro enquanto removia a tarefa.", "", "error");
        });
      },

      //Hide task fields.
      hideAddTaskFast: function() {
        this.newTaskFast = false;
      }
    }
  }
</script>

<style>

  #date-title {
    border-bottom: 1px solid rgba(34,36,38,.15);
    padding-bottom: 5px;
  }

  .edit-task {
    cursor: pointer;
  }

  .edit-task:hover {
    color: #E04F5F;
  }
</style>
