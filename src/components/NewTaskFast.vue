<template>
	<ui-row>
		<ui-column class="sixteen wide">
      <ui-form>
			  <div class="field">
          <div class="fields">
            <div class="twelve wide field">
              <input type="text" name="name" id="name" v-model="name" placeholder="Descrição da tarefa">
            </div>
            <div class="four wide field">
              <datepicker name="date" id="date" placeholder="Data" v-model="date" language="pt-br" format="dd/MM/yyyy"></datepicker>
            </div>
            <input type="button" v-on:click="newTask()" class="ui button" value="Adicionar tarefa">
          </div>
			  </div>
			</ui-form>
		</ui-column>
	</ui-row>
</template>

<script>
import { Mixin } from 'semantic-ui-vue2';
import Tasks from './Tasks';
import Datepicker from 'vuejs-datepicker';
import mixins from './mixins';

export default {
  name: 'NewTaskFast',
  components: {
    Tasks,
    Datepicker
  },
  mixins: [mixins, Mixin],
  data() {
    return {
      date: null,
      name: null
    }
  },
  methods: {

    // Insert a new task in DB, based in name and date values inserted.
    newTask() {
      if (this.date && this.name) {
        const currentTask = {
          name: this.name,
          userId: 1,
          isOpen: true,
          task_date: this.moment(this.date, "DD/MM/YYYY").startOf('day').format(),
          task_week: this.moment(this.date, "DD/MM/YYYY").week(),
          task_month: this.moment(this.date, "DD/MM/YYYY").month(),
        };

        const taskData = Object.assign(this.taskDataDefault, currentTask);
        
        this.$http.post('http://localhost:3000/users/1/tasks', JSON.stringify(taskData)).then((response) => {
          this.$parent.$parent.loadCurrentTasks()
          this.name = ''
          this.date = ''
          this.$swal("Tarefa criada com sucesso!", "", "success");
        });
      } else {
        // TODO: Emit a alert to the user.
        console.warn('Por favor, preencha todos os campos.');
      }
    }
  }
}


</script>


