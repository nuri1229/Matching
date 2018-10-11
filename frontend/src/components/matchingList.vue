<template>
<div id="SignIn">
    <div id="first-block">
        <div class="line">
            <div class="margin">
            <div class="s-12 m-12 l-1 margin-bottom"/>
            <div class="s-12 m-12 l-10 margin-bottom" style="border:1px solid #F0F0F0">
                <h3 style="margin-top:20px">파트너 찾기</h3>
                <hr>
                <table>
                  <tr>
                    <td width="10%">장르</td>
                    <td colspan=3>
                      <span v-for="genre in genreList" :key="genre.gen_number" style="margin-right:10px;">
                          <input type="radio" v-bind:value="genre.gen_number">
                          <label>{{ genre.gen_name }}</label>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>성별</td>
                    <td width="40%">
                      <input type="radio" v-model="searchOption.user_gender" value="M"> 남
                      <input type="radio" v-model="searchOption.user_gender" value="F"> 여
                    </td>
                    <td width="10%">연령</td>
                    <td width="40%">
                      <input type="number" v-model="searchOption.start_age">
                      ~
                      <input type="number" v-model="searchOption.end_age">
                    </td>
                  </tr>
                  <tr>
                    <td>타입</td>
                    <td>
                      <input type="radio" v-model="searchOption.user_type" value="M"> 스토리작가
                      <input type="radio" v-model="searchOption.user_type" value="F"> 그림작가
                    </td>
                    <td>지역</td>
                    <td>
                      <select v-model="searchOption.location_number">
                        <option v-for="(location, index) in locationList" :key="location.location_number" v-bind:value="location.location_number" v-bind:selected="index==0">
                          {{index}}/{{location.location_name}}
                        </option>
                      </select>
                    </td>
                  </tr>
                </table>
                <button @click="testMethod()">테스트버튼</button>
            </div>
            <div class="s-12 m-12 l-1 margin-bottom"/>
            </div>
        </div>
    </div>
    <div id="second-block">
      <div class="line">
        <div class="margin"/>
        <div class="s-12 m-12 l-12 margin-bottom">
          <h2>세컨드 블록</h2>
          <hr/>
          <table>
            <tr>
              <td>포트폴리오제목</td>
              <td>등록자</td>
              <td>등록일</td>
              <td>성별</td>
              <td>나이</td>
              <td>장르</td>
              <td>타입</td>
              <td>유저타입</td>
              <td>지역</td>
              <td>포트폴리오 조회수</td>
            </tr>
            <tr v-for="portfolio in portfolioList">
              <td>{{portfolio.po_title}}</td>
              <td>{{portfolio.created_by}}</td>
              <td>{{portfolio.updated}}</td>
              <td>{{portfolio.user_gender}}</td>
              <td>{{portfolio.user_age}}</td>
              <td>{{portfolio.gen_name}}</td>
              <td>{{portfolio.po_type}}</td>
              <td>{{portfolio.user_type}}</td>
              <td>{{portfolio.location_name}}</td>
              <td>{{portfolio.po_view_count}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
</div>
</template>

<script scoped>
export default {
  name: 'matchingList',
  data () {
    return {
      genreList: [],
      locationList: [],
      searchOption: {
        user_gender: '',
        user_type: '',
        genre_number: '',
        location_number: '',
        start_age: '',
        end_age: ''
      },
      portfolioList: [],
      test: [
        {po_title: '바뀜'}, {po_title: '바뀜'}
      ]
    }
  },
  methods: {
    testMethod () {
      alert('testMethod')
      this.$http.defaults.headers.post['Content-Type'] = 'application/json'
      this.$http.post('/api/matching/list', {
        'searchOption': this.searchOption
      }).then((res) => {
        this.portfolioList = res.data
        alert('then')
      })
    }
  },
  created () {
    this.$http.get('/api/location')
      .then((res) => {
        this.locationList = res.data
      })
    this.$http.get('/api/genre')
      .then((res) => {
        this.genreList = res.data
        //alert(genreList[0].gen_name)
      })
    this.$http.post('/api/matching/list')
      .then((res) => {
        this.portfolioList = res.data
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
td {
  border: 1px solid white;
  background: white;
  border-bottom: 1px solid #F0F0F0;
  vertical-align: middle;
}
</style>
