<template>
  <div id="apply">
    <button style="width:100%;" class="btn btn-dark">{{apply.po_user_id}}님께 보낼 신청메시지를 작성해주세요</button>
    <div style="border:1px solid #f0f0f0;width:95%;padding-top:10px;">
      <textarea v-model="apply.apply_message" style="height:400px;margin-left:25px;margin-bottom:10px;" class="form-control"></textarea>
    </div>
    <div align="center">
      <button v-on:click="submit" class="btn btn-dark" style="width:20%;margin:auto;">신청하기</button>
      <button v-on:click="$emit('close')" class="btn" style="width:20%;">Close</button><br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'apply',
  data () {
    return {
      apply: {
        po_number: this.po_number,
        po_user_id: this.po_user_id,
        login_user_number: this.$session.get('user_info').user_number,
        apply_message: ''
      }
    }
  },
  props: ['po_number', 'po_user_id'],
  methods: {
    submit: function () {
      this.$http.post('/api/matching/apply/', {'apply': this.apply}).then((res) => {
        if (res.data === 'success') {
          this.alert('신청이 완료되었습니다')
        } else {
          this.alert('예기치 못한 오류가 발생하였습니다')
        }
      })
    }
  }
}
</script>
<style scoped>

</style>
