<template>
  <div id="period-filter">
    <a class="item" v-on:click="showTasks(option.route)" v-for="option in options" :key="option.route">
      <div class="ui small label">{{option.qtt}}</div>
      <i :class="option.icon"></i> {{option.label}}
    </a>
  </div>
</template>

<script>
import mixins from '@/components/mixins'

export default {
  name: 'PeriodFilter',
  data() {
    return {
      options: [
        {
          qtt: 0,
          label: 'Hoje',
          route: 'today',
          icon: 'large calendar outline icon'
        },
        {
          qtt: 0,
          label: 'Próximos 7 dias',
          route: 'week',
          icon: 'large calendar icon'
        },
        {
          qtt: 0,
          label: 'Neste mês',
          route: 'month',
          icon: 'large calendar icon'
        }
      ]
    }
  },
  mixins: [mixins],
  watch: {
    '$route' () { //Every time the route change, calculate qtt task
      this.calcQttTask()
    }
  },
  created: function() {
    this.calcQttTask()
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
    // TODO: Need to calculate per period
    // Count the qtt of task per period, based on filters and insert in sidebar
    calcQttTask () {

      let params = {
      }

      params[this.$store.state.filter] = true

      const tasks = this.GetRequestTask(params)

      tasks.then((response) => {
        this.options[0].qtt = response.data.length
        this.options[1].qtt = response.data.length
        this.options[2].qtt = response.data.length
      })
    }
  }
}


</script>


<style>
  .ui.vertical.menu .item:before, .ui.menu .item:before {
      background: #FFF;
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
