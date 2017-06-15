<template>
  <div class="ui top fixed menu">
    <ui-grid container>
      <ui-row>
        <div class="item">
          <router-link id="logo" :to="'/'" tag="img" :src="require('../assets/logo.png')"></router-link>
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
</template>


<script>

  import { Mixin } from 'semantic-ui-vue2';

  export default {
    mixins: [Mixin]
  };

</script>

<style>

  #logo {
    cursor: pointer;
  }

</style>
