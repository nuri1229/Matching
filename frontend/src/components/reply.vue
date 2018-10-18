<template>
  <div id="reply">
    <div id="first-block">
      <div class="line">
        <div class="margin">
          <div class="s-12 m-12 l-12">
            나에게 협업을 요청한 사람들
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
            user_nickname님께 보낸 당신의 협업 요청은 현재 미확인 상태(not_read) 입니다
            user_nickname2님께 보낸 당신의 협업 요청 요청은 현재 거절되었습니다
            user_nickname3님께 보낸 당신의 협업 요청에 대해 XXX님이 고민 중입니다
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
      replyList: []
    }
  },
  created () {
    this.$http.post('/api/user/matching/reply/list', {'user_number': this.$session.get('user_info').user_number}).then((res) => {
      console.log('res.data', res.data)
      console.log('res.data.replyList', res.data.replyList)
      alert(res.data.replyList.length)
    })
  }
}
</script>

<style scoped>

</style>
