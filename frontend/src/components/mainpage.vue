<template>
<div class="mainpage">
  <section class="text-center">
          <div id="carousel">
            <div id="header-carousel" class="owl-carousel owl-theme">
                <div class="item">
                  <div style="width:100%;height:500px;background:#ED5757;line-height:500px;color:white;font-size:44px;">
                    그림 작가 구하기
                  </div>
                </div>
                <div class="item">
                  <div style="width:100%;height:500px;background:#309EBA;line-height:500px;color:white;font-size:44px;">
                    스토리 작가 구하기</div>
                </div>
                <div class="item">
                  <div style="width:100%;height:500px;background:#9FBC2E;line-height:500px;color:white;font-size:44px;">
                    같이 웹툰 그리기</div>
                </div>
            </div>
          </div>
  </section>
  <!-- FIRST BLOCK -->
  <div id="first-block" class="text-center">
    <div class="line">
      <div class="margin">
        <h2><router-link to="/admin/Users">Go to LOGIN</router-link></h2>
      </div>
    </div>
    <div class="line">
        <div class="margin">
          <div class="s-12 m-6 l-3 margin-bottom">
              <i class="icon-paperplane_ico icon3x"></i>
              <h2 class="margin-bottom">About</h2>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
          </div>
          <div class="s-12 m-6 l-3 margin-bottom">
              <i class="icon-star icon3x"></i>
              <h2 class="margin-bottom">Company</h2>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
          </div>
          <div class="s-12 m-6 l-3 margin-bottom">
              <i class="icon-message icon3x"></i>
              <h2 class="margin-bottom">Services</h2>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
          </div>
          <div class="s-12 m-6 l-3 margin-bottom">
              <i class="icon-mail icon3x"></i>
              <h2 class="margin-bottom">Contact</h2>
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
          </div>
        </div>
    </div>
  </div>
  <!-- SECOND BLOCK -->
  <div id="second-block" class="text-center">
    <div class="line">
        <div class="margin-bottom">
          <div class="margin">
              <article class="s-12 m-12 l-8 center">
                <h1 class="margin-bottom">Amazing title</h1>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                    dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
                    lobortis nisl ut aliquip ex ea commodo consequat.
                </p>
              </article>
          </div>
        </div>
    </div>
  </div>
  <!-- GALLERY -->
  <div id="third-block" class="text-center">
    <div class="line">
        <h2 class="margin-bottom">Gallery</h2>
        <div class="margin">
          <div class="s-12 m-6 l-3">
              <img class="margin-bottom full-img" src="/static/img/gallery-1.svg">
          </div>
          <div class="s-12 m-6 l-3">
              <img class="margin-bottom full-img" src="/static/img/gallery-2.svg">
          </div>
          <div class="s-12 m-6 l-3">
              <img class="margin-bottom full-img" src="/static/img/gallery-3.svg">
          </div>
          <div class="s-12 m-6 l-3">
              <img class="margin-bottom full-img" src="/static/img/gallery-4.svg">
          </div>
        </div>
    </div>
  </div>
  <div id="fourth-block" class="text-center">
    <div class="line">
      <div class="s-12 m-12 l-9 center">
          <div id="news-carousel" class="owl-carousel owl-theme">
            <div class="item">
                <h2 class="margin-bottom">Amazing responsive template</h2>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                  dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
                  lobortis nisl ut aliquip ex ea commodo consequat.
                </p>
            </div>
            <div class="item">
                <h2 class="margin-bottom">Responsive components</h2>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                  dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
                  lobortis nisl ut aliquip ex ea commodo consequat.
                </p>
            </div>
            <div class="item">
                <h2 class="margin-bottom">Retina ready</h2>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                  dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
                  lobortis nisl ut aliquip ex ea commodo consequat.
                </p>
            </div>
          </div>
        </div>
    </div>
  </div>
</div>
</template>

<script scoped>
export default {
  name: 'mainpage',
  methods: {
    makeCarousel () {
      $(document).ready(function () {
        var owl = $('#header-carousel')
        owl.owlCarousel({
          nav: false,
          dots: true,
          items: 1,
          loop: true,
          navText: ['&#xf007', '&#xf006'],
          autoplay: true,
          autoplayTimeout: 3000
        })
        owl = $('#news-carousel')
        owl.owlCarousel({
          nav: false,
          dots: true,
          items: 1,
          loop: true,
          navText: ['&#xf007', '&#xf006'],
          autoplay: true,
          autoplayTimeout: 3000
        })
      })
    }
  },
  mounted () {
    this.makeCarousel()
  }
}
</script>
