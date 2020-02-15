import Vue from 'vue'
import App from './App.vue'
import router from './router'
<%_ if (options.vuex) { _%>
import store from './store'
<%_ } _%>

import toast from '@/components/toast'
import fetchData from '@/assets/js/fetchData'

import filterObj from './filter/index'

Vue.prototype.$toast = toast
Vue.prototype.$fetch = fetchData
Vue.prototype.global = {}
Vue.config.productionTip = false

for (let item in filterObj) {
  Vue.filter(item, filterObj[item])
}

new Vue({
  router,
  <%_ if (options.vuex) { _%>
  store,
  <%_ } _%>
  render: h => h(App)
}).$mount('#app')
