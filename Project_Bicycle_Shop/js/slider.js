$(function () {

    /* Page 1 */
    $('.news__slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<button class="slick-btn slick-prev news__slick-prev"><img src="img/left-arrow.png" alt="prev"></button>',
        nextArrow: '<button class="slick-btn slick-next news__slick-next"><img src="img/right-arrow.png" alt="next"></button>',
        responsive: [
            {
              breakpoint: 1055,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
                breakpoint: 768,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
        ]
    });

    /* Page 2 */
    $('.category__slider').slick({
        speed: 500,
        fade: true,
        cssEase: 'linear',
        dots: true,
        adaptiveHeight: true,
        prevArrow: '<button class="slick-btn slick-prev"><img src="img/images/left-arrow.png" alt="prev"></button>',
        nextArrow: '<button class="slick-btn slick-next"><img src="img/right-arrow.png" alt="next"></button>'
    });
});