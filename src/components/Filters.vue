<template>
  <div id="filter">
    <div class="item">
      <div class="ui toggle checkbox">
        <input type="radio" name="filter" v-model="filterFields" value="isOpen" v-on:click="setFilter()" id="isOpen" checked>
        <label>Pendente</label>
      </div>
    </div>
    <div class="item">
      <div class="ui toggle checkbox">
        <input type="radio" name="filter" v-model="filterFields" value="isRemoved" v-on:click="setFilter()" id="isRemoved">
        <label>Cancelado</label>
      </div>
    </div>
    <div class="item">
      <div class="ui toggle checkbox">
        <input type="radio" name="filter" v-model="filterFields" value="isComplete" v-on:click="setFilter()" id="isComplete">
        <label>Concluído</label>
      </div>
    </div>
  </div>
</template>


<script>
import mixins from './mixins'

export default {
  name: 'Filters',
  mixins: [mixins],
  data() {
    return {
      filterFields: 'isOpen'
    }
  },
  
  methods: {

    // Define o novo valor do filtro globalmente.
    setFilter() {
      this.$store.commit('setFilter', this.filterFields)
      this.loadCurrentTasks()
    }
  }
}

</script>

<style>
  .ui.toggle.checkbox input:checked + label:before {
    background-color: #E04F5F !important;
  }

  .ui.toggle.checkbox input:checked ~ .box:before, .ui.toggle.checkbox input:checked ~ label:before {
    background-color: #E04F5F !important;
  }

  .ui.toggle.checkbox input:checked ~ .box:before, .ui.toggle.checkbox input:checked ~ label:before {
    background-color: #E04F5F !important;
  }

  .ui.toggle.checkbox input:focus:checked ~ .box:before, .ui.toggle.checkbox input:focus:checked ~ label:before {
    background-color: #E04F5F !important;
  }

  #filter{
    text-align: center;
  }
</style>
