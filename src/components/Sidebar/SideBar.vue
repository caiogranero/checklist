<template>
  <div class="ui small vertical menu" id="side-bar">
    <a class="item">
      <div class="ui icon input">
        <input type="text" placeholder="Encontrar tarefa">
        <i class="search icon"></i>
      </div>
    </a>
    <period-filter></period-filter>
    <div class="ui divider"></div>
    <status-filter></status-filter>
  </div>
</template>


<script>

// TODO: Make search work

import StatusFilter from '@/components/Sidebar/StatusFilter'
import PeriodFilter from '@/components/Sidebar/PeriodFilter'
import mixins from '@/components/mixins'

export default {
  name: 'SideBar',
  components: {
    StatusFilter,
    PeriodFilter
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
