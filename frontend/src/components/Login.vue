<template>
  <div id="Login">
      <div id="first-block">
          <div class="line">
              <div class="margin">
                  <div class="s-12 m-12 l-4 margin-bottom" />
                  <div class="s-12 m-12 l-4 margin-bottom" style="border:1px solid #F0F0F0">
                      <h3>LOGIN</h3>
                      <hr>
                      <span>ID </span><span class="searchButton" @click="modalControl1()">Forgot Your ID?</span>
                      <modal v-if="searchIdModal" @close="searchIdModal = false" >
                        <div style="width: 100%; padding:20px 0px 20px 0px;">
                          <input type="text" class="form-control modal-input" placeholder="성명을 입력하세요" v-model="user_name"/>
                          <input type="text" class="form-control modal-input" placeholder="가입시 사용한 이메일주소를 입력하세요" v-model="user_email"/>
                          <button class="btn btn-primary modal-button" @click="searchId(user_name,user_email)">아이디찾기</button>
                        </div>
                      </modal>
                      <input type="text" class="form-control main-input" placeholder="ID를 입력하세요" v-model="user_id" />
                      <span>Password </span><span class="searchButton" @click="modalControl2()">Forgot Your Password?</span>
                      <modal v-if="searchPwModal" @close="searchPwModal = false" >
                        <div style="width: 100%; padding:20px 0px 20px 0px;">
                          <input type="text" class="form-control modal-input" placeholder="아이디를 입력하세요" v-model="user_id"/>
                          <input type="text" class="form-control modal-input" placeholder="성명을 입력하세요" v-model="user_name"/>
                          <input type="text" class="form-control modal-input" placeholder="가입시 사용한 이메일주소를 입력하세요" v-model="user_email"/>
                          <button class="btn btn-primary modal-button" @click="searchPw(user_id,user_name,user_email)">비밀번호찾기</button>
                        </div>
                      </modal>
                      <input type="text" class="form-control main-input" placeholder="패스워드를 입력하세요" v-model="user_pw" />
                      <button class="btn btn-default" id="SignIn" @click="fn_login(user_id, user_pw)">Sign In</button>
                      <button class="btn btn-success" id="SignUp" @click="fn_signUp()">Sign Up</button>
                  </div>
                  <div class="s-12 m-12 l-4 margin-bottom" />
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    fn_login (userId, userPw) {
      this.$http.defaults.headers.post['Content-Type'] = 'application/json'
      this.$http.post('/api/Login', {
        'user_id': userId, 'user_pw': userPw
      }).then((res) => {
        var result = res.data
        if (result.message === 'success') {
          this.$session.start()
          this.$session.set('user_info', result.user_info)
          this.$router.replace(this.$route.query.redirect || '/')
        } else {
          alert('Login Failed')
        }
      })
    },
    modalControl1 () {
      if (this.searchIdModal) {
        this.searchIdModal = false
      } else {
        this.searchIdModal = true
      }
    },
    modalControl2 () {
      if (this.searchPwModal) {
        this.searchPwModal = false
      } else {
        this.searchPwModal = true
      }
    },
    searchId (userName, userEmail) {
      this.$http.defaults.headers.post['Content-Type'] = 'application/json'
      this.$http.post('/api/Login/ForgotYourId', {
        'user_name': userName, 'user_email': userEmail
      }).then((res) => {
        alert(res.data)
      })
    },
    searchPw (userId, userName, userEmail) {
      this.$http.defaults.headers.post['Content-Type'] = 'application/json'
      this.$http.post('/api/Login/ForgotYourPw', {
        'user_name': userName, 'user_email': userEmail, 'user_id': userId
      }).then((res) => {
        alert(res.data)
      })
    },
    fn_signUp () {
      this.$router.replace(this.$route.query.redirect || '/SignUp')
    }
  },
  data () {
    return {
      searchIdModal: false,
      searchPwModal: false,
      user_id: '',
      user_pw: '',
      user_name: '',
      user_email: ''
    }
  }
}
</script>

<style scoped>
.main-input {
  margin-bottom: 20px;
}
#SignIn {
  background: #152732;
  width: 100%;
  border: 1px solid #152732;
  color: white;
  margin-bottom: 5px;
}
#SignUp {
  width: 100%;
  margin-bottom: 30px;
}
h3 {
  margin-top: 30px;
}
span {
  font-size: 22px;
}
.searchButton {
  font-size: 13px;
  color: #0056b3;
}
.modal-input {
  margin-bottom: 5px;
}
.modal-button {
  width: 100%;
}
</style>
