import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Users from '@/components/Users'
import SignUp from '@/components/SignUp'
import matchingList from '@/components/matchingList'
import portfolioUpload from '@/components/portfolioUpload'
import main from '@/components/main'
import portfolioDetail from '@/components/portfolioDetail'
import reply from '@/components/reply'

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
      name: 'portfolioUpload',
      component: portfolioUpload
    },
    {
      path: '/matching/view',
      name: 'portfolioDetail',
      component: portfolioDetail
    },
    {
      path: '/user/matching/reply/list',
      name: 'reply',
      component: reply
    }
  ]
})
