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

import Filters from './Filters'
import mixins from './mixins'

export default {
  name: 'SideBar',
  data() {
    return {
      sidebar: {
        qttToday: null,
        qttWeek: null,
        qttMonth: null
      }
    }
  },
  mixins: [mixins],
  components: {
    Filters
  },
  watch: {
    '$route' () {
      this.getQttMonth()
      this.getQttWeek()
      this.getQttToday()
    }
  },
  mounted: function() {
    this.getQttMonth()
    this.getQttWeek()
    this.getQttToday()
  },
  methods: {
    showTasks (period) {
      this.$router.push({
        name: 'Tasks',
        params: {
          period: period
        }
      })
    },

    // Count the qtt of task in current month, based on filters and insert in sidebar
    getQttMonth () {

      let params = {
      }

      params[this.$store.state.filter] = true

      const tasks = this.GetRequestTask(params)

      tasks.then((response) => {
        this.sidebar.qttMonth = response.data.length
      })
    },

    // Count the qtt of task in current day, based on filters and insert in sidebar
    getQttToday () {

      let params = {
      }

      params[this.$store.state.filter] = true

      const tasks = this.GetRequestTask(params)

      tasks.then((response) => {
        this.sidebar.qttToday = response.data.length
      })
    },

    // Count the qtt of task in current week, based on filters and insert in sidebar
    getQttWeek () {

      let params = {
      }

      params[this.$store.state.filter] = true

      const tasks = this.GetRequestTask(params)

      tasks.then((response) => {
        this.sidebar.qttWeek = response.data.length
      })
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

  #id {
    text-align: center;
  }
</style>
