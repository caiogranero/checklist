<!-- <template>
 	<p>{{ msg }}
 	The paremeter value that was passed to me is: {{ $route.params.period }}</p>
</template> -->

<template>
  <div class="content">

  	<ui-grid container v-if="newTaskFast">
			<!-- <div class="ui raised container segment">
			  
			</div> -->
			<i class="close icon" v-on:click="hideAddTaskFast()"></i>
      <new-task-fast></new-task-fast>

    </ui-grid>

    <ui-grid container>
      <ui-row>
        <ui-column class="four wide">
          <h2>{{ msg }}</h2>
        </ui-column>
        <ui-column class="eleven wide right aligned" id="new-task">
          <i class="plus icon" v-on:click="showAddTaskFast()"></i> Nova tarefa
        </ui-column>
      </ui-row>
    </ui-grid>

  </div>
</template>

<script>
	import { Mixin } from 'semantic-ui-vue2';
	import NewTaskFast from './NewTaskFast'

 	export default {
  	name: 'Tasks',
  	components: {
	    NewTaskFast
	  },
  	mixins: [Mixin],
  	data () {
	  		return {
	  			msg: "Hoje",
	  			newTaskFast: false
	  		}
  	},
  	methods:{
	    showAddTaskFast : function(){
	      this.newTaskFast = true;
	    },
	    hideAddTaskFast : function(){
	      this.newTaskFast = false;
	    }
	  }
 	}
</script>