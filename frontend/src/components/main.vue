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
                    <td v-for="(genre, index) in genreList" v-bind:key="genre.gen_number" v-on:click="fn_search(index+1,genre.gen_number)">
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
          <div class="s-12 m-12 l-12 margin-bottom" style="padding-left:100px;">
              <template v-for="(portfolio, index) in portfolioList">
                  <div class="inlineDiv" v-on:mouseover.self="divMouseOver" v-on:mouseout.self="divMouseOut" :key="portfolio.po_number" v-on:click="portfolioDetail(portfolio.po_number)" >
                    <img v-bind:src="portfolio.po_file_path+'/'+portfolio.po_file_name" v-on:mouseover.self="imgMouseOver" v-on:mouseout.self="imgMouseOut" style="width:100%;height:300px;">
                    <hr>
                    <table class="poDesc" style="width=100%">
                      <tr>
                        <td style="width:60%;border-bottom:1px solid #f0f0f0;font-size:14px;">
                          {{portfolio.user_nickname}}의 {{portfolio.gen_name}} 포트폴리오
                        </td>
                        <td rowspan=2 style="font-weight:bold;font-size:22px;">{{portfolio.per_selected}}%</td>
                      </tr>
                      <tr>
                        <td style="background:white;font-size:14px;"><b>[{{portfolio.po_title}}]</b></td>
                      </tr>
                    </table>
                  </div>
                  <br v-if="(index+1)%3==0 && (index+1)>=3" :key="'line'+index">
                </template>
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
      portfolioList: [],
      gen_number: 0
    }
  },
  methods: {
    fn_search (index, genreNumber) {
      for (var i = 0; i < $('td').length; i++) {
        if (i === index) {
          $('td').eq(i).css('border-bottom', '3px solid #46A6F7')
        } else {
          $('td').eq(i).css('border-bottom', '')
        }
      }
      this.gen_number = genreNumber
      this.$http.post('/api/Main/PortfolioSelect', {'gen_number': this.gen_number}).then((res) => {
        this.portfolioList = res.data
      })
    },
    divMouseOver: function (event) {
      event.target.style.border = '2px solid #46A6F7'
    },
    imgMouseOver: function (event) {
      event.target.parentNode.style.border = '2px solid #46A6F7'
    },
    divMouseOut: function (event) {
      event.target.style.border = '1px solid #f0f0f0'
    },
    imgMouseOut: function (event) {
      event.target.parentNode.style.border = '1px solid #f0f0f0'
    },
    portfolioDetail: function (poNumber) {
      alert(poNumber)
      this.$router.push({name: 'portfolioDetail', params: {poNumber}})
    }
  },
  created () {
    this.$http.get('/api/genre').then((res) => {
      this.genreList = res.data
    })
    this.$http.post('/api/Main/PortfolioSelect', {'gen_number': this.gen_number}).then((res) => {
      this.portfolioList = res.data
      //alert(this.portfolioList.length)
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
.inlineDiv {
  display: inline-block;
  width: 30%;
  border: 1px solid #f0f0f0;
  height: 450px;
  background: white;
  margin-left: 20px;
  margin-bottom: 15px;
  padding: 5px;
}
</style>
