//При втраті фокусу  із меню воно згортається

document.addEventListener("DOMContentLoaded", function () {

    document.querySelector(".navbar-toggler").addEventListener("blur", //Втрата фокуса на об'єкті
        function (event) {
            var screenWidth = window.innerWidth;
            if (screenWidth < 768) {
               // document.getElementById("navbarToggler").classList.remove("show"); // Грубий варіант згортання меню
                let tempCollapse = new bootstrap.Collapse(document.getElementById("navbarToggler"), {toggle: true});
            }
        });
});