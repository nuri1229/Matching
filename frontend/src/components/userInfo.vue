<template>
<div id="userInfo">
  <div id="first-block" style="padding-top:0px;">
    <div class="line" >
      <div class="margin">
        <div class="s-12 m-12 l-12">
          <table style="width:100%">
            <tr>
              <td width="97%" style="background:#343A40;color:white;text-align:center;">
                {{userInfo.user_nickname}}님의 연락처 정보입니다
              </td>
              <td style="background:#b0b0b0;color:black;text-align:center;font-weight:bold;cursor:pointer;" v-on:click="$emit('close')">X</td>
            </tr>
          </table>
      </div>
    </div>
    </div>
    <div class="line">
      <div class="margin">
        <div class="s-12 m-12 l-12" align="center" style="margin-top:15px;">
          <span style="color:#46A6F7;font-size:22px;">{{userInfo.user_nickname}}</span>님과 함께 멋진 작품을 만들어보세요
          <div style="border:1px solid #f0f0f0;width:98%">
          <table style="margin-top:20px;">
            <tr>
              <td width="25%">
                나이
              </td>
              <td>
                {{userInfo.user_age}}
              </td>
            </tr>
            <tr>
              <td>
                지역
              </td>
              <td>
                {{userInfo.location_name}}
              </td>
            </tr>
            <tr>
              <td>
                연락처
              </td>
              <td>
                {{userInfo.user_phone}}
              </td>
            </tr>
            <tr>
              <td>
                SNS
              </td>
              <td>
                {{userInfo.user_sns}}
              </td>
            </tr>
          </table>
          </div>
        </div>
    </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'userInfo',
  data () {
    return {
      apply: {
        'apply_number': this.apply_number,
        'user_number': this.user_number
      },
      userInfo: {}
    }
  },
  props: ['apply_number', 'user_number'],
  created () {
    this.$http.post('/api/user/matching/UserInfo', this.apply).then((res) => {
      this.userInfo = res.data
    })
  }
}
</script>
<style>
td {
  background: white;
  border: 1px solid #f0f0f0;
}
</style>
