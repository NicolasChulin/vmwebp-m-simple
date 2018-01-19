// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueLocalStorage from 'vue-ls'
import VueLazyload from 'vue-lazyload'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css'

import App from './App'
import router from './router'
import GLOBAL from './config'
import layout from '@/assets/plugins/layout/layout'

Vue.config.productionTip = false
Vue.use(VueLocalStorage)
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload, {
  attempt: 2
  // loading: '/static/images/img-loading.png'
})
Vue.prototype.GLOBAL = GLOBAL
Vue.use(layout)

/* axios.interceptors */
var requeen = []
var sett = ''
axios.interceptors.request.use(function (config) {
  if (requeen.length === 0) {
    sett = setTimeout(function () {
      Vue.$layout.loading()
    }, 200)
  }
  requeen.push(Math.random())

  if (config.url.indexOf('http://') < 0) {
    config.url = GLOBAL.domain + config.url
  }

  config.timeout = 10 * 1000
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  if (requeen.length) requeen.shift()
  if (requeen.length === 0) {
    if (sett) clearTimeout(sett)
    Vue.$layout.loadingHide()
  }
  if (response.status === 200 && response.data && response.data.code === 403) {
    Vue.$layout.msg('会话已过期，请重新登录！')
    // router.push({name: 'Login'})
  } else {
    return response
  }
}, function (error) {
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

/* regist routes hook */
// let noLogin = [
//   'Login', 'Register', 'ForgetPswd', 'Index'
// ]
// router.beforeEach((to, from, next) => {
//   var token = Vue.ls.get('memberToken')
//   if (token) {
//     next()
//   } else {
//     if (noLogin.indexOf(to.name) > -1) {
//       next()
//     } else {
//       next('Login')
//     }
//   }
// })
