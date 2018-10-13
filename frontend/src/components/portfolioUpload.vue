<template>
  <div id="portfolioUpload">
      <div id="first-block">
          <div class="line">
              <div class="margin">
                  <div class="s-12 m-12 l-12 margin-bottom" style="border:1px solid #F0F0F0">
                      <h3>PortfolioUpload</h3>
                      <hr>
                      user_id: <input type="text" v-model="po_data.user_id" readonly><br>
                      po_title: <input type="text" v-model="po_data.po_title"><br>
                      gen_number: <input type="text" v-model="po_data.gen_number" placeholder="1~9까지 숫자입력혀"><br>
                      po_type: <input type="text" v-model="po_data.po_type" placeholder="D,S입력혀"><br>
                      po_desc: <textarea v-model="po_data.po_desc"/><br>
                      <label>Files
                        <input type="file" id="file" ref="file" v-on:change="handleFilesUpload()"/>
                      </label><br>
                  <button v-on:click="submitFiles()">Submit</button>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script scoped>
export default {
  name: 'portfolioUpload',
  data () {
    return {
      po_data: {
        user_id: this.$session.get('user_info').user_id,
        po_view_count: 0,
        po_apply_count: 0,
        po_title: '',
        gen_number: '',
        po_type: '',
        po_desc: ''
      },
      file: ''
    }
  },
  methods: {
    submitFiles () {
      let uploadData = new FormData()

      uploadData.append('uploadData', this.file[0])
      uploadData.append('po_data', this.po_data)

      this.$http.defaults.headers.post['Content-Type'] = 'multipart/form-data'
<<<<<<< HEAD
      this.$http.post('/api/users/portfolio/create', formData
=======
      this.$http.post('/api/user/portfolio/create', uploadData
>>>>>>> master
      ).then(() => {
        console.log('SUCCESS!!')
      }).catch(() => {
        console.log('FAILURE!!')
      })
    },
    handleFilesUpload () {
      this.file = this.$refs.file.files
    }
  }
}
</script>

<style scoped>

</style>
