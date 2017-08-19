<template>
  <div class="task">
    <new-task-fast :openNewTaskFast="newTaskFast"></new-task-fast>

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
      <template v-for="(dates, v) in currentTasks" >
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

    <edit-task-modal :open="editTask" :taskId="selectedTaskId"></edit-task-modal>
  </div>
</template>


<script>
  import Vue from 'vue';
  import mixins from '@/components/mixins';
  import { Mixin } from 'semantic-ui-vue2';
  import Datepicker from 'vuejs-datepicker';
  import NewTaskFast from '@/components/Task/NewTaskFast';
  import EditTaskModal from '@/components/Task/EditTaskModal';
  require('izimodal');

  export default {
    name: 'Tasks',
    components: {
      NewTaskFast,
      EditTaskModal,
      Datepicker
    },
    mixins: [Mixin, mixins],
    data() {
      return {
        msg: {
          week: "Semana",
          today: "Hoje",
          month: "Esse mês"
        },
        newTaskFast: false,
        editTask: false,
        selectedTaskId: 0,
        currentTasks: [],
        datesArray: []
      };
    },
    watch: {
      '$route' () {
        this.loadCurrentTasks(); //Load all pendent task when change period.
      }
    },

    created() {
      this.loadCurrentTasks(); //Load all pendent task on page load.
    },

    methods: {

      //Show/Hide current task fields modal for enable user to edit some infos.
      showEditTaskModal(taskId) {
        this.editTask = !this.editTask
        this.selectedTaskId = taskId
      },

      //Show task fields to user add a new task
      showAddTaskFast() {
        this.newTaskFast = !this.newTaskFast;
      },

      // Complete a task
      completeTask(taskId) {
        let param = {
          isOpen: false,
          isComplete: true,
          last_update: this.moment().format(),
          ended_at: this.moment().format()
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
      deleteTask(taskId) {
        const param = {
          isOpen: false,
          isRemoved: true,
          last_update: this.moment().format(),
          ended_at: this.moment().format()
        }

        let editPromise = this.EditTask(taskId, param);

        editPromise.then(function(response) {
          this.$swal("Tarefa removida com sucesso!", "", "success");
          this.loadCurrentTasks(); //Recarrega as tarefas pendentes da página atual
        }, function() {
          this.$swal("Houve um erro enquanto removia a tarefa.", "", "error");
        });
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
