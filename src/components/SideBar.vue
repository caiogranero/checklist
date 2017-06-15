<template>
  <div class="ui small vertical menu" id="side-bar">
    <a class="item">
      <div class="ui icon input">
        <input type="text" placeholder="Encontrar tarefa">
        <i class="search icon"></i>
      </div>
    </a>
    <a class="item" v-on:click="showTasks('today')">
      <div class="ui small label">{{sidebar.qttToday}}</div>
      <i class="large calendar outline icon"></i> Hoje
    </a>
    <a class="item" v-on:click="showTasks('week')">
      <div class="ui small teal label">{{sidebar.qttWeek}}</div>
      <i class="large calendar icon"></i> Próximos 7 dias
    </a>
    <a class="item" v-on:click="showTasks('month')">
      <div class="ui small label">{{sidebar.qttMonth}}</div> Neste mês
    </a>
    <div class="ui divider"></div>
    <filters></filters>
  </div>
</template>


<script>

  import Filters from './Filters';
  const moment = require('moment');

  export default {
    name: 'SideBar',
    data() {
      return {
        sidebar: {
          qttToday: null,
          qttWeek: null,
          qttMonth: null
        }
      };
    },
    components: {
      Filters
    },
    mounted: function() {
      this.getQttMonth();
      this.getQttWeek();
      this.getQttToday();
    },
    methods: {
      showTasks: function(period) {
        this.$router.push({
          name: 'Tasks',
          params: {
            period: period
          }
        });
      },

      getQttMonth: function() {

        let params = {
          isOpen: true,
          task_month: moment().month().toString()
        };

        const tasks = this.GetRequestTask(params);

        tasks.then(function(response) {
          this.sidebar.qttMonth = response.data.length;
        });
      },

      getQttToday: function() {

        let params = {
          isOpen: true,
          task_date: moment().startOf('day').format()
        };

        const tasks = this.GetRequestTask(params);

        tasks.then(function(response) {
          this.sidebar.qttToday = response.data.length;
        });
      },

      getQttWeek: function() {

        let params = {
          isOpen: true,
          task_week: moment().week().toString()
        };

        const tasks = this.GetRequestTask(params);

        tasks.then(function(response) {
          this.sidebar.qttWeek = response.data.length;
        });
      }
    }
  };


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

  #id {
    text-align: center;
  }
</style>
