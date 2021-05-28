$(function () {

    $('.photo__slider').slick({
        speed: 500,
        fade: true,
        cssEase: 'linear',
        dots: true,
        adaptiveHeight: true,
        prevArrow: '<button class="slick-btn slick-prev"><img src="img/images/left-arrow.png" alt="prev"></button>',
        nextArrow: '<button class="slick-btn slick-next"><img src="img/right-arrow.png" alt="next"></button>'
    });

});

function myFunction() {
    alert("Вітаємо " + document.getElementById("myinput").value + ".\nМожете ознайомитися з товарами на сайті!!!");
}
