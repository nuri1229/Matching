<template>
  <div class="helloworld">
    <h1>helloWorld</h1>
  </div>
</template>

<script>
export default {
  name: 'helloWorld',
  methods: {
    getUsers(){
          	this.$http.get('http://localhost:3000/users')
	        .then((result) => {
			console.log(result)
	})
      }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted (){
      console.log('helloworld');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
