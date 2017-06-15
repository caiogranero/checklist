<template>
  <div class="content">

  	<ui-grid container v-if="newTaskFast">
			<i class="close icon" v-on:click="hideAddTaskFast()"></i>
      <new-task-fast></new-task-fast>
    </ui-grid>

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
          <ui-column class="fourteen wide">
            <p v-on:click="showEditTaskModal">{{task.name}}</p>
          </ui-column>
          <ui-column class="one wide">
            <i class="remove icon" v-on:click="deleteTask(task.id)"></i>
          </ui-column>
        </ui-row>

       </template>

    </ui-grid>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Mixin } from 'semantic-ui-vue2';
  import NewTaskFast from './NewTaskFast';
  import EditTaskModal from './EditTaskModal';

  const moment = require('moment');
  require('izimodal');

  Vue.mixin({
    methods: {

      //Load all tasks of current period
      loadCurrentTasks : function(){

        let params = {
          isOpen      : true,
        };

        switch(this.$route.params.period){
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

        tasks.then(function(response){

          this.$data.currentTasks = [];

          this.$data.currentTasks = response.data.reduce(function (r, a) {
              let task_date_formated = moment(a.task_date).format("DD/MM/YYYY")

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
      EditTaskModal
	  },
  	mixins: [Mixin],
  	data () {
	  		return {
	  			msg: {
            week: "Semana",
            today: "Hoje",
            month: "Esse mês"
          },
          editTask: false,
	  			newTaskFast: false,
          currentTasks: [],
          datesArray: []
	  		}
  	},
    watch: {
      '$route' () {
        this.loadCurrentTasks(); //Load all pendent task on page load.
      }
    },
    mounted: function(){
      this.loadCurrentTasks(); //Load all pendent task on page load.
    },
  	methods:{
      //Show task fields to user add a new task
      showEditTaskModal : function(){
        console.log(1);
        this.editTask = true;
      },

      hideEditTaskModal   : function(){
        this.editTask = false;
      },

      //Show task fields to user add a new task
	    showAddTaskFast : function(){
	      this.newTaskFast = true;
	    },

      completeTask: function(taskId){
        let param = {
          isOpen: false,
          isComplete: true,
          last_update: moment().format(),
          ended_at: moment().format()
        }

        let editPromise = this.EditTask(taskId, param);
        editPromise.then(function (response) {
          this.$swal("Tarefa concluída com sucesso!", "", "success");
          this.loadCurrentTasks(); //Recarrega as tarefas pendentes da página atual
        }, function(){
          this.$swal("Houve um erro enquanto concluia a tarefa.", "", "error");
        });
      },

      deleteTask: function(taskId){
        let param = {
          isOpen: false,
          isRemoved: true,
          last_update: moment().format(),
          ended_at: moment().format()
        }

        let editPromise = this.EditTask(taskId, param);
        editPromise.then(function (response) {
          this.$swal("Tarefa removida com sucesso!", "", "success");
          this.loadCurrentTasks(); //Recarrega as tarefas pendentes da página atual
        }, function(){
          this.$swal("Houve um erro enquanto removia a tarefa.", "", "error");
        });
      },

      //Hide task fields.
	    hideAddTaskFast : function(){
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

</style>
