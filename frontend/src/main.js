// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Top from './components/Top'
import Bottom from './components/Bottom'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

new Vue({
  el: '#Top',
  components: { Top },
  template: '<Top/>'
})

new Vue({
  el: '#Bottom',
  components: { Bottom },
  template: '<Bottom/>'
})