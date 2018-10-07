<template>
  <div id="Login">
      <div id="first-block">
          <div class="line">
              <div class="margin">
                  <div class="s-12 m-12 l-4 margin-bottom" />
                  <div class="s-12 m-12 l-4 margin-bottom" style="border:1px solid #F0F0F0">
                      <h3>LOGIN</h3>
                      <hr>
                      <span>ID </span><a href="#">Forgot Your ID?</a>
                      <input type="text" class="form-control" placeholder="ID를 입력하세요" v-model="user_id" />
                      <span>Password</span> <a href="#">Forgot Your Password?</a>
                      <input type="text" class="form-control" placeholder="패스워드를 입력하세요" v-model="user_pw" />
                      <button class="btn btn-default" id="SignIn" @click="fn_login(user_id, user_pw)">Sign In</button>
                      <button class="btn btn-success" id="SignUp">Sign Up</button>
                  </div>
                  <div class="s-12 m-12 l-4 margin-bottom" />
              </div>
          </div>
      </div>
  </div>
</template>

<script scoped>
export default {
  name: 'Login',
  methods: {
    fn_login(user_id, user_pw) {
      this.$http.defaults.headers.post['Content-Type'] = 'application/json'
      this.$http.post('/api/Login', {
        'user_id': user_id, 'user_pw': user_pw
      }).then((res) => {
        var result = res.data
        if (result === 1) {
          alert('Login Success')
          location.href = ('/')
        } else {
          alert('Login Failed')
        }
      })
    }
  }
}
</script>

<style scoped>
input {
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
a {
  color: #0056b3;
}
span {
  font-size: 22px;
}
a {
  font-size: 13px;
}
</style>
