function myFunction() {

    const toasts = document.querySelectorAll(".toast");
    const toastTriggers = document.querySelectorAll(".toast__trigger");
        
    toastTriggers.forEach((trigger, index) => {
      let toastTimeout;
    
      trigger.addEventListener("click", () => {
        toasts[index].classList.add("toast--active");
        toastTimeout = setTimeout(() => {
          toasts[index].classList.remove("toast--active");
        }, 10000);
      });
    
      toasts[index].addEventListener("click", () => {
        toasts[index].classList.remove("toast--active");
        clearTimeout(toastTimeout);
      });
    });

    var input = document.querySelector('#myinput').value;
    document.getElementById("hello").innerHTML = input;
}



