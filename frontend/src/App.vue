<template>

  <div id="app">
    <nav class="slide-nav aside-nav">
        <ul>
           <li><a href="/">Home123213</a></li>
           <li>
              <a>Product</a>
              <ul>
                 <li><router-link to="/Login">로그인</router-link></li>
                 <li><router-link to="/admin/Users">가입유저정보</router-link></li>
                 <li>
                    <a>Product 3</a>
                    <ul>
                       <li><a>Product 3-1</a></li>
                       <li><a>Product 3-2</a></li>
                       <li><a>Product 3-3</a></li>
                    </ul>
                 </li>
              </ul>
           </li>
           <li>
              <a>Company</a>
              <ul>
                 <li><a href="/Test">About</a></li>
                 <li><a>Location</a></li>
              </ul>
           </li>
           <li><a>Contact</a></li>
        </ul>
      </nav>
      <!--<section class="slide-content">-->
        <header>
          <!-- LOGO -->
          <nav>
            <div class="line">
               <div class="s-5 l-2 center">
                  <img class="full-img" src="/static/img/logo.svg">
               </div>
            </div>
          </nav>
        </header>
    <router-view/>
        <footer>
           <div class="line">
              <div class="s-12 l-6">
                 <p>Copyright 2018, Vision Design - graphic zoo</p>
              </div>
              <div class="s-12 l-6">
                 <a class="right" href="http://www.myresponsee.com" title="Responsee - lightweight responsive framework">
                 누리어진프로젝트
                 </a>
              </div>
           </div>
        </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">

#app {

}

</style>
