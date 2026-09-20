/* =========================================================
   DAXMAC — MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-menu a");
    const revealElements = document.querySelectorAll(".reveal");
    const currentYear = document.querySelector("#current-year");


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    function openMenu() {
        if (!menuToggle || !mobileMenu) return;

        menuToggle.classList.add("active");
        mobileMenu.classList.add("open");
        document.body.classList.add("menu-open");

        menuToggle.setAttribute("aria-expanded", "true");
    }


    function closeMenu() {
        if (!menuToggle || !mobileMenu) return;

        menuToggle.classList.remove("active");
        mobileMenu.classList.remove("open");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
    }


    function toggleMenu() {
        if (!mobileMenu) return;

        if (mobileMenu.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }
    }


    if (menuToggle && mobileMenu) {

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Toggle navigation");

        menuToggle.addEventListener("click", toggleMenu);


        /* Close after selecting a navigation item */

        mobileLinks.forEach(link => {
            link.addEventListener("click", () => {
                closeMenu();
            });
        });


        /* Close with Escape */

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });


        /* Close when clicking outside the menu */

        document.addEventListener("click", event => {

            const clickedInsideMenu =
                mobileMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                mobileMenu.classList.contains("open") &&
                !clickedInsideMenu &&
                !clickedToggle
            ) {
                closeMenu();
            }

        });


        /* Close when returning to desktop layout */

        window.addEventListener("resize", () => {

            if (window.innerWidth > 900) {
                closeMenu();
            }

        });

    }


    /* =====================================================
       STICKY HEADER
    ===================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 25) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        revealElements.length &&
        !reducedMotion &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add("revealed");

                        observer.unobserve(entry.target);

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        /* If animation is unsupported or reduced,
           show everything immediately. */

        revealElements.forEach(element => {
            element.classList.add("revealed");
        });

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       SMOOTH INTERNAL NAVIGATION
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                18;

            window.scrollTo({
                top: targetPosition,
                behavior: reducedMotion
                    ? "auto"
                    : "smooth"
            });

        });

    });


    /* =====================================================
       ACTIVE SECTION TRACKING
       Adds .active-section to the navigation link
       corresponding to the section currently in view.
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navigationLinks =
        document.querySelectorAll(
            '.desktop-nav a[href^="#"]'
        );


    if (
        sections.length &&
        navigationLinks.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const id =
                            entry.target.getAttribute("id");

                        navigationLinks.forEach(link => {

                            link.classList.remove(
                                "active-section"
                            );

                            if (
                                link.getAttribute("href") ===
                                `#${id}`
                            ) {
                                link.classList.add(
                                    "active-section"
                                );
                            }

                        });

                    });

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px"
                }
            );


        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    /* =====================================================
       ESCAPE HATCH FOR BROKEN HASH LINKS
       ===================================================== */

    if (
        window.location.hash &&
        document.querySelector(window.location.hash)
    ) {

        setTimeout(() => {

            const target =
                document.querySelector(
                    window.location.hash
                );

            if (!target) return;

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            window.scrollTo({
                top:
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    18,
                behavior: "auto"
            });

        }, 50);

    }

});
