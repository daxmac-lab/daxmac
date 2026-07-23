/* ==========================================
   DAXMAC WEBSITE
   script.js
========================================== */

/* Smooth scrolling for navigation */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        if (target) {

            target.scrollIntoView({
                behavior: 'smooth'
            });

        }

    });

});


/* Change navbar when scrolling */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background = "rgba(15,23,42,.90)";
        header.style.boxShadow = "0 10px 25px rgba(0,0,0,.25)";

    } else {

        header.style.background = "rgba(15,23,42,.65)";
        header.style.boxShadow = "none";

    }

});
