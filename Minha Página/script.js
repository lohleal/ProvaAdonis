document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const aside = document.querySelector("aside");

    menuBtn.addEventListener("click", function () {
      
        if (aside.style.display === "block") {
            aside.style.display = "none";
        } else {
            aside.style.display = "block";
        }
    });
});
