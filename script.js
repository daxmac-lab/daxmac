/* ==========================================
   DAXMAC WEBSITE
   PART 1
========================================== */

/* Smooth Scrolling */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


/* Navbar Background */

const header = document.querySelector("header");

window.addEventListener("scroll",()=>{

    if(window.scrollY > 60){

        header.style.background="rgba(7,17,31,.95)";
        header.style.boxShadow="0 12px 30px rgba(0,0,0,.35)";

    }

    else{

        header.style.background="rgba(7,17,31,.82)";
        header.style.boxShadow="none";

    }

});
/* ==========================================
   PART 2
========================================== */

/* Fade In Sections */

const sections=document.querySelectorAll(".section");

const observer=new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity="1";

            entry.target.style.transform="translateY(0)";

        }

    });

},{
    threshold:.2
});

sections.forEach(section=>{

    section.style.opacity="0";

    section.style.transform="translateY(60px)";

    section.style.transition=".8s";

    observer.observe(section);

});
/* ==========================================
   PART 3
========================================== */

/* Card Hover */

const cards=document.querySelectorAll(".card");

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-10px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0)";

    });

});
/* ==========================================
   PART 4
========================================== */

/* Active Navigation */

const navLinks=document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

    let current="";

    document.querySelectorAll("section").forEach(section=>{

        const top=section.offsetTop-120;

        const height=section.offsetHeight;

        if(window.scrollY>=top){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + current){

            link.classList.add("active");

        }

    });

});
/* ==========================================
   PART 5
========================================== */

/* Console Greeting */

console.log("Welcome to DaxMac");

console.log("Production-first developer onboarding research.");

console.log("https://daxmac-lab.github.io/daxmac/");
