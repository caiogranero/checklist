<template>
  <div class="hello">
    <ui-grid container>
      <ui-row>
        <ui-column class="four wide">
          <h2>{{ period }}</h2>
        </ui-column>
        <ui-column class="eleven wide right aligned" id="new-task">
          <i class="plus icon"></i> Nova tarefa
        </ui-column>
      </ui-row>
    </ui-grid>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  data() {
    return {
      period: 'Hoje',
    }
  },
}

</script>
