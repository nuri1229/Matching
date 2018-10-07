<template>
<div id="Users">
    <div id="first-block">
        <div class="line">
            <div class="margin">
            <div class="s-12 m-12 l-12 margin-bottom" style="border:1px solid #F0F0F0">
                <h3>USERS</h3>
                <p v-for="user in users" :key="user.user_number">
                  {{user.user_number}}:::{{user.user_id}}
                </p>
            </div>
            </div>
        </div>
    </div>
</div>
</template>

<script scoped>
export default {
  name: 'Users',
  created () {
    this.$http.get('/api/users')
      .then((res) => {
        this.users = res.data
      })
  },
  data () {
    return {
      users: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
