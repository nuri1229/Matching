<template>
  <div id="reply">
    <div id="first-block" style="padding-bottom:10px;padding-top:40px;">
      <div class="line">
        <div class="margin">
          <div class="s-12 m-12 l-12" style="overflow-y:scroll;height:400px;">
          <div style="color:#606060;margin-bottom:15px;">
            <span style="font-size:19px;font-weight:bold;">{{replyList.length}}</span>건의 협업 요청이 있습니다
          </div>
          <modals-container/>
          <template v-for="reply in replyList">
            <table v-bind:key="reply.apply_number" >
              <tr>
                <td style="color:#808080;" width="90%">
                  <span style="color:#46A6F7;font-size:24px;font-weight:bold;cursor:pointer;" v-on:click="portfolioModalOn(reply.apply_number)">{{reply.user_nickname}}</span>(선택률: {{reply.user_selected_per}}%)님이 <span style="color:#000000;font-weight:bold;">{{reply.po_title}}</span>에 대해 협업요청을 하였습니다</td>
                <td style="text-align:center;padding-top:0px;padding-bottom:0px;">
                  <div>
                    <template v-if="reply.apply_status=='completed' && reply.reply_status=='accepy'">
                      <button v-on:click="getUserInfo(reply.apply_number)" class="btn btn-primary status">연락처확인</button>
                    </template>
                    <template v-else>
                      <button v-on:click="acceptReply(reply.apply_number)" class="btn btn-dark" style="width:90%;margin-bottom:5px;">수락</button><br>
                      <button v-on:click="denyReply(reply.apply_number)" class="btn btn-danger" style="width:90%;">거절</button>
                    </template>
                  </div>
                </td>
              </tr>
              <tr style="margin-bottom:10px;">
                <td>{{reply.apply_message}}</td>
                <td style="background:white;border-top:1px solid #f0f0f0">
                    {{ reply.apply_date | moment("YYYY/MM/DD HH:mm") }}
                </td>
              </tr>
            </table>
          </template>
          </div>
        </div>
      </div>
    </div>
    <div id="second-block" style="padding-top:40px;">
      <div class="line">
        <div class="margin">
          <div class="s-12 m-12 l-12" style="overflow-y:scroll;height:350px;">
            <div style="color:#606060;margin-bottom:15px;">
            답변을 기다리고 있는 <span style="font-size:19px;font-weight:bold;">{{applyList.length}}</span>건의 내 요청이 있습니다
            </div>
            <template v-for="apply in applyList">
              <table :key="apply.apply_number">
                <tr>
                  <td><span style="color:#000000;font-weight:bold;">{{apply.apply_date | moment("YYYY/MM/DD hh:mm")}}</span>에 <span style="color:#46A6F7;font-size:24px;font-weight:bold;padding-left:10px;padding-right:10px;">{{apply.user_nickname}}</span>님께 보낸 당신의 협업 요청은</td>
                  <td rowspan=2 width="10%">
                    <button v-if="apply.apply_status=='completed' && apply.reply_status=='accept'"
                            class="btn btn-primary status" v-on:click="getUserInfo(apply.apply_number)">연락처확인</button>
                    <button v-else-if="apply.apply_status=='sending' && apply.reply_status=='none'"
                            class="btn btn-dark status">읽지않음</button>
                    <button v-else-if="apply.apply_status=='completed' && apply.reply_status=='deny'"
                            class="btn btn-danger status">거절</button>
                    <button v-else class="btn btn-warning status"
                            v-on:click="applyCancel(apply.apply_number)" style="font-weight:bold;">답변대기중</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span v-if="apply.apply_status=='completed' && apply.reply_status=='accept'">
                      승낙되었습니다. 우측 버튼을 눌러 상대방의 연락처를 확인하세요
                    </span>
                    <span v-else-if="apply.apply_status=='sending' && apply.reply_status=='none'">
                      읽지 않은 상태입니다. 좀만 더 기다려주세요. 우측 버튼을 클릭하면 요청을 취소할 수 있습니다
                    </span>
                    <span v-else-if="apply.apply_status=='completed' && apply.reply_status=='deny'">
                      상대방이 거절하였습니다. 포트폴리오를 조금 더 다듬어보세요
                    </span>
                    <span v-else >
                      답변 대기 중입니다. 우측 버튼을 클릭하면 요청을 취소할 수 있습니다
                    </span>
                  </td>
                </tr>
              </table>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userPortfolio from './userPortfolio.vue'
export default {
  name: 'reply',
  data () {
    return {
      applyList: [],
      replyList: [],
      apply: {
        apply_number: '',
        apply_status: ''
      }
    }
  },
  created () {
    this.$http.post('/api/user/matching/reply/list', {'user_number': this.$session.get('user_info').user_number}).then((res) => {
      this.applyList = res.data.applyList
      this.replyList = res.data.replyList
    })
  },
  methods: {
    acceptReply: function (applyNumber) {
      if (confirm('해당 요청을 승낙하시겠습니까?')) {
        var apply = {
          'apply_number': applyNumber,
          'reply_status': 'accept'
        }
        this.$http.post('/api/user/matching/reply', {'apply': apply}).then((res) => {
          alert(res.data)
          if (res.data === 'success') {
            this.$http.post('/api/user/matching/reply/list', {'user_number': this.$session.get('user_info').user_number}).then((res) => {
              this.applyList = res.data.applyList
              this.replyList = res.data.replyList
            })
          }
        })
      }
    },
    denyReply: function (applyNumber) {
      if (confirm('해당 요청을 거절하시겠습니까?')) {
        var apply = {
          'apply_number': applyNumber,
          'reply_status': 'deny'
        }
        this.$http.post('/api/user/matching/reply/', {'apply': apply}).then((res) => {
          alert(res.data)
          if (res.data === 'success') {
            this.$http.post('/api/user/matching/reply/list', {'user_number': this.$session.get('user_info').user_number}).then((res) => {
              this.applyList = res.data.applyList
              this.replyList = res.data.replyList
            })
          }
        })
      }
    },
    applyCancel: function (applyNumber) {
      if (confirm('협업요청을 취소하시겠습니까?')) {
        this.$http.post('/api/user/matching/cancel', {'apply_number': applyNumber}).then((res) => {
          alert(res.data)
        })
      }
    },
    portfolioModalOn: function (applyNumber) {
      alert('포폴모달온')
      this.$modal.show(userPortfolio, {
        po_number: applyNumber
      }, {
        draggable: false,
        width: 900,
        height: 500,
        clickToClose: false
      })
      // this.$http.post('/api/Main/PortfolioSelect', {'apply_number': applyNumber}).then((res) => {
      // alert(res.data)
      // })
    },
    getUserInfo: function (applyNumber) {
      var apply = {
        'apply_number': applyNumber,
        'user_number': this.$session.get('user_info').user_number
      }
      this.$http.post('api/user/matching/UserInfo', apply).then((res) => {
        alert(res.data)
      })
    }
  }
}
</script>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 0 15px;
}
.status{
  width:100%;
  line-height:60px;
}
</style>
