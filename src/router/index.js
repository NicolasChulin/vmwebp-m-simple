import Vue from 'vue'
import Router from 'vue-router'
/* components */
import Index from '@/views/Index'
/* router-array */
import Account from '@/router/account'

Vue.use(Router)

let routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  }
]
routes.push(...[
  ...Account
])

export default new Router({
  routes
})
