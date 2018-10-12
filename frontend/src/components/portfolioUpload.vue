<template>
  <div id="portfolioUpload">
      <div id="first-block">
          <div class="line">
              <div class="margin">
                  <div class="s-12 m-12 l-4 margin-bottom" />
                  <div class="s-12 m-12 l-4 margin-bottom" style="border:1px solid #F0F0F0">
                      <h3>PortfolioUpload</h3>
                      <hr>
                      <label>Files
                        <input type="file" id="files" ref="files" multiple v-on:change="handleFilesUpload()"/>
                      </label>
                  <button v-on:click="submitFiles()">Submit</button>
                  </div>
                  <div class="s-12 m-12 l-4 margin-bottom" />
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
      files: ''
    }
  },
  methods: {
    submitFiles () {
      let formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i]
        formData.append('files[' + i + ']', file)
      }
      this.$http.defaults.headers.post['Content-Type'] = 'multipart/form-data'
      this.$http.post('/api/user/portfolio/create', formData
      ).then(() => {
        console.log('SUCCESS!!')
      }).catch(() => {
        console.log('FAILURE!!')
      })
    },
    handleFilesUpload () {
      this.files = this.$refs.files.files
    }
  }
}
</script>

<style scoped>

</style>
