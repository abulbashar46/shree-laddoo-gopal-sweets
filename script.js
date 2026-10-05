/* =====================================================
   SHREE LADDOO GOPAL SWEETS
   WEBSITE JAVASCRIPT
===================================================== */


/* =====================================================
   SELECT ELEMENTS
===================================================== */

const header = document.getElementById("header");

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");

const filterButtons = document.querySelectorAll(".filter-btn");

const menuCards = document.querySelectorAll(".menu-card");

const menuSearch = document.getElementById("menuSearchBox");

const backToTop = document.getElementById("backToTop");

const currentYear = document.getElementById("currentYear");


/* =====================================================
   CURRENT YEAR
===================================================== */

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("open");

        const icon = menuToggle.querySelector("i");

        if (navMenu.classList.contains("open")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

}


/* =====================================================
   CLOSE MOBILE MENU AFTER CLICK
===================================================== */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});


/* =====================================================
   STICKY HEADER
===================================================== */

function handleHeader() {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener("scroll", handleHeader);

handleHeader();


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section[id]");


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 180;


    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.offsetHeight;

        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") ===
                    `#${sectionId}`
                ) {

                    link.classList.add("active");

                }

            });

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);

/* =====================================================
   MENU FILTER + SEARCH
===================================================== */

let selectedCategory = "all";


function filterMenu() {

    const searchTerm = menuSearch
        ? menuSearch.value.toLowerCase().trim()
        : "";


    menuCards.forEach(card => {

        const category =
            card.dataset.category || "";

        const name =
            (card.dataset.name || "").toLowerCase();

        const description =
            card.querySelector("p")
                ?.textContent.toLowerCase() || "";


        // Category match
        const categoryMatch =
            selectedCategory === "all" ||
            category === selectedCategory;


        // Search match
        const searchMatch =
            name.includes(searchTerm) ||
            description.includes(searchTerm);


        // Show / hide
        if (categoryMatch && searchMatch) {

            card.classList.remove("hidden");

        } else {

            card.classList.add("hidden");

        }

    });

}


/* =====================================================
   SEARCH INPUT
===================================================== */

if (menuSearch) {

    menuSearch.addEventListener("input", () => {

        filterMenu();

    });

}


/* =====================================================
   FILTER BUTTONS
===================================================== */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        // Add active to clicked button
        button.classList.add("active");


        // Get category
        selectedCategory =
            button.dataset.category;


        // Filter menu
        filterMenu();

    });

});


/* =====================================================
   INITIAL MENU
===================================================== */

filterMenu();



/* =====================================================
   BACK TO TOP
===================================================== */

function handleBackToTop() {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}


window.addEventListener(
    "scroll",
    handleBackToTop
);


if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =====================================================
   SMOOTH SCROLL FOR INTERNAL LINKS
===================================================== */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener("click", function(event) {

        const targetId =
            this.getAttribute("href");

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
            header.offsetHeight;


        const targetPosition =
            target.offsetTop -
            headerHeight;


        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/* =====================================================
   REVEAL ANIMATION
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".menu-card, .review-card, .quick-item, .about-content, .contact-content"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "revealed"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =====================================================
   ADD REVEAL STYLES DYNAMICALLY
===================================================== */

const revealStyle =
document.createElement("style");


revealStyle.textContent = `

    .reveal {

        opacity: 0;

        transform: translateY(25px);

        transition:
            opacity 0.7s ease,
            transform 0.7s ease;

    }


    .reveal.revealed {

        opacity: 1;

        transform: translateY(0);

    }

`;


document.head.appendChild(
    revealStyle
);


/* =====================================================
   ESCAPE KEY CLOSES MOBILE MENU
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            navMenu.classList.contains("open")
        ) {

            navMenu.classList.remove("open");

            const icon =
                menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    }
);