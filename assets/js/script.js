console.log("SCRIPT START");

function setLanguage(language) {

    localStorage.setItem("language", language);

    /* translations here */

    /* =========================
       TEXT TRANSLATIONS
    ========================= */

    const elements = document.querySelectorAll("[data-lang-en]");

    elements.forEach((element) => {

        if(language === "fr") {

            element.textContent =
                element.getAttribute("data-lang-fr");

        } else {

            element.textContent =
                element.getAttribute("data-lang-en");
        }

    });

    /* =========================
       PLACEHOLDER TRANSLATIONS
    ========================= */

    const placeholderElements = document.querySelectorAll(
        "[data-placeholder-en]"
    );

    placeholderElements.forEach((element) => {

        if(language === "fr") {

            element.placeholder =
                element.getAttribute("data-placeholder-fr");

        } else {

            element.placeholder =
                element.getAttribute("data-placeholder-en");
        }

    });

}

document.addEventListener("DOMContentLoaded", () => {

    const savedLanguage =
        localStorage.getItem("language") || "en";

    setLanguage(savedLanguage);

});

const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")) {
        themeToggle.textContent = "🌙";
    } else {
        themeToggle.textContent = "☀️";
    }

});

document.addEventListener("DOMContentLoaded", () => {

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const menuOverlay = document.getElementById("menu-overlay");

    /* Open / Close Menu */

    hamburger.addEventListener("click", () => {

        navMenu.classList.toggle("active");
        menuOverlay.classList.toggle("active");

    });

    /* Close Menu On Overlay Click */

    menuOverlay.addEventListener("click", () => {

        navMenu.classList.remove("active");
        menuOverlay.classList.remove("active");

    });

    /* Close Menu When Clicking Links */

    const navItems = document.querySelectorAll(".nav-links a");

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            navMenu.classList.remove("active");
            menuOverlay.classList.remove("active");

        });

    });

});

/* =========================
   SCROLL REVEAL
========================= */

const reveals = document.querySelectorAll(".reveal");

function revealSections() {

    reveals.forEach((section) => {

        const windowHeight = window.innerHeight;

        const revealTop = section.getBoundingClientRect().top;

        const revealPoint = 100;

        if(revealTop < windowHeight - revealPoint) {

            section.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealSections);

/* Initial Check */

revealSections();

/* =========================
   EMAILJS CONTACT FORM
========================= */

if (typeof emailjs !== "undefined") {

    emailjs.init("rY5u_6m_UtVfQsO5G");

    const contactForm =
    document.getElementById("contact-form");

    if(contactForm) {

        contactForm.addEventListener("submit", function(e) {

            e.preventDefault();

            emailjs.sendForm(
                "service_fnchujr",
                "template_cqii9iu",
                this
            )

            .then(() => {

                const currentLang =
                localStorage.getItem("language") || "en";

                alert(
                    currentLang === "fr"
                    ? "Message envoyé avec succès !"
                    : "Message sent successfully!"
                );

                contactForm.reset();

            })

            .catch((error) => {

                console.error(error);

            });

        });

    }

}

/* =========================
   NEWSLETTER FORM
========================= */

if (typeof emailjs !== "undefined") {

    const newsletterForm =
    document.querySelector(".newsletter-form");

    if(newsletterForm) {

        newsletterForm.addEventListener("submit", function(e) {

            e.preventDefault();

            emailjs.sendForm(
                "service_fnchujr",
                "template_ipivbnt",
                this
            )

            .then(() => {

                newsletterForm.reset();

            })

            .catch((error) => {

                console.error(error);

            });

        });

    }

}

document
.querySelectorAll(".accordion-header")
.forEach(button => {

    button.addEventListener("click", () => {

        const content =
        button.nextElementSibling;

        content.style.display =
        content.style.display === "block"
        ? "none"
        : "block";

    });

});

const icon =
button.querySelector(".accordion-icon");

if(content.style.display === "block") {

    content.style.display = "none";
    icon.textContent = "+";

} else {

    content.style.display = "block";
    icon.textContent = "−";

}