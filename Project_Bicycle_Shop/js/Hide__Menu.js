//При втраті фокусу  із меню воно згортається

document.addEventListener("DOMContentLoaded", function () {

    document.querySelector(".navbar-toggler").addEventListener("blur", //Втрата фокуса на об'єкті
        function (event) {
            var screenWidth = window.innerWidth;
            if (screenWidth < 2000) {
// document.getElementById("navbarToggler").classList.remove("show"); // Грубий варіант згортання меню
                let tempCollapse = new bootstrap.Collapse(document.getElementById("navbarToggler"), {toggle: true});
            }
        });
});

/*
/!*Для зміни кольору меню*!/
$(document).ready(function(){
$(window).on("scroll",function() {
var wn = $(window).scrollTop();
if(wn > 50){
$(".navbar").css("background","rgb(0,0,0)");
}
else{
$(".navbar").css("background","none")
}
});
});*/
