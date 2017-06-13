<template>
  <div class="ui small vertical menu" id="side-bar">
    <a class="item">
      <div class="ui icon input">
        <input type="text" placeholder="Encontrar tarefa">
        <i class="search icon"></i>
      </div>
    </a>
    <a class="item" v-on:click="showTasks('today')">
      <div class="ui small label">3</div>
      <i class="large calendar outline icon"></i> Hoje
    </a>
    <a class="item" v-on:click="showTasks('week')">
      <div class="ui small teal label">13</div>
      <i class="large calendar icon"></i> Próximos 7 dias
    </a>
    <a class="item" v-on:click="showTasks('month')">
      <div class="ui small label">27</div> Neste mês
    </a>
  </div>
</template>

<script>

export default {
  name: 'SideBar',
  methods:{
    showTasks : function(period){
      this.$router.push({
        name: 'Tasks', params: {
          period: period
        }
      });
    }
  }
}

</script>


<style>
  .ui.vertical.menu .item:before, .ui.menu .item:before {
      background: #FFF;
  }

  #side-bar {
    text-align: left;
    background: #FFF;
    height: 100%;
    border: none;
    box-shadow: none;
  }

  .ui.small.vertical.menu {
    width: 16rem;
    position: fixed;
  }

  .ui.teal.label, .ui.teal.labels .label {
    background-color: #E04F5F!important;
    border-color: #E04F5F!important;
    color: #FFF!important;
  }
</style>
