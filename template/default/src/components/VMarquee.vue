<!-- 跑马灯 -->
<template>
  <div class="marquee_container">
    <div class="marquee_icon">
      <img src="@/assets/img/index/marquee_icon.png" alt="">
    </div>
    <div class="marquee_wrap" ref="marquee" :class="{'marquee_start': isStart}">
      <div class="marquee_item">{{itemContent1}}</div>
      <div class="marquee_item">{{itemContent2}}</div>
    </div>
  </div>
</template>

<script>
import marquee from '@/assets/js/marquee'
export default {
  name: 'VMarquee', // 跑马灯
  data () {
    return {
      list: marquee,
      itemContent1: '',
      itemContent2: '',
      index: 0,
      isStart: false,
      isInit: false,
      orderType: 'order'
    }
  },
  props: {
    // 跑马灯类型： 1.order 顺序； 2.random 随机
    type: {
      default: 'random',
      type: String
    },
    // 数据
    data: {
      default: null,
      type: Array
    },
    // 指定开始的索引，order类型时生效
    start: {
      default: 0,
      type: Number
    },
    // 跑马灯停留速度
    delay: {
      default: 1000,
      type: Number
    }
  },
  created () {
    this.$fetch.post({
      url: 'api/event/internal/h5/content/get',
      data: ['fdf244c4c8e56ea498714aa17558cf17']
    }).then(res => {
      this.list = marquee.concat((res.list || []).map(x => x.description))
      let list = this.list
      // console.log('list = ', list)
      let len = list.length
      if (len < 2) {
        return
      }
      let orderType = this.type
      if (len === 2) {
        orderType = 'order'
      }
      this.orderType = orderType
      if (orderType === 'random') {
        this.itemContent1 = list[this.randomInt(0, len - 1)]
        this.getRandom()
      } else {
        let index = this.start
        this.itemContent1 = list[index]
        this.index++
        this.itemContent2 = list[this.index]
      }
    }).catch(err => {
      console.log('initTextFlow = err', err)
    })
  },
  mounted () {
    setTimeout(() => {
      let marquee = this.$refs.marquee
      if (this.orderType && this.orderType === 'random') {
        marquee.addEventListener('transitionend', () => {
          this.onTransitionEndRandom()
        })
        marquee.addEventListener('webkitTransitionEnd', () => {
          this.onTransitionEndRandom()
        })
      } else {
        marquee.addEventListener('transitionend', () => {
          this.onTransitionEndOrder()
        })
        marquee.addEventListener('webkitTransitionEnd', () => {
          this.onTransitionEndOrder()
        })
      }
      this.run()
    }, 50)
  },
  methods: {
    // 开始
    run () {
      this.$nextTick(() => {
        if (this.isInit) {
          this.isStart = true
        } else {
          setTimeout(() => {
            this.isStart = true
            this.isInit = true
          }, 1000)
        }
      })
    },
    // 获得随机整数
    randomInt (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    // 随机
    onTransitionEndRandom () {
      this.itemContent1 = this.itemContent2
      this.getRandom()
      this.isStart = false
      setTimeout(this.run, this.delay)
    },
    // 顺序
    onTransitionEndOrder () {
      this.itemContent1 = this.itemContent2
      let index = this.index
      if (index >= this.list.length - 1) {
        this.index = 0
      } else {
        this.index++
      }
      this.itemContent2 = this.list[this.index]
      this.isStart = false
      setTimeout(this.run, this.delay)
    },
    // 获取下一个随机值
    getRandom () {
      let list = this.list
      let len = this.list.length
      let index
      let itemContent1 = this.itemContent1
      // 确保随机值和之前的不一致
      while (!index || list[index] === itemContent1) {
        index = this.randomInt(0, len - 1)
      }
      this.itemContent2 = list[index]
    }
  }
}

</script>
<style lang='scss' rel='stylesheet/scss' scoped>
  .marquee_container {
    position: relative;
    top: .24rem;
    left: 50%;
    width: 6.9rem;
    height: .56rem;
    transform: translateX(-50%);
    background: #be392e;
    overflow: hidden;
    border-radius: 23px;
    font-family: 'PingFangSC', 'SourceHanSansCN';

    & .marquee_icon {
      width: .4rem;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: .4rem;
    }

    & .marquee_wrap {
      position: absolute;
      left: 1rem;
      top: 0;
      width: 100%;
      height: 200%;

      &.marquee_start {
        transition: transform 1s;
        -webkit-transition: transform 1s;
        transform: translate3d(0, -50%, 0);
        -webkit-transform: translate3d(0, -50%, 0);
      }

      & .marquee_item {
        line-height: normal;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-family: SourceHanSansCN Normal;
        width: 100%;
        height: .56rem;
        font-size: .22rem;
        color: #FFFFFF;
      }
    }
  }

</style>
