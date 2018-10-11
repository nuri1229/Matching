import Vue from 'vue'
import Router from 'vue-router'
import mainpage from '@/components/mainpage'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Users from '@/components/Users'
import SignUp from '@/components/SignUp'
import matchingList from '@/components/matchingList'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    },
    {
      path: '/admin/Users',
      name: 'Users',
      component: Users
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/matching/list',
      name: 'matchingList',
      component: matchingList
    }
  ]
})
