<template>

  <div id="app">
    <nav class="slide-nav aside-nav">
        <ul>
           <li><a href="/">Home</a></li>
           <li>
              <a>Product</a>
              <ul>
                 <li><router-link to="/Login">로그인</router-link></li>
                 <li><router-link to="/admin/Users">가입유저정보</router-link></li>
                 <li><router-link to="/matching/list">유저검색</router-link></li>
                 <li><router-link to="/user/portfolio/create">포폴업로드</router-link></li>
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
               <div class="s-5 l-2 center" style="color:white;font-size:22px">
                Webtoonist Matching
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
