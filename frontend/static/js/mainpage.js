funtion makeCarousel(){
    var owl = $('#header-carousel');
        owl.owlCarousel({
        nav: false,
        dots: true,
        items: 1,
        loop: true,
        navText: ["&#xf007","&#xf006"],
        autoplay: true,
        autoplayTimeout: 3000
      });
      var owl = $('#news-carousel');
      owl.owlCarousel({
        nav: false,
        dots: true,
        items: 1,
        loop: true,
        navText: ["&#xf007","&#xf006"],
        autoplay: true,
        autoplayTimeout: 3000
      });
};