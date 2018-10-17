<template>
  <div id="portfolioDetail">
      <div id="first-block">
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
                <div style="border: 1px solid #f0f0f0; padding: 10px; border-radius:10px; height:350px; margin-bottom:15px;" >{{portfolio.po_desc}}</div>
                <button class="btn btn-dark" style="width:100%;" v-on:click="modalOn()">협업신청하기</button><br>
                <modals-container/>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import apply from './apply.vue'
export default {
  name: 'portfolioDetail',
  data () {
    return {
      po_number: this.$route.params.poNumber,
      portfolio: {},
      showModal: false
    }
  },
  methods: {
    onload_function: function () {
      this.$http.post('/api/Main/PortfolioDetail', {'po_number': this.po_number}).then((res) => {
        this.portfolio = res.data[0]
      })
    },
    modalOn: function () {
      this.$modal.show(apply, {
        po_number: this.portfolio.po_number,
        po_user_id: this.portfolio.user_id
      }, {
        draggable: false,
        width: 900,
        height: 500,
        clickToClose: false
      })
    }
  },
  mounted () {
    this.onload_function()
  }
}
</script>
<style scoped>

</style>
