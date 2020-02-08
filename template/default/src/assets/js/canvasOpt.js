import Hammer from 'hammerjs'
class CanvasOpt {
  /**
     * 操作实例
     * @param {*} canvas 画布
     * @param {*} startX 绘制起始横坐标
     * @param {*} startY 绘制起始纵坐标
     * @param {*} dpr  canvas像素比
     */
  constructor (canvas, img, startX, startY, dpr, cover, initCb) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.dpr = dpr
    this.startX = startX
    this.startY = startY
    this.width = null
    this.height = null
    this.img = img
    this.rectWidth = null
    this.initCb = initCb
    this.cover = cover
    this.bindOpt()
    this.initCanvas()
  }
  // 初始化
  initCanvas () {
    let canvas = this.canvas
    let dpr = this.dpr
    let ctx = this.ctx
    let offsetX = canvas.offsetWidth
    let offsetY = canvas.offsetHeight
    let canvasWidth = this.canvasWidth = offsetX * dpr
    let canvasHeight = this.canvasHeight = offsetY * dpr
    let img = this.img
    let width = img.width
    let height = img.height
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    let rectWidth = this.rectWidth = Math.max(canvasWidth, canvasHeight)
    if (width <= height) {
      let scale = offsetX / width
      this.width = offsetX
      this.height = height * scale
      this.startX = 0
      this.startY = (offsetY - this.height) / 2
    } else {
      let scale = offsetY / height
      this.height = offsetY
      this.width = width * scale
      this.startY = 0
      this.startX = (offsetX - this.width) / 2
    }
    requestAnimationFrame(() => {
      this.drawImage(this.img)
    })
    this.initCb && this.initCb()
  }
  // 绘制图片
  drawImage (img, x = 0, y = 0, scale = 1) {
    let ctx = this.ctx
    let width = this.width
    let height = this.height
    let dpr = this.dpr
    let rectWidth = this.rectWidth
    if (scale != 1) {
      if (scale > 1) {
        this.startX -= (scale - 1) * width / 2
        this.startY -= (scale - 1) * height / 2
      } else {
        this.startX += (1 - scale) * width / 2
        this.startY += (1 - scale) * height / 2
      }
      this.width *= scale
      this.height *= scale
    } else {
      this.startX += x
      this.startY += y
    }
    width = this.width * dpr
    height = this.height * dpr
    let startX = this.startX * dpr
    let startY = this.startY * dpr
    ctx.clearRect(0, 0, rectWidth, rectWidth)
    ctx.drawImage(img, startX, startY, width, height)
  }
  // 绑定手势事件
  bindOpt () {
    this.hammer = new Hammer(this.cover)
    this.bindPinch()
    this.bindPan()
    // this.bindRotate();
  }
  // 双指缩放
  bindPinch () {
    let hammer = this.hammer
    hammer.get('pinch').set({ enable: true })
    let lastScale
    hammer.on('pinchstart', (e) => {
      lastScale = e.scale
    })
    hammer.on('pinchmove', (e) => {
      let nowScale = e.scale
      let disScale = nowScale - lastScale
      this.drawImage(this.img, 0, 0, 1 + disScale)
      lastScale = nowScale
    })
  }
  // 移动
  bindPan () {
    let hammer = this.hammer
    let lastX,
      lastY
    hammer.on('panstart', (e) => {
      let center = e.center
      lastX = center.x
      lastY = center.y
    })
    hammer.on('panmove', (e) => {
      let center = e.center
      let centerX = center.x
      let centerY = center.y
      let x = centerX - lastX
      let y = centerY - lastY
      this.drawImage(this.img, x, y, 1)
      lastX = centerX
      lastY = centerY
    })
  }
  // 裁剪圆形图片
  cropCircleImage () {
    let promise = new Promise((resolve, reject) => {
      let width = this.width
      let height = this.height
      let rectWidth = this.rectWidth
      let r = rectWidth / 2
      let dpr = this.dpr
      let ctx = this.ctx
      ctx.clearRect(0, 0, rectWidth, rectWidth)
      // ctx.rect(0, 0, 2 *r, 2 * r);
      ctx.arc(r, r, r, 0, Math.PI * 2)
      ctx.clip()
      ctx.drawImage(this.img, this.startX * dpr, this.startY * dpr, width * dpr, height * dpr)
      resolve(this.canvas)
    })
    return promise
  }
  // 清空画布
  clear (clearEevent) {
    let ctx = this.ctx
    let rectWidth = this.rectWidth
    ctx.clearRect(0, 0, rectWidth, rectWidth)
    clearEevent && this.offBind()
  }
  // 解绑事件
  offBind () {
    this.hammer.remove('pinch')
    this.hammer.remove('pan')
  }
}

export default CanvasOpt
