$(function () {

    $('.news__slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<button class="slick-btn slick-prev"><img src="img/left-arrow.png" alt="prev"></button>',
        nextArrow: '<button class="slick-btn slick-next"><img src="img/right-arrow.png" alt="next"></button>'
    });
});

$(function () {

    $('.photo__slider').slick({
        speed: 500,
        fade: true,
        cssEase: 'linear',
        dots: true,
        adaptiveHeight: true,
        prevArrow: '<button class="slick-btn slick-prev"><img src="../img/Left__Arrow__Item_Catalog.png" alt="prev"></button>',
        nextArrow: '<button class="slick-btn slick-next"><img src="../img/Left__Arrow__Item_Catalog.png" alt="next"></button>'
    });

});