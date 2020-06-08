// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "@babel/polyfill"
import Vue from 'vue'
import * as log from 'loglevel'
import App from './App'
import router from './router'
import store from './store'
import ECharts from 'vue-echarts'
import echarts from 'echarts'
import srMap from './assets/SR.json'
import layer from 'vue-layer'

Vue.config.productionTip = false
Vue.prototype.$layer = layer(Vue)
Vue.component('chart', ECharts)
Vue.prototype.$echarts = echarts
ECharts.registerMap('shangrao', srMap)
log.setLevel(process.env.NODE_ENV !== 'production' ? 'trace' : 'error')
window.log = log

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
