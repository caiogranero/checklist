<template>
  <div id="filter">
    <div class="item">
      <div class="ui toggle checkbox">
        <input type="checkbox" name="isOpen" v-model="filterFields.isOpen" v-on:click="setFilter()" id="isOpen" checked>
        <label>Pendente</label>
      </div>
    </div>
    <div class="item">
      <div class="ui toggle checkbox">
        <input type="checkbox" name="isComplete" v-model="filterFields.isComplete" v-on:click="setFilter()" id="isComplete">
        <label>Concluído</label>
      </div>
    </div>
    <div class="item">
      <div class="ui toggle checkbox">
        <input type="checkbox" name="isRemoved" v-model="filterFields.isRemoved" v-on:click="setFilter()" id="isRemoved">
        <label>Cancelado</label>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'Filters',
  data() {
    return {
      filterFields: {
        isOpen: true,
        isComplete: false,
        isRemoved: false
      }
    };
  },
  methods: {
    setFilter: function() {
      console.log(this);
    }
  }
};


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
