<template>
  <div id="app">
    <keep-alive include="wishs,poster" exclude="try,index,turntable,detail,award,fillout,final">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
/* eslint-disable no-undef */
// import html2canvas from 'html2canvas'
// import eruda from 'eruda'
// eruda.init()
function setRem (pageSize) {
  let wWidth = window.innerWidth || document.body.clientWidth || document.documentElement.clientWidth
  document.getElementsByTagName('html')[0].style.fontSize = wWidth / pageSize * 100 + 'px'
}
function fixRem() {
  let html = document.getElementsByTagName("html")[0];
  let originFontSize = parseFloat(html.style.fontSize);
  let hideDom = document.createElement("div");
  document.body.appendChild(hideDom);
  hideDom.style.cssText = "position: absolute; top: -10000px; left: -10000px; width: 1rem";
  let currentWidth = parseFloat(hideDom.offsetWidth);
  if (currentWidth != originFontSize) {
    html.style.fontSize = originFontSize / currentWidth * originFontSize + "px";
  }
  hideDom.parentElement.removeChild(hideDom);
}
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
    // background: url('../assets/img/bg_index_repeat.jpg') repeat-y 50%;
    // background-size: 100%;
  }

  body {
    font-size: 16px;
    font-family: SourceHanSansCN;
  }

  img {
    pointer-events: none;
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
    }
  }

.toast-g {
  top: 7rem !important;
  z-index: 9999 !important;
  min-height: 20px !important;
}
</style>
