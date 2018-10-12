// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueSession from 'vue-session'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

//  http통신 axios

Vue.prototype.$http = axios
Vue.config.productionTip = false

//  세션
Vue.use(VueSession)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
