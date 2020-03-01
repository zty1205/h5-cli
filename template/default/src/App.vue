<template>
  <div id="app">
    <!-- <keep-alive> -->
      <router-view/>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
/* eslint-disable no-undef */
// import eruda from 'eruda'
// eruda.init()
import { setRem, fixRem } from "./assets/utils"
setRem(750)
export default {
  mounted  () {
    fixRem()
  }
}
</script>

<style lang="scss">
@import url('./assets/css/common.css');
  html,
  body {
    height: 100%;
    width: 100%;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
    // background: #221848;
  }

.page {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow-x: hidden;

    img {
      border: 0 none;
      max-width: 100%;
      vertical-align: top;
      pointer-events: none;
    }
  }

.toast-g {
  top: 7rem !important;
  z-index: 9999 !important;
  min-height: 20px !important;
}
</style>
