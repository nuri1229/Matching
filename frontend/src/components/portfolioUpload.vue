<template>
  <div id="portfolioUpload">
      <div id="first-block">
          <div class="line">
              <div class="margin">
                  <div class="s-12 m-12 l-12 margin-bottom" style="border:1px solid #F0F0F0;" align="center">
                      <img src="/static/img/icon/idea.svg" style="width:40px;height:40px;display:inline">
                      <span style="font-size:20px; font-weight:bold; margin-left:10px;">
                        {{this.$session.get('user_info').user_nickname}}<font color="#808080">님의 포트폴리오를 등록하세요</font>
                      </span>
                      <hr>
                      <table>
                        <tr>
                          <td>포트폴리오 명</td>
                          <td colspan=3><input type="text" v-model="po_data.po_title" class="form-control"></td>
                        </tr>
                        <tr>
                          <td width="15%" style="border-right: 1px solid #f0f0f0">종류</td>
                          <td width="20%" style="border-right: 1px solid #f0f0f0">
                            <select v-model="po_data.po_type" class="form-control">
                              <option value="D" >그림</option>
                              <option value="S">스토리</option>
                            </select>
                          </td>
                          <td width="10%" style="border-right: 1px solid #f0f0f0">장르</td>
                          <td width="60%" style="border-right: 1px solid #f0f0f0">
                            <label v-for="genre in genreList" :key="genre.gen_number" class="radio-inline" style="margin-left:15px;">
                              <input type="radio" v-model="po_data.gen_number" v-bind:value="genre.gen_number"><span>{{genre.gen_name}}</span>
                            </label>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            파일
                          </td>
                          <td colspan=3>
                            <button class="btn btn-primary" v-on:click="fn_fileButtonClick()">파일첨부</button>
                            <span style="margin-left:20px;">{{selectedFileName}}</span>
                          </td>
                        </tr>
                        <tr>
                          <td colspan=4 style="line-height:30px">포트폴리오에 대한 설명을 작성해주세요</td>
                        </tr>
                        <tr>
                          <td colspan=4>
                              <textarea v-model="po_data.po_desc" class="form-control" style="height:300px;"/>
                          </td>
                        </tr>
                      </table>
                      <input type="file" id="file" ref="file" v-on:change="handleFilesUpload()" style="display:none;"/>
                      <button v-on:click="submitFiles()" style="width:250px;" class="btn btn-dark">등록</button>
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
      file: '',
      selectedFileName: '',
      genreList: ''
    }
  },
  methods: {
    submitFiles: function () {
      let uploadData = new FormData()

      uploadData.append('uploadData', this.file[0])
      uploadData.append('po_data', this.po_data)


      this.$http.defaults.headers.post['Content-Type'] = 'multipart/json'

      this.$http.post('/api/user/portfolio/create', uploadData

      ).then(() => {
        console.log('SUCCESS!!')
      }).catch(() => {
        console.log('FAILURE!!')
      })
    },
    handleFilesUpload: function () {
      this.file = this.$refs.file.files
      this.selectedFileName = this.file[0].name
    },
    fn_fileButtonClick: function () {
      this.$refs.file.click()
    }
  },
  created () {
    this.$http.get('/api/genre').then((res) => {
      this.genreList = res.data
    })
  },
  mounted () {
    this.po_data.po_type = 'D'
  }
}
</script>

<style scoped>

.column {
  color: #808080;
  font-size: 15px;
}
input {
  margin-top:10px;
}
td {
  background: white;
  border: 1px solid #f0f0f0;
}
</style>
