<template>
  <div id="reply">
    <div id="first-block">
      <div class="line">
        <div class="margin">
          <div class="s-12 m-12 l-12">
          <div style="color:#606060;margin-bottom:15px;">
            {{this.$session.get('user_info').user_nickname}}님, 답변이 필요한 <span style="font-size:19px;font-weight:bold;">{{replyList.length}}</span>건의 협업 요청이 있습니다
          </div>
          <template v-for="reply in replyList">
            <table v-bind:key="reply.apply_number">
              <tr style="line-height:40px;">
                <td style="color:#808080;" width="85%">
                  <span style="color:#46A6F7;font-size:24px;font-weight:bold;">{{reply.user_nickname}}</span>(선택률: {{reply.user_selected_per}}%)님이
                  당신의 포트폴리오(<span style="color:#000000;font-weight:bold;">{{reply.po_title}}</span>)를 보고 협업요청을 하였습니다</td>
                <td style="text-align:center;">
                  <div>{{ new Date() | moment("YYYY/MM/DD hh:mm:SS A") }}</div>
                </td>
              </tr>
              <tr style="margin-bottom:10px;">
                <td>{{reply.apply_message}}</td>
                <td style="background:white;border-top:1px solid #f0f0f0">
                  <button v-on:click="acceptReply(reply.apply_number)" class="btn btn-dark" style="width:44%;">수락</button>
                  <button v-on:click="denyReply(reply.apply_number)" class="btn btn-danger" style="width:44%;">거절</button>
                </td>
              </tr>
            </table>
          </template>
          </div>
        </div>
      </div>
    </div>
    <div id="second-block">
      <div class="line">
        <div class="margin">
          <div class="s12 m-12 l-12">
            내가 협업을 요청한 사람들
          </div>
        </div>
      </div>
      <div class="line">
        <div class="margin">
          <div class="s-12 m-12 l-12">
            user_nickname님께 보낸 당신의 협업 요청은 현재 미확인 상태(not_read) 입니다<br>
            user_nickname2님께 보낸 당신의 협업 요청 요청은 현재 거절(denied)되었습니다<br>
            user_nickname3님께 보낸 당신의 협업 요청에 대해 XXX님이 고민 중(not_reply)입니다<br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
          'apply_status': 'accept'
        }
        this.$http.post('/api/user/matching/reply', {'apply': apply}).then((res) => {
          alert(res.data)
        })
        this.$http.post('/api/user/matching/reply/list', {'user_number': this.$session.get('user_info').user_number}).then((res) => {
          this.applyList = res.data.applyList
          this.replyList = res.data.replyList
        })
      }
    },
    denyReply: function (applyNumber) {
      if (confirm('해당 요청을 거절하시겠습니까?')) {
        var apply = {
          'apply_number': applyNumber,
          'apply_status': 'deny'
        }
        this.$http.post('/api/user/matching/reply/', {'apply': apply}).then((res) => {
          alert(res.data)
        })
        this.$http.post('/api/user/matching/reply/list', {'user_number': this.$session.get('user_info').user_number}).then((res) => {
          this.applyList = res.data.applyList
          this.replyList = res.data.replyList
        })
      }
    }
  }
}
</script>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 0 15px;
}
</style>
