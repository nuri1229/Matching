<template>
  <div id="Top">
    <nav class="slide-nav aside-nav">
        <ul>
           <li><a>Home123213</a></li>
           <li>
              <a>Product</a>
              <ul>
                 <li><a>Product 1</a></li>
                 <li><a>Product 2</a></li>
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
                 <li><a>About</a></li>
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
       <section class="text-center">
           <!-- CAROUSEL --> 
           <div id="carousel">
              <div id="header-carousel" class="owl-carousel owl-theme">
                 <div class="item">
                    <img src="/static/img/header-1.svg" alt="">
                    <div class="line">
                       <h2>Amazing responsive carousel</h2>
                    </div>
                 </div>
                 <div class="item">
                    <img src="/static/img/header-2.svg" alt="">
                    <div class="line">
                       <h2>Fully responsive components</h2>
                    </div>
                 </div>
                 <div class="item">
                    <img src="/static/img/header-3.svg" alt="">
                    <div class="line">
                       <h2>Build new layout in 10 minutes!</h2>
                    </div>
                 </div>
              </div>
           </div>
        </section>
  </div>
</template>

<script>
export default {
  name: 'Top'
}
</script>

