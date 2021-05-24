$(function(){

    $('.photo__slider').slick({
        speed: 500,
        fade: true,
        cssEase: 'linear',
        dots: true,
        adaptiveHeight: true,
        prevArrow: '<button class="slick-btn slick-prev"><img src="images/left-arrow.png" alt="prev"></button>',
        nextArrow: '<button class="slick-btn slick-next"><img src="images/left-arrow.png" alt="next"></button>'
      });

});