// ******  updated by wangyh ==2019 1.16
import Vue from 'vue'
import Toast from './Index.vue' // 引入组件
let ToastConstructor = Vue.extend(Toast) // 返回一个“扩展实例构造器”
let toastDom
let timer
let init = () => {
  toastDom = new ToastConstructor({
    el: document.createElement('div') // 将toast组件挂载到新创建的div上
  })
  document.body.appendChild(toastDom.$el)
}

/**
 * toast一段时间后消失，time默认2000
 * @param {*} config
 */
let toggle = (config) => {
  let time = config && config.time ? config.time : 1500
  timer && clearInterval(timer)
  show(config)
  timer = setTimeout(() => {
    hide()
  }, time)
}
// show
let show = (config) => {
  if (!toastDom) {
    init()
  } else if (toastDom.isShow) {
    hide()
  }
  if (typeof config === 'string' || typeof config === 'number') {
    config = {
      content: config
    }
  }
  config.content && toastDom.show(config)
}
// disappear
let hide = () => {
  toastDom.hide()
}

export default {
  init,
  toggle,
  show,
  hide
}
