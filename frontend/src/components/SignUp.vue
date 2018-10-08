<template>
<div id="SignIn">
    <div id="first-block">
        <div class="line">
            <div class="margin">
            <div class="s-12 m-12 l-1 margin-bottom"/>
            <div class="s-12 m-12 l-10 margin-bottom" style="border:1px solid #F0F0F0">
                <h3 style="margin-top:20px">Sign UP</h3>
                <hr>
                <div class="table-responsive">
                <table class="table table-sm">
                  <tbody>
                    <tr>
                      <td width="10%">
                        아이디
                      </td>
                      <td width="40%">
                        <input type="text" v-model="user.user_id" class="form-control">
                      </td>
                      <td width="40%">
                        <input type="text" v-model="id_message" readonly style="border: 0px; width:100%" >
                      </td>
                      <td width="10%">
                        <button class="btn btn-dark" @click="idDuplicateCheck(user.user_id)">중복체크</button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        비밀번호
                      </td>
                      <td>
                        <input type="text" v-model="user.user_pw" class="form-control">
                      </td>
                      <td width="40%">
                        <input type="text" v-model="pw_message" readonly style="border: 0px; width:100%" >
                      </td>
                      <td>

                      </td>
                    </tr>
                    <tr>
                      <td>
                        비밀번호확인
                      </td>
                      <td>
                        <input type="text" v-model="user_pw_confirm" class="form-control">
                      </td>
                      <td width="40%">
                        <input type="text" v-model="pw_re_message" readonly style="border: 0px; width:100%" >
                      </td>
                      <td>

                      </td>
                    </tr>
                    <tr>
                      <td>
                        이메일
                      </td>
                      <td>
                        <input type="text" v-model="user.user_email" class="form-control">
                      </td>
                      <td width="40%">
                        <input type="text" v-model="email_message" readonly style="border: 0px; width:100%" >
                      </td>
                      <td>
                        <button class="btn btn-dark" @click="emailDuplicateCheck(user.user_email)">중복체크</button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        이름
                      </td>
                      <td>
                        <input type="text" v-model="user.user_name" class="form-control">
                      </td>
                      <td width="40%">

                      </td>
                      <td>

                      </td>
                    </tr>
                    <tr>
                      <td>
                        닉네임
                      </td>
                      <td>
                        <input type="text" v-model="user.user_nickname" class="form-control">
                      </td>
                      <td width="40%">
                        <input type="text" v-model="nickname_message" readonly style="border: 0px; width:100%" >
                      </td>
                      <td>
                        <button class="btn btn-dark" @click="nicknameDuplicateCheck(user.user_nickname)">중복체크</button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        phone
                      </td>
                      <td>
                        <input type="text" v-model="user.user_phone" class="form-control">
                      </td>
                      <td width="40%">
                        <input type="text" v-model="phone_message" readonly style="border: 0px; width:100%" >
                      </td>
                      <td>

                      </td>
                    </tr>
                    <tr>
                      <td>
                        SNS주소
                      </td>
                      <td>
                        <input type="text" v-model="user.user_sns" class="form-control">
                      </td>
                      <td width="40%">
                        <input type="text" v-model="sns_message" readonly style="border: 0px; width:100%" >
                      </td>
                      <td>

                      </td>
                    </tr>
                    <tr>
                      <td>
                        연령대
                      </td>
                      <td>
                        <input type="text" v-model="user.user_age" class="form-control">
                      </td>
                      <td width="40%"></td>
                      <td>

                      </td>
                    </tr>
                    <tr>
                      <td>
                        지역
                      </td>
                      <td>
                        <input type="text" v-model="user.location_number" class="form-control">
                      </td>
                      <td width="40%">

                      </td>
                      <td>

                      </td>
                    </tr>
                    <tr>
                      <td>
                        성별
                      </td>
                      <td>
                        <label class="radio-inline"><input type="radio" value="M" v-model="user.user_gender"> 남</label>
                        <label class="radio-inline"><input type="radio" value="F" v-model="user.user_gender"> 여</label>
                      </td>
                      <td width="40%"></td>
                      <td>

                      </td>
                    </tr>
                    <tr>
                      <td>
                        경력사항
                      </td>
                      <td>
                        <input type="text" v-model="user.user_desc" class="form-control">
                      </td>
                      <td width="40%"></td>
                      <td>

                      </td>
                    </tr>
                    <tr>
                      <td>
                        타입
                      </td>
                      <td>
                        <label class="radio-inline"><input type="radio" value="S" v-model="user.user_type"> 그림작가</label>
                        <label class="radio-inline"><input type="radio" value="D" v-model="user.user_type"> 스토리작가</label>
                      </td>
                      <td width="40%"></td>
                      <td>

                      </td>
                    </tr>
                  </tbody>
                </table>
                <div style="width:100%" align="center">
                  <button class="btn btn-dark" style='width:50%' @click="fn_signUp(user)">회원가입</button>
                </div>
                </div>
            </div>
            <div class="s-12 m-12 l-1 margin-bottom"/>
            </div>
        </div>
    </div>
</div>
</template>

<script scoped>
export default {
  name: 'Users',
  data () {
    return {
      user_pw_confirm: '',
      id_message: '4~8자의 아이디를 입력하세요',
      pw_message: '비밀번호는 6자 이상의 영문+숫자 조합으로 입력하세요',
      nickname_message: '8자 미만으로 입력하세요',
      email_message: '실제 사용하는 이메일을 입력하세요',
      sns_message: 'SNS 주소가 상대방에게 공개됩니다',
      phone_message: '- 없이 숫자로만 입력해주세요',
      pw_re_message: '비밀번호를 다시 입력하세요',
      user: {
        user_id: '',
        user_name: '',
        user_pw: '',
        user_nickname: '',
        user_email: '',
        user_phone: '',
        user_sns: '',
        user_age: '',
        location_number: '',
        user_gender: '',
        user_desc: '',
        user_type: ''
      }
    }
  },
  methods: {
    idDuplicateCheck (userId) {
      this.$http.defaults.headers.post['Content-Type'] = 'application/json'
      this.$http.post('/api/idDuplicateCheck', {
        'user_id': userId
      }).then((res) => {
        alert(res.data)
      })
    },
    emailDuplicateCheck (userEmail) {
      this.$http.defaults.headers.post['Content-Type'] = 'application/json'
      this.$http.post('/api/emailDuplicateCheck', {
        'user_email': userEmail
      }).then((res) => {
        alert(res.data)
      })
    },
    nicknameDuplicateCheck (nickname) {
      this.$http.defaults.headers.post['Content-Type'] = 'application/json'
      this.$http.post('/api/nicknameDuplicateCheck', {
        'user_nickname': nickname
      }).then((res) => {
        alert(res.data)
      })
    },
    fn_signUp (user) {
      this.$http.defaults.headers.post['Content-Type'] = 'application/json'
      this.$http.post('/api/SignUp', {
        'user': user
      }).then((res) => {
        alert(res.data)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
td {
  border: 1px solid white;
  background: white;
  border-bottom: 1px solid #F0F0F0;
  vertical-align: middle;
}

</style>
