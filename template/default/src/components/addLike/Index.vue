<template>
  <transition name="like">
    <div class="heart-icon" v-if="showHeart">
      <img src="@/assets/img/like.png" alt>
    </div>
  </transition>
</template>

<script>
export default {
  data: function() {
    return {
      showHeart: false
    };
  },
  methods: {
    addLike(time) {
      this.showHeart = true;
      setTimeout(() => {
        this.showHeart = false;
      }, time);
    }
  }
};
</script>

<style lang="scss">
// 点赞过渡动画
.like-enter {
  opacity: 0;
  transform: scale(0.2);
}

.like-enter-to {
  opacity: 1;
  transform: scale(1);
}

.like-enter-active {
    transition: all 0.4s ease-out;
}
.like-leave {
  opacity: 1;
  transform: scale(1);
}
.like-leave-to {
  transform: scale(0.3);
  opacity: 0;
}
.like-leave-active {
  transition: all 0.4s ease-in;
}
.heart-icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
