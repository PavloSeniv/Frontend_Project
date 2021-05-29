/*
$(function() {
    const modalCall = $("[data-modal]");
    const modalClose = $("[data-close]");

//     $("#modal_btn").click(function(event){
// // TODO ...
//     });

    modalCall.on("click", function(event) {
        event.preventDefault();

        let $this = $(this); // Сохраняє значення дата атрибута, на який ми клікаємо. Тобто ми в цю кнопку сохраняємо дата атрибут або кнопки hire me або кнопки see my resume
        let modalId = $this.data('modal'); // шукаємо ід класу modal

        $(modalId).addClass('show');
        $("body").addClass('no-scroll');

        setTimeout(function () {
            $(modalId).find(".modal__dialog").css({
                transform: "rotateX(0)"
            });
        }, 200);

        $('#worksSlider').slick('setPosition');
    });

    modalClose.on("click", function(event) {
        event.preventDefault();

        let $this = $(this); // Сохраняє значення дата атрибута, на який ми клікаємо. Тобто ми в цю кнопку сохраняємо дата атрибут або кнопки hire me або кнопки see my resume
        let modalParent = $this.parents('.modal'); // знаходить батьківський класс modal. Тобто коли ми клієкамо по кнопці, воно шукає, в якому саме батьківському класі знахолиться кнопка.

        modalParent.find(".modal__dialog").css({
                transform: "rotateX(90deg)"
            });

        setTimeout(function() {
            modalParent.removeClass('show');
            $("body").removeClass('no-scroll');
        }, 400);
    });

    $(".modal").on("click", function(event) {
        let $this = $(this);

        $(this).find(".modal__dialog").css({
                transform: "rotateX(90deg)"
            });

       setTimeout(function() {
            $this.removeClass('show');
            $("body").removeClass('no-scroll');
        }, 400);
    }); // Потрібно, щоб модальне вікно закривалось, якщо клікнути поза ним

    $(".modal__dialog").on("click", function(event) {
        event.stopPropagation(); // Якщо ми клікаємо по елементу moda__dialog, то ми відміняємо клік по його батьківському класі
    });
});*/

var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
    myInput.focus()
})
