<template>
  <div :id='elementId' class='scratchCard'>
    <div class="result" v-show='showResult' @click="clickResult">

      <slot name='result'></slot>
      <img :src="resultImg" alt="" class="pic" />
    </div>
    <canvas v-if="!isEnd" id='scratchCanvas'></canvas>
  </div>
</template>
<script>
export default {
  name: 'vueScratchCard',
  data () {
    return {
      supportTouch: false, // 是否支持touch事件
      events: [], // touch事件 or mouse事件合集
      startMoveHandler: null, // touchstart or mousedown 事件
      moveHandler: null, // touchmove or mousemove 事件
      endMoveHandler: null, // touchend or mouseend 事件
      showResult: false, // 显示隐藏抽奖结果
      firstTouch: true, // 是否第一次touchstart or mousedown
      isEnd: false
    }
  },
  props: {
    canvasRatio: { // 倍率
      type: Number,
      default: 2
    },
    elementId: { // 组件最外层DOM的id属性
      type: String,
      default: 'scratch'
    },
    moveRadius: { // 刮刮范围
      type: Number,
      default: 36
    },
    ratio: { // 要求刮掉的面积占比，达到这个占比后，将会自动把其余区域清除
      type: Number,
      default: 0.5
    },
    startCallback: { // 第一次刮回调函数
      type: Function,
      default: function () {}
    },
    clearCallback: { // 达到ratio占比后的回调函数
      type: Function,
      default: function () {}
    },
    coverColor: { // 刮刮卡遮罩颜色
      type: String,
      default: '#C5C5C5'
    },
    coverImg: { // 刮刮卡遮罩图片
      type: String
    },
    resultImg: { // 中奖的图
      type: String
    }
  },
  mounted: function () {
    this.init()
  },
  methods: {
    init: function (create = true) {
      if (create &&　!this.isSupportCanvas()) {
        this.$toast('当前浏览器不支持canvas')
        return
      }
      this.isEnd = false
      this.firstTouch = true
      this.showResult = false
      this.$nextTick(() => {
        let canvasWrap = document.getElementById(this.elementId)
        this.canvas = canvasWrap.querySelector('#scratchCanvas')
        this.ctx = this.canvas.getContext('2d')
        this.canvas.width = canvasWrap.clientWidth * this.canvasRatio
        this.canvas.height = canvasWrap.clientHeight * this.canvasRatio

        this.createCanvasStyle()
        this.bindEvent()
      })
    },
    isSupportCanvas: function () {
      let elem = document.createElement('canvas')
      return !!(elem.getContext && elem.getContext('2d'))
    },
    createCanvasStyle: function () {
      var _this = this
      // 当传入coverImg时，优先使用图片，否则使用颜色作为刮刮卡遮罩
      if (this.coverImg) {
        let coverImg = new Image()
        coverImg.src = this.coverImg
        coverImg.onload = function () {
          console.log('load')
          _this.ctx.drawImage(coverImg, 0, 0, _this.canvas.width, _this.canvas.height)
        }
      } else {
        _this.ctx.fillStyle = _this.coverColor
        _this.ctx.fillRect(0, 0, _this.canvas.width, _this.canvas.height)
      }
    },
    bindEvent: function () {
      if ('ontouchstart' in window) this.supportTouch = true
      this.events = this.supportTouch ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove',
        'mouseup'
      ]
      this.addEvent()
    },
    addEvent: function () {
      this.startMoveHandler = this.startEventHandler.bind(this)
      this.canvas.addEventListener(this.events[0], this.startMoveHandler, false)
    },
    startEventHandler: function (e) {
      e.preventDefault()

      if (this.firstTouch) {
        this.startCallback()
        this.firstTouch = false
      }
      this.showResult = true
      this.moveHandler = this.moveEventHandler.bind(this)
      this.endMoveHandler = this.endEventHandler.bind(this)
      this.canvas.addEventListener(this.events[1], this.moveHandler, false)
      // document.addEventListener(this.events[2], this.endMoveHandler, false);
      this.canvas.addEventListener(this.events[2], this.endMoveHandler, false)
    },
    moveEventHandler: function (e) {
      e.preventDefault()

      e = this.supportTouch ? e.touches[0] : e

      const canvasPos = this.canvas.getBoundingClientRect()
      const scrollT = document.documentElement.scrollTop || document.body.scrollTop
      const scrollL = document.documentElement.scrollLeft || document.body.scrollLeft
      const mouseX = e.pageX - canvasPos.left - scrollL
      const mouseY = e.pageY - canvasPos.top - scrollT

      this.ctx.beginPath()
      this.ctx.fillStyle = '#FFFFFF'
      this.ctx.globalCompositeOperation = 'destination-out'
      console.log('moveRadius = ', this.moveRadius)
      this.ctx.arc(mouseX * this.canvasRatio, mouseY * this.canvasRatio, this.moveRadius, 0, 2 * Math.PI)
      this.ctx.fill()
    },
    endEventHandler: function (e) {
      e.preventDefault()

      this.canvas.removeEventListener(this.events[1], this.moveHandler, false)
      // document.removeEventListener(this.events[2], this.endMoveHandler, false);
      this.canvas.removeEventListener(this.events[2], this.endMoveHandler, false)
      this.endMoveHandler = null
      this.caleArea()
    },
    clickResult () {
      this.$emit('clickResult')
    },
    caleArea: function () {
      let pixels = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
      let transPixels = []

      pixels.data.map((item, i) => {
        const pixel = pixels.data[i + 3]
        if (pixel === 0) {
          transPixels.push(pixel)
        }
      })

      if (transPixels.length / pixels.data.length > this.ratio) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.canvas.removeEventListener(this.events[0], this.startMoveHandler)
        this.canvas.removeEventListener(this.events[1], this.moveHandler, false)
        // document.removeEventListener(this.events[2], this.endMoveHandler, false);
        this.isEnd = true
        this.clearCallback()
      }
    }
  }
}

</script>
<style lang='scss'>
  .scratchCard {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;

    .result {
      position: absolute;
      width: 90%;
      height: 90%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
    }

    .pic {
      width: 100%;
      height: 100%;
    }

    canvas {
      z-index: 2;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
    }
  }

</style>
