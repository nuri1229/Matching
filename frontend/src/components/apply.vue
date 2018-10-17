<template>
  <div id="apply"> 
    <div style="border:1px solid #f0f0f0;width:100%">
      신청메시지<br>
    <textarea v-model="apply.apply_message"></textarea>
    <button v-on:click="submit">서브밋</button>
    <button v-on:click="$emit('close')" class="btn btn-dark">Close</button><br>
    참고: <br>
    po_number: {{apply.po_number}}<br>
    po_user_id: {{apply.po_user_id}}<br>
    login_user_number: {{apply.login_user_number}}<br>
    apply_message: {{apply.apply_message}}<br>
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
  props : ['po_number','po_user_id'],
  methods: {
    submit: function () {
      this.$http.post('/api/matching/apply/', {'apply': this.apply}).then((res) => {
        alert(res.data)
      })
    }
  }
}
</script>
<style scoped>

</style>
