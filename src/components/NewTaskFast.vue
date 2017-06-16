<template>
	<ui-row>
		<ui-column class="sixteen wide">
			<form class="ui form">
			  <div class="field">
			    <div class="fields">
			      <div class="twelve wide field">
			        <input type="text" name="name" id="name" v-model="name" placeholder="Descrição da tarefa">
			      </div>
			      <div class="four wide field">
              <datepicker name="date" id="date" placeholder="Data" v-model="date" language="pt-br" format="dd/MM/yyyy"></datepicker>
			        <!-- <input type="input" > -->
			      </div>
			      <input type="button" v-on:click="newTask()" class="ui button" value="Adicionar tarefa">
			    </div>
			  </div>
			</form>
		</ui-column>
	</ui-row>
</template>

<script>

  import { Mixin } from 'semantic-ui-vue2';
  import Tasks from './Tasks';
  import Datepicker from 'vuejs-datepicker';

  const moment = require('moment');

  export default {
    name: 'NewTaskFast',
    components: {
      Tasks,
      Datepicker
    },
    mixins: [Mixin],
    data() {
      return {
        date: null,
        name: null
      };
    },
    methods: {
      newTask: function() {

        moment.locale('pt-br');

        let data = {
          name: this.name,
          task_date: moment(this.date, "DD/MM/YYYY").startOf('day').format(),
          task_week: moment(this.date, "DD/MM/YYYY").week(),
          task_month: moment(this.date, "DD/MM/YYYY").month(),
          last_update: moment().format(),
          created_at: moment().format(),
          userId: 1,
          isRemoved: false,
          isOpen: true,
          isCompleted:false
        };

        this.$http.post('http://localhost:3000/users/1/tasks', JSON.stringify(data)).then(function(response) {
          this.$parent.$parent.loadCurrentTasks();
          this.name = null;
          this.date = null;

          this.$swal("Tarefa criada com sucesso!", "", "success");
        });
      }
    }
  };


</script>


