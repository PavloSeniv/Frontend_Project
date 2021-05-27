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

    (function () {
        var addTime = document.getElementById('add');
      
        addTime.addEventListener('click', getN);
      
        function getN() {
          var getNum = document.getElementById('get_num').value;
          alert(
            'Вітаємо ' +
              getNum +
              '.\nМожете ознайомитися з товарами в нашому магазині'
          );
        }
      })();

});