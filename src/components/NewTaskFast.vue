<template>
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
</template>

<script>

import { Mixin } from 'semantic-ui-vue2';

export default {
  name: 'NewTaskFast',
  mixins: [Mixin]
}

</script>