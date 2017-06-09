<template>
  <div id="app">
    <div class="ui top fixed menu">
      <ui-grid container>
        <ui-row>
          <div class="item">
            <img src="./assets/logo.png">
          </div>
          <div class="right menu">
            <a class="item"><i class="large add to calendar icon"></i></a>
            <a class="item"><i class="large alarm icon"></i></a>
            <a class="item"><i class="large plus icon"></i></a>
            <a class="item"><i class="large setting icon"></i></a>
          </div>
        </ui-row>
      </ui-grid>
    </div>
     <ui-grid container>
      <ui-row>
        <ui-column class="four wide" id="side-bar-column">
          <div class="ui small vertical menu" id="side-bar">
            <a class="item">
              <div class="ui icon input">
                <input type="text" placeholder="Encontrar tarefa">
                <i class="search icon"></i>
              </div>
            </a>
            <a class="item">
              <div class="ui small label">3</div>
              <i class="large calendar outline icon"></i> Hoje
            </a>
            <a class="item">
              <div class="ui small teal label">13</div>
              <i class="large calendar icon"></i> Próximos 7 dias
            </a>
            <div class="item">
              <div class="ui small label">27</div>
              Neste mês
            </div>
          </div>
        </ui-column>
        <ui-column class="eleven wide" id="content-div">
          <router-view></router-view>
        </ui-column>
      </ui-row>
    </ui-grid>
  </div>
</template>

<script>

import { Mixin } from 'semantic-ui-vue2';

export default {
  name: 'app',
  mixins: [Mixin],
};

</script>

<style>

#content-div{
  margin-top: 40px;
}

#app {
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 0px;*/
}

.ui.vertical.menu .item:before, .ui.menu .item:before {
    background: #FFF;
}

#side-bar {
  text-align: left;
  background: #FFF;
  margin-top: 40px;
  height: 100%;
  border: none;
  box-shadow: none;
}

.ui.small.vertical.menu {
    width: 16rem;
    position: fixed;
}


i:hover, a > i:hover {
  color: #E04F5F;
}

.ui.teal.label, .ui.teal.labels .label {
    background-color: #E04F5F!important;
    border-color: #E04F5F!important;
    color: #FFF!important;
}
</style>
