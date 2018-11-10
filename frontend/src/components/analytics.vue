<template>
  <div id="analyst">
    <div id="first-block">
      <div class="line">
        <div class="margin">
          <div class="s-12 m-12 l-12 margin-bottom">
            <h4><b>장르별 인기도</b></h4>
            <div v-if="flag">
            <GChart type="PieChart" :data="genreScore" :options="chartOptions2.chart" :events="chartEvents" ref="pChart"/>
            </div>
            <div v-else>
              <GChart type="ColumnChart" :data="sample" :options="chartOptions.chart" :events="chartEvents" ref="pChart2"/>
            </div>
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
      chartData: [
        ['장르', '평균연령'],
        ['일상', 1000],
        ['로맨스', 1170]

      ],
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
      avgUserAge: [],
      poList: [],
      genreScore: [],
      chartEvents: {
        'select': () => {
          const table = this.$refs.pChart.chartObject
          const selection = table.getSelection()
          var item = selection[0]
          // alert(item.row)
          // alert(this.genreScore[item.row + 1][0])
          var genName = this.genreScore[item.row + 1][0]
          alert(genName)
          this.$http.post('/api/Analyst/view', {gen_name: genName}).then((res) =>
            alert(res.data)
          )
          //this.sample = this.chartData
          //this.flag = false
          //alert(typeof(selection))
          //alert(selection)
          // alert(this.poList.length)
        },
        sample: []
      },
      flag: true
    }
  },
  created () {
    this.$http.post('/api/Analyst/').then((res) => {
      //console.log('result', res.data)
      //console.log('result1', res.data.result1)
      //console.log('result2', res.data.result2)
      //console.log('result3', res.data.result3)
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
