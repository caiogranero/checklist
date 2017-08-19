<template>
  <div id="edit-task-modal" v-show="openModal">
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-header">
              <div name="header">
                <div class="ui right aligned grid">
                  <div class="right floated left aligned two wide column">
                    <i class="large remove icon" v-on:click="hideEditTaskModal()"></i>
                  </div>
                </div>
                <center><h3> Editar tarefa</h3></center>
              </div>
            </div>
            <div class="modal-body">
              <div name="body">
                <form class="ui fluid form">
                  <div class="field">
                    <div class="ui pointing below label">Nome da tarefa</div>
                    <input type="text" v-model="editModal.name" id="name">
                  </div>
                  <div class="field">
                    <div class="ui pointing below label">Data</div>
                    <datepicker placeholder="Data" v-model="editModal.task_date" id="task_date" language="pt-br" format="dd/MM/yyyy"></datepicker>
                  </div>
                  <div class="field">
                    <div class="ui pointing below label">Duração</div>
                    <input type="number" v-model="editModal.duration" step="5" min="0" id="duration" v-on:change="multipleFive">
                  </div>
                  <div class="field">
                    <div class="ui pointing below label">Lembrar quantos minutos antes</div>
                    <input type="number" v-model="editModal.remind" step="5" min="0" id="remind" v-on:change="multipleFive">
                  </div>
                  <div class="field">
                    <div class="ui pointing below label">Descrição</div>
                    <input type="text" v-model="editModal.description" id="description">
                  </div>
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <div name="footer">
                <center>
                  <button v-on:click="saveEditTask()" id="save-modal" class="ui button">Salvar</button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
import mixins from '@/components/mixins';
import Datepicker from 'vuejs-datepicker';
require('izimodal');

export default {
  name: 'EditTaskModal',
  mixins: [mixins],
  data() {
    return {
      editModal: {
        name: '',
        task_date: '',
        duration: '',
        remind: '',
        description: ''
      },
      openModal: false
    };
  },

  components: {
    Datepicker
  },

  props: {
    open: Boolean,
    taskId: Number
  },

  watch: {
    open () {
      this.openModal = true  
      this.fillTaskModalFields()
    }
  },

  methods: {

    hideEditTaskModal() {
      this.openModal = false
      Object.keys(editModal).forEach((key) => {
        this.editModal[key] = ''
      })
    },

    // Limit modal fields to have just multiple five numbers.
    multipleFive(e){
      this.editModal[e.srcElement.id] = parseInt(Math.round(e.target.value/5)*5);
    },

    // This fill all fiels in model with there respective task values
    fillTaskModalFields() {
      const taskInfoPromises = this.GetRequestTask({id: this.taskId});
      taskInfoPromises.then((response) => {
        for (var key in response.data[0]) {
          this.editModal[key] = response.data[0][key];
        }
      });
    },

    // Save in db all new values of a task
    saveEditTask() {
      this.editModal.task_date = this.moment(this.editModal.task_date, "DD/MM/YYYY").startOf('day').format();
      this.editModal.last_update = this.moment().format();

      const savedTaskPromises = this.EditTask(this.editModal.id, this.editModal);

      savedTaskPromises.then(() => {
        this.$swal("Tarefa editada com sucesso!", "", "success");
        this.hideEditTaskModal();
        // TODO: Recarregar lista de tarefas.
        this.loadCurrentTasks();
      }, () => {
        this.$swal("Houve um erro enquanto concluia a tarefa.", "", "error");
      });
    },
  }
};
</script>

<style>

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
}

#save-modal {
  background-color: #E04F5F;
  color: white;
}

.modal-header h3 {
  margin-top: 0;
  color: #E04F5F;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}


</style>

