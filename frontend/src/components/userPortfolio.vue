<template>
  <div id="userPortfolio" style="overflow-y:scroll;height:600px;width:100%;">
    <div id="first-block" style="padding:0px;width:99%;">
    <div class="line" >
      <div class="margin">
        <div class="s-12 m-12 l-12">
          <table style="width:100%">
            <tr>
              <td width="97%" style="background:#343A40;color:white;text-align:center;">
                {{user_nickname}} 포트폴리오 목록입니다
              </td>
              <td style="background:#b0b0b0;color:black;text-align:center;font-weight:bold;cursor:pointer;" v-on:click="$emit('close')">X</td>
            </tr>
          </table>
      </div>
    </div>
    </div>
    <template v-for="portfolio in portfolioList">
      <div style="border:1px solid #f0f0f0;width:99%;margin-top:15px;" v-bind:key="portfolio.po_number">
      <div class="line">
        <div class="margin">
          <div class="s-12 m-12 l-8 margin-bottom" style="border:1px solid #f0f0f0">
            <img v-bind:src="portfolio.po_file_path+'/'+portfolio.po_file_name" v-if="portfolio.po_type=='D'" style="width:100%">
            <iframe v-bind:src="portfolio.po_file_path+'/'+portfolio.po_file_name" v-else style="width:100%;height:550px;"/>
          </div>
          <div class="s-12 m-12 l-4 margin-bottom">
            <p>{{portfolio.user_nickname}}님의 {{portfolio.gen_name}} 포트폴리오</P>
            <hr>
            <p style="font-weight:bold; font-size:20px;">[{{portfolio.po_title}}]</p>
            <hr>
            <p style="font-size:17px;color:#808080;margin-left:20px;">
              이 포트폴리오는 조회한 <span style="font-size:22px; color:#000000; font-weight:bold;">{{portfolio.po_view_count}}명</span>의 유저 중
              <br><span style="font-size:22px; color:#000000; font-weight:bold; padding-left:30px;">{{portfolio.per_selected}}%</span> 에게 협업 신청을 받았습니다
            </p>
            <div style="border: 1px solid #f0f0f0; padding: 10px; border-radius:10px; height:350px; margin-bottom:15px;" >
              {{portfolio.po_desc}}
            </div>
          </div>
        </div>
      </div>
      </div>
    </template>
    </div>
  </div>

</template>

<script>
export default {
  name: 'userPortfolio',
  data () {
    return {
      apply_number: this.applyNumber,
      portfolioList: [],
      user_nickname: this.userNickname
    }
  },
  props: ['applyNumber', 'userNickname'],
  created () {
    this.$http.post('/api/user/matching/reply/view', {'apply_number': this.apply_number}).then((res) => {
      this.portfolioList = res.data
    })
  }
}
</script>

<style>
</style>
