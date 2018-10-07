import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

import mainpage from '@/components/mainpage'
import User from '@/components/User'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'mainpage',
      component: mainpage
    },
    {
      path: '/matching/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ]
})
