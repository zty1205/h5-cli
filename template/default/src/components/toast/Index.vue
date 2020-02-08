<template>
  <transition name="fade">
    <div v-show="isShow" class="toast-con">
      <div class="toast-content">{{content}}</div>
    </div>
  </transition>
</template>

<script>
export default {
  data: function () {
    return {
      content: '',
      isShow: false
      // toastWidth: '47%'
    }
  },
  methods: {
    show ({ content }) {
      // this.toastWidth = width;
      this.content = content
      this.isShow = true
    },
    hide () {
      this.isShow = false
    }
  }
}
</script>

<style scoped>
  /*toast*/
  .toast-con {
    position: absolute;
    top: 7rem;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    background: rgba(0, 0, 0, .6);
    color: #fff;
    font-size: .28rem;
    line-height: 1.5em;
    min-width: 40%;
    width: auto;
    padding: .18rem;
    text-align: center;
    border-radius: 1.5rem;
    z-index: 9999;
  }
  .toast-content {
    white-space: nowrap;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease-out;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    transform: translate3d(-50%, 0, 0) scale3d(.8, .8, 1);
    transform-origin: center center;
  }
</style>
