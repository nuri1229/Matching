<template>
  <div id="portfolioDetail">
      <div id="first-block">
          <div class="line">
              <div class="margin">
                  <div class="s-12 m-12 l-4 margin-bottom" />
                  <div class="s-12 m-12 l-4 margin-bottom" style="border:1px solid #F0F0F0">
                    <h2>Detail </h2>
                    {{po_number}}
                  </div>
                  <div class="s-12 m-12 l-4 margin-bottom" />
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'portfolioDetail',
  data () {
    return {
      po_number: this.$route.params.poNumber
    }
  },
  methods: {
    onload_function: function () {
      this.$http.post('/api/Main/PortfolioDetail', {'po_number': this.po_number}).then((res) => {
        var a = res.data[0]
        alert(a.po_title)
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
