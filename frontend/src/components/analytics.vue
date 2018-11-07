<template>
  <div id="analyst">
    <div id="first-block">
      <div class="line">
        <div class="margin">
          <div class="s-12 m-12 l-12 margin-bottom">
            <h2>이용자분석</h2>
            <hr>
              <GChart type="ColumnChart" :data="chartData" :options="chartOptions"/>
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
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2014', 1000, 400, 200],
        ['2015', 1170, 460, 250],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350]
      ],
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        }
      }
    }
  },
  created () {
    this.$http.post('/api/Analyst/').then((res) => {
      console.log('result', res.result)
      console.log('result1', res.result.result1)
      console.log('result2', res.result.result2)
      console.log('result3', res.result.result3)
    })
  }
}
</script>
<style>
</style>
