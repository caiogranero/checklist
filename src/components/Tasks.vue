<!-- <template>
 	<p>{{ msg }}
 	The paremeter value that was passed to me is: {{ $route.params.period }}</p>
</template> -->

<template>
  <div class="content">
  	<ui-grid container class="hidden">
      <ui-row>
        <ui-column class="sixteen wide">
        	<form class="ui form">
					  <div class="field">
					    <div class="fields">
					      <div class="twelve wide field">
					        <input type="text" name="description" id="date" placeholder="Descrição da tarefa">
					      </div>
					      <div class="four wide field">
					        <input type="text" name="date" id="date" placeholder="Data">
					      </div>
					      <input type="button" class="ui button" value="Adicionar tarefa">
					    </div>
					  </div>
					</form>
        </ui-column>
      </ui-row>
    </ui-grid>

    <ui-grid container>
      <ui-row>
        <ui-column class="four wide">
          <h2>{{ msg }}</h2>
        </ui-column>
        <ui-column class="eleven wide right aligned" id="new-task">
          <i class="plus icon"></i> Nova tarefa
        </ui-column>
      </ui-row>
    </ui-grid>
  </div>
</template>

<script>
	import { Mixin } from 'semantic-ui-vue2';

 	export default {
  	name: 'Tasks',
  	mixins: [Mixin],
  	data () {
	  		return {
	  			msg: "Hoje"
	  		}
  	}
 	}
</script>