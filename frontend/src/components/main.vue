<template>
  <div class="index">
    <div id="first-block" style="padding-bottom:0px;">
      <div class="line">
            <div class="margin">
              <div class="s-12 m-12 l-12 margin-bottom">
                <table style="width:100%">
                  <tr>
                    <td v-on:click="fn_search(0)">
                      <img src="/static/img/icon/all.svg"/>
                      전체
                    </td>
                    <td v-for="(genre, index) in genreList" v-bind:key="genre.gen_number" v-on:click="fn_search(index+1)">
                      <img v-bind:src="'/static/img/icon/'+genre.icon_name"/>
                      {{genre.gen_name}}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
      </div>
    </div>
    <div id="second-block" style="padding-top:10px;">
      <div class="line">
        <div class="margin">
          <div class="s-12 m-12 l-12 margin-bottom">
            <table>
              <tr>
                <td>
                  <img src="/static/data/testId/20181014185628carousel2.jpg" style="width:100%;height:350px;"/>
                  액션 웹툰 포트폴리오<br>
                  Lee Nuri<br>
                  선택률: 94%
                </td>
                <td>
                  <img src="/static/img/gallery-1.svg" style="width:100%;height:350px;"/>
                  액션 웹툰 포트폴리오<br>
                  Lee Nuri<br>
                  선택률: 94%
                </td>
                <td>
                  <img src="/static/img/gallery-1.svg" style="width:100%;height:350px;"/>
                  액션 웹툰 포트폴리오<br>
                  Lee Nuri<br>
                  선택률: 94%
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/static/img/gallery-1.svg" style="width:100%;height:350px;"/>
                  액션 웹툰 포트폴리오<br>
                  Lee Nuri<br>
                  선택률: 94%
                </td>
                <td>
                  <img src="/static/img/gallery-1.svg" style="width:100%;height:350px;"/>
                  액션 웹툰 포트폴리오<br>
                  Lee Nuri<br>
                  선택률: 94%
                </td>
                <td>
                  <img src="/static/img/gallery-1.svg" style="width:100%;height:350px;"/>
                  액션 웹툰 포트폴리오<br>
                  Lee Nuri<br>
                  선택률: 94%
                </td>
              </tr>
              <tr>
                <td>
                  <img src="/static/img/gallery-1.svg" style="width:100%;height:350px;"/>
                  액션 웹툰 포트폴리오<br>
                  Lee Nuri<br>
                  선택률: 94%
                </td>
                <td>
                  <img src="/static/img/gallery-1.svg" style="width:100%;height:350px;"/>
                  액션 웹툰 포트폴리오<br>
                  Lee Nuri<br>
                  선택률: 94%
                </td>
                <td>
                  <img src="/static/img/gallery-1.svg" style="width:100%;height:350px;"/>
                  액션 웹툰 포트폴리오<br>
                  Lee Nuri<br>
                  선택률: 94%
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import $ from 'jquery'
export default {
  name: 'index',
  data () {
    return {
      genreList: [],
      portfolioList: []
    }
  },
  methods: {
    fn_search (obj) {
      for (var i = 0; i < $('td').length; i++) {
        if (i === obj) {
          $('td').eq(i).css('border-bottom', '3px solid #46A6F7')
        } else {
          $('td').eq(i).css('border-bottom', '')
        }
      }
    }
  },
  created () {
    this.$http.get('/api/genre').then((res) => {
      this.genreList = res.data
    })
  },
  mounted () {
    $('td').eq(0).css('border-bottom', '2px solid #46A6F7')
  }
}
</script>

<style scoped>
td {
  width: 10%;
  font-size: 16px;
  text-align: center;
  color: #808080;
}
img {
  width: 50%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
