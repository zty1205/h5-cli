<template>
    <div class="shadow" @click="closeShadow($event)" @touchmove.prevent :style='`opacity: rgba(0, 0, 0, ${opacity})`' @dblclick.prevent="dblclick">
        <!-- 默认居中处理 -->
        <div class="shadow-content">
            <slot></slot>
        </div>
        <!-- 无样式附加 -->
        <slot name="normal"></slot>
    </div>
</template>
<script>
export default {
  name: 'Shadow',
  data () {
    return {
    }
  },
  props: {
    scrollClass: {
      type: String
    },
    opacity: {
      default: '0.7',
      type: String
    }
  },
  methods: {
    closeShadow (e) {
      this.$emit('closeShadow', e)
    },
    dblclick (e) {
      e && e.stopPropagation && e.stopPropagation()
      e && e.preventDefault && e.preventDefault()
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
    .shadow {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        z-index: 299;
        .shadow-content {
            position: fixed;
            top: 48%;
            transform: translate3d(0, -50%, 0);
            -webkit-transform: translate3d(0, -50%, 0);
            width: 100%;
        }
    }
</style>
