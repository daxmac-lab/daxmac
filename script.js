/* =======================================
   DAXMAC — WEBSITE JAVASCRIPT
======================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =======================================
       SMOOTH SCROLLING
    ======================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =======================================
       MOBILE NAVIGATION
    ======================================= */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });


        document.querySelectorAll(".nav-links a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =======================================
       STICKY HEADER STATE
    ======================================= */

    const header = document.querySelector(".site-header");

    if (header) {

        const updateHeader = () => {

            header.classList.toggle(
                "scrolled",
                window.scrollY > 40
            );

        };

        updateHeader();

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );

    }


    /* =======================================
       SCROLL REVEAL
    ======================================= */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".problem-flow, " +
        ".method-grid, " +
        ".validation-flow, " +
        ".services-grid, " +
        ".comparison-grid, " +
        ".custom-service, " +
        ".examples-grid, " +
        ".audience-list, " +
        ".about-grid"
    );


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


        revealElements.forEach(element => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });

    }


    /* =======================================
       DAXMAC READY
    ======================================= */

    console.log("DaxMac website loaded.");

});
