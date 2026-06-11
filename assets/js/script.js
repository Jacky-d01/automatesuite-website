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

    const savedTheme =
        localStorage.getItem("theme");

    if(savedTheme === "light") {

        document.body.classList.add("light-mode");

    }

});

const themeToggle =
document.getElementById("theme-toggle");

if(themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle(
            "light-mode"
        );

        if(document.body.classList.contains(
            "light-mode"
        )) {

            themeToggle.textContent = "🌙";

            localStorage.setItem(
                "theme",
                "light"
            );

        } else {

            themeToggle.textContent = "☀️";

            localStorage.setItem(
                "theme",
                "dark"
            );

        }

    });

}

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

            const currentLang =
            localStorage.getItem("language") || "en";

            const submitBtn =
            contactForm.querySelector("button[type='submit']");

            submitBtn.disabled = true;

            submitBtn.textContent =
            currentLang === "fr"
            ? "Envoi en cours..."
            : "Sending...";

            emailjs.sendForm(
                "service_fnchujr",
                "template_cqii9iu",
                this
            )

            .then(() => {

                const currentLang =
                localStorage.getItem("language") || "en";

                window.location.href =
                `contact-success.html?lang=${currentLang}`;

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

            const currentLang =
            localStorage.getItem("language") || "en";

            const submitBtn =
            newsletterForm.querySelector("button[type='submit']");

            submitBtn.disabled = true;

            submitBtn.textContent =
            currentLang === "fr"
            ? "Inscription..."
            : "Subscribing...";

            emailjs.sendForm(
                "service_fnchujr",
                "template_ipivbnt",
                this
            )

            .then(() => {

                const notification =
                document.getElementById("newsletter-notification");

                const message =
                document.getElementById("notification-message");

                const currentLang =
                localStorage.getItem("language") || "en";

                message.textContent =
                currentLang === "fr"
                ? "Votre inscription a été enregistrée. Vous recevrez les prochaines mises à jour dès leur publication."
                : "Your subscription has been recorded. You'll receive updates whenever new content becomes available.";

                notification.classList.add("show");

                setTimeout(() => {

                    notification.classList.remove("show");

                }, 5000);

                submitBtn.disabled = false;

                submitBtn.textContent =
                currentLang === "fr"
                ? "S'abonner"
                : "Subscribe";

                newsletterForm.reset();

            })

            .catch((error) => {

                console.error(error);

                submitBtn.disabled = false;

                submitBtn.textContent =
                currentLang === "fr"
                ? "S'abonner"
                : "Subscribe";

            });

        });

    }

}

const accordions =
document.querySelectorAll(".service-accordion");

/* Open first accordion by default */

if (accordions.length > 0) {

    accordions[0].classList.add("active");

    const firstContent =
    accordions[0].querySelector(".accordion-content");

    firstContent.style.maxHeight =
    firstContent.scrollHeight + "px";
}

accordions.forEach((accordion) => {

    const header =
    accordion.querySelector(".accordion-header");

    const content =
    accordion.querySelector(".accordion-content");

    header.addEventListener("click", () => {

        const isActive =
        accordion.classList.contains("active");

        /* Close all */

        accordions.forEach((item) => {

            item.classList.remove("active");

            item.querySelector(
                ".accordion-content"
            ).style.maxHeight = null;

        });

        /* Reopen clicked one */

        if (!isActive) {

            accordion.classList.add("active");

            content.style.maxHeight =
            content.scrollHeight + "px";
        }

    });

});

const faqAccordions =
document.querySelectorAll(".faq-accordion");

/* Open first FAQ by default */

if (faqAccordions.length > 0) {

    faqAccordions[0].classList.add("active");

    const firstContent =
    faqAccordions[0].querySelector(
        ".accordion-content"
    );

    firstContent.style.maxHeight =
    firstContent.scrollHeight + "px";

}

faqAccordions.forEach((accordion) => {

    const header =
    accordion.querySelector(
        ".accordion-header"
    );

    const content =
    accordion.querySelector(
        ".accordion-content"
    );

    header.addEventListener("click", () => {

        const isActive =
        accordion.classList.contains(
            "active"
        );

        faqAccordions.forEach((item) => {

            item.classList.remove(
                "active"
            );

            item.querySelector(
                ".accordion-content"
            ).style.maxHeight = null;

        });

        if (!isActive) {

            accordion.classList.add(
                "active"
            );

            content.style.maxHeight =
            content.scrollHeight + "px";

        }

    });

});

/* Recalculate FAQ heights after page is fully rendered */

window.addEventListener("load", () => {

    document
    .querySelectorAll(
        ".faq-accordion.active .accordion-content"
    )
    .forEach((content) => {

        content.style.maxHeight =
        content.scrollHeight + "px";

    });

});

const compareButtons =
document.querySelectorAll(".compare-btn");

console.log("Buttons found:", compareButtons.length);

compareButtons.forEach(button => {

    button.addEventListener("click", () => {

        console.log(
            "Clicked:",
            button.dataset.target
        );

        compareButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        document
        .querySelectorAll(".compare-content")
        .forEach(content =>
            content.classList.remove("active")
        );

        const target =
        document.getElementById(
            button.dataset.target + "-view"
        );

        console.log(target);

        target.classList.add("active");

    });

});