import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const resourceHost = 'http://localhost:8080'

export default new Vuex.Store({
  state: {
    accessToken: null
  },
  getters: {

  },
  mutations: {
    LOGIN (state, accessToken) {
      //alert('LOGIN mutations')
     //alert(accessToken)
      state.accessToken = accessToken.jwt
      console.log(state.accessToken)
    },
    LOGOUT (state) {
      state.accessToken = null
    }
  },
  actions: {
    LOGIN ({commit}, {userId, userPw}) {
      alert('Login Action')
      console.log({userId, userPw})
      //alert('userId:' + user_json.userId + ' pw:' + user_json.userPw)
      //console.log({email, password})
      //alert({email, password})
      //console.log({commit})
      return axios.post('/api/Login', {
        'user_id': userId, 'user_pw': userPw
      }).then((res) => {
        var result = res.data
        console.log(result.user_info)
        commit('LOGIN', result.user_info)
      })
      /*
      return axios.post(`${resourceHost}/login`, {email, password})
        .then(({data}) => commit('LOGIN', data))
      */
    }
    /*
    ,
    LOGOUT ({commit}) {
      commit('LOGOUT')
    }
    */
  }
})
