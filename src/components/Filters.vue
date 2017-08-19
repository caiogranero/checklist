<template>
  <div id="filter">
    <div class="item" v-for="filter in filterType" :key="filter.value">
      <div class="ui toggle checkbox">
        <input 
          :v-model="filter.checked"
          :value="filter.value"
          v-on:click="setFilter(filter.value)"
          :id="filter.value"
          :checked="filter.checked"
          type="radio"
          name="filter">
        <label>{{filter.label}}</label>
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
      filterType: [
        {
          label: 'Cancelado',
          value: 'isRemoved',
          checked: false
        },
        {
          label: 'Pendente',
          value: 'isOpen',
          checked: true
        },
        {
          label: 'Concluído',
          value: 'isComplete',
          checked: false
        }
      ]
    }
  },
  
  methods: {

    // Set new filter value in state and load all tasks
    setFilter(filter) {
      this.$store.commit('setFilter', filter)
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
