<template>
  <div class="page">
    首页
  </div>
</template>

<script>
export default {
  name: 'index',
  provide () {
    return {

    }
  },
  components: {},
  data () {
    return {
    }
  },
  filters: {
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  beforeRouteLeave (to, from, next) {
    next()
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.page {
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
