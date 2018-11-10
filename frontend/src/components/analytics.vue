<template>
  <div id="analyst">
    <div id="first-block">
      <div class="line">
        <div class="margin" v-if="flag">
          <div class="s-12 m-12 l-12 margin-bottom">
            <h4><b>장르별 인기도</b></h4>
            <GChart type="PieChart" :data="genreScore" :options="chartOptions2.chart" :events="chartEvents" ref="pChart"/>
          </div>
        </div>
        <div class="margin" v-else>
          <div class="s-12 m-12 l-4 margin-bottom">
            <h4><b>남녀 성비</b></h4>
            <GChart type="PieChart" :data="genderForgenre" :options="chartOptions3.chart" :events="chartEvents"/>
          </div>
          <div class="s-12 m-12 l-4 margin-bottom">
            <h4><b>조회 유저 타입</b></h4>
            <GChart type="PieChart" :data="userTypeForGenre" :options="chartOptions4.chart" :events="chartEvents" />
          </div>
          <div class="s-12 m-12 l-4 margin-bottom">
            <h4><b>검색유저 지역분포</b></h4>
            <GChart type="PieChart" :data="locationForGenre" :options="chartOptions5.chart" :events="chartEvents"/>
          </div>
        </div>
      </div>
    </div>
    <div id="second-block">
      <div class="line">
        <div class="margin">
          <div class="s-12 m-12 l-8 margin-bottom">
            <h4><b>장르 검색 유저 연령 평균</b></h4>
            <GChart type="ColumnChart" :data="avgUserAge" :options="chartOptions.chart"/>
          </div>
          <div class="s-12 m-12 l-4 margin-bottom">
            <h4><b>오늘의 인기 포트폴리오 TOP5</b></h4>
            <table style="margin-top:45px;">
            <template v-for="(po, index) in poList">
              <tr height="70" v-if="index < 5" v-bind:key="po.visited_po_number" >
              <td style="text-align:center;font-weight:bold;">{{po.rank}}</td>
              <td>{{po.po_title}}</td>
              </tr>
            </template>

            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartOptions: {
        chart: {
          bar: {groupWidth: '50%'},
          legend: { position: 'bottom' },
          height: 450,
          colors: ['#41B883'],
          chartArea: {'width': '90%', 'height': '70%'},
          backgroundColor: { fill: 'transparent' }
        }
      },
      chartOptions2: {
        chart: {
          legend: { position: 'bottom' },
          height: 400,
          chartArea: {'width': '90%', 'height': '80%'},
          backgroundColor: { fill: 'transparent' },
          pieSliceText: 'label'
        }
      },
      chartOptions3: {
        chart: {
          legend: { position: 'bottom' },
          height: 400,
          chartArea: {'width': '90%', 'height': '80%'},
          backgroundColor: { fill: 'transparent' },
          pieSliceText: 'label',
          pieHole: 0.4,
          colors: ['#46A6F7', '#FFE91E']
        }
      },
      chartOptions4: {
        chart: {
          legend: { position: 'bottom' },
          height: 400,
          chartArea: {'width': '90%', 'height': '80%'},
          backgroundColor: { fill: 'transparent' },
          pieSliceText: 'label',
          pieHole: 0.4,
          colors: ['#41B883', '#35495E']
        }
      },
      chartOptions5: {
        chart: {
          legend: { position: 'bottom' },
          height: 400,
          chartArea: {'width': '90%', 'height': '80%'},
          backgroundColor: { fill: 'transparent' },
          pieSliceText: 'label',
          pieHole: 0.4
        }
      },
      avgUserAge: [],
      poList: [],
      genderForgenre: [],
      userTypeForGenre: [],
      locationForGenre: [],
      genreScore: [],
      chartEvents: {
        'select': () => {
          if (this.flag === true) {
            const table = this.$refs.pChart.chartObject
            const selection = table.getSelection()
            var item = selection[0]

            var genName = this.genreScore[item.row + 1][0]

            this.$http.post('/api/Analyst/view', {gen_name: genName}).then((res) => {
              // 성비 파이차트
              var array = []
              array.push(['성별', '성비'])
              array.push(['남성', parseFloat(res.data.result3.MaleClickerRatio)])
              array.push(['여성', parseFloat(res.data.result3.FemaleClickerRatio)])
              this.genderForgenre = array
              // 작가타입 파이차트
              array = []
              array.push(['작가타입', '분포'])
              array.push(['스토리작가', parseFloat(res.data.result3.DrawingClickerRatio)])
              array.push(['그림작가', parseFloat(res.data.result3.StoryClickerRatio)])
              this.userTypeForGenre = array
              // 검색유저 지역분포
              array = []
              array.push(['지역', '분포'])
              for (var key in res.data.result4) {
                if (key !== 'search_gen_number') {
                  if (key !== 'gen_name') {
                    array.push([key, parseFloat(res.data.result4[key])])
                  }
                }
              }
              this.locationForGenre = array
            })
          }
          this.flag = !this.flag
        },
        sample: []
      },
      flag: true
    }
  },
  created () {
    this.$http.post('/api/Analyst/').then((res) => {

      this.poList = res.data.result3
      var array = []
      var json = res.data.result2
      array.push(['장르', '평균연령'])
      for (var key in json) {
        array.push([key, parseInt(json[key])])
      }
      this.avgUserAge = array
      array = []
      json = res.data.result1
      array.push(['장르', '인기도'])
      for (var key2 in json) {
        array.push([key2, parseFloat(json[key2])])
      }
      this.genreScore = array
    })
  }
}
</script>
<style>
</style>
