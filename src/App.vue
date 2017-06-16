<template>
  <div id="app">
    <div class="header">
      <header-bar></header-bar>
    </div>
    <ui-grid container id="main">
      <ui-row>
        <ui-column class="four wide" id="side-bar-column">
          <side-bar></side-bar>
        </ui-column>
        <ui-column class="twelve wide" id="content-div">
          <router-view></router-view>
        </ui-column>
      </ui-row>
    </ui-grid>
    <footer>
      <center>
        <p> <i class="trophy icon"></i> Made by <a target="_blank" href="https://github.com/caiogranero">caiogranero</a></p>
      </center>
    </footer>
  </div>
</template>

<script>

import { Mixin } from 'semantic-ui-vue2';
import HeaderBar from './components/HeaderBar';
import SideBar from './components/SideBar';

export default {
  name: 'app',
  components: {
    HeaderBar,
    SideBar
  },
  mixins: [Mixin],
};

</script>

<style>

#main{
  margin-top: 80px;
}

#app {
  color: #2c3e50;
}

i:hover, a > i:hover {
  color: #E04F5F;
}

i {
  cursor: pointer;
}

html, body{
  height: 100%
}

footer {
  position:fixed;
  bottom:50px;
  width:100%;
  height:10px;
  font: 12px;
}

</style>
