<template>
  <div class="content">
    <ui-grid container>
      <ui-row>
        <ui-column class="four wide">
          <h2>{{ period }}</h2>
        </ui-column>
        <ui-column class="eleven wide right aligned" id="new-task">
          <i class="plus icon"></i> Nova tarefa
        </ui-column>

        <div class="ui fluid popup top left transition hidden">
          <div class="ui four column divided center aligned grid">
            <div class="column">1</div>
            <div class="column">2</div>
            <div class="column">3</div>
            <div class="column">4</div>
          </div>
        </div>
      </ui-row>
    </ui-grid>
  </div>
</template>

<script>


import { Mixin } from 'semantic-ui-vue2';

const $ = require('jquery');

export default {
  name: 'content',
  mixins: [Mixin],
  data() {
    return {
      period: 'Hoje',
    };
  },
};

$('.column').click(function(){
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
