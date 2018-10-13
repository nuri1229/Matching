import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Users from '@/components/Users'
import SignUp from '@/components/SignUp'
import matchingList from '@/components/matchingList'
import portfolioUpload from '@/components/portfolioUpload'
import main from '@/components/main'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: main
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
    },
    {
      path: '/user/portfolio/create',
      name: 'matchingList',
      component: portfolioUpload
    }
  ]
})
