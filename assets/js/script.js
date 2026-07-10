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

function getCurrentLanguage() {

    return localStorage.getItem("language") || "en";

}

function setSubmitState(button, disabled, text) {

    if(!button) return;

    button.disabled = disabled;
    button.textContent = text;

}

function updateActiveAccordionHeights(selector) {

    document
    .querySelectorAll(selector)
    .forEach((content) => {

        content.style.maxHeight =
        content.scrollHeight + "px";

    });

}

function initializeAccordionGroup(selector) {

    const accordions =
    document.querySelectorAll(selector);

    if (accordions.length === 0) return;

    accordions[0].classList.add("active");

    const firstContent =
    accordions[0].querySelector(".accordion-content");

    if(firstContent) {

        firstContent.style.maxHeight =
        firstContent.scrollHeight + "px";

    }

    accordions.forEach((accordion) => {

        const header =
        accordion.querySelector(".accordion-header");

        const content =
        accordion.querySelector(".accordion-content");

        if(!header || !content) return;

        header.addEventListener("click", () => {

            const isActive =
            accordion.classList.contains("active");

            accordions.forEach((item) => {

                item.classList.remove("active");

                const itemContent =
                item.querySelector(".accordion-content");

                if(itemContent) {

                    itemContent.style.maxHeight = null;

                }

            });

            if (!isActive) {

                accordion.classList.add("active");

                content.style.maxHeight =
                content.scrollHeight + "px";
            }

        });

    });

}

document.addEventListener("DOMContentLoaded", () => {

    const savedLanguage =
        getCurrentLanguage();

    setLanguage(savedLanguage);

    const savedTheme =
        localStorage.getItem("theme");

    if(savedTheme === "light") {

        document.body.classList.add("light-mode");

    }

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

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const menuOverlay = document.getElementById("menu-overlay");

    if(!hamburger || !navMenu || !menuOverlay) return;

    /* Open / Close Menu */

    hamburger.addEventListener("click", () => {

        navMenu.classList.toggle("active");
        menuOverlay.classList.toggle("active");
        document.body.classList.toggle("menu-open");

    });

    /* Close Menu On Overlay Click */

    menuOverlay.addEventListener("click", () => {

        navMenu.classList.remove("active");
        menuOverlay.classList.remove("active");
        document.body.classList.remove("menu-open");

    });

    /* Close Menu When Clicking Links */

    const navItems = document.querySelectorAll(".nav-links a");

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            navMenu.classList.remove("active");
            menuOverlay.classList.remove("active");
            document.body.classList.remove("menu-open");

        });

    });

});

/* =========================
   SCROLL REVEAL
========================= */

const reveals = document.querySelectorAll(".reveal");

function revealSections() {

    const windowHeight = window.innerHeight;

    reveals.forEach((section) => {

        const revealTop = section.getBoundingClientRect().top;

        const revealPoint = 100;

        if(revealTop < windowHeight - revealPoint) {

            section.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealSections, { passive: true });

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
            getCurrentLanguage();

            const submitBtn =
            contactForm.querySelector("button[type='submit']");

            setSubmitState(
                submitBtn,
                true,
                currentLang === "fr"
                ? "Envoi en cours..."
                : "Sending..."
            );

            emailjs.sendForm(
                "service_fnchujr",
                "template_cqii9iu",
                this
            )

            .then(() => {

                const currentLang =
                getCurrentLanguage();

                window.location.href =
                `contact-success.html?lang=${currentLang}`;

                contactForm.reset();

            })

            .catch((error) => {

                console.error(error);

                setSubmitState(
                    submitBtn,
                    false,
                    currentLang === "fr"
                    ? "Discuter de mon projet"
                    : "Discuss My Project"
                );

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
            getCurrentLanguage();

            const submitBtn =
            newsletterForm.querySelector("button[type='submit']");

            setSubmitState(
                submitBtn,
                true,
                currentLang === "fr"
                ? "Inscription..."
                : "Subscribing..."
            );

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
                getCurrentLanguage();

                if(notification && message) {

                    message.textContent =
                    currentLang === "fr"
                    ? "Votre inscription a été enregistrée. Vous recevrez les prochaines mises à jour dès leur publication."
                    : "Your subscription has been recorded. You'll receive updates whenever new content becomes available.";

                    notification.classList.add("show");

                    setTimeout(() => {

                        notification.classList.remove("show");

                    }, 5000);

                }

                setSubmitState(
                    submitBtn,
                    false,
                    currentLang === "fr"
                    ? "S'abonner"
                    : "Subscribe"
                );

                newsletterForm.reset();

            })

            .catch((error) => {

                console.error(error);

                setSubmitState(
                    submitBtn,
                    false,
                    currentLang === "fr"
                    ? "S'abonner"
                    : "Subscribe"
                );

            });

        });

    }

}

initializeAccordionGroup(".service-accordion");

initializeAccordionGroup(".faq-accordion");

/* Recalculate FAQ heights after page is fully rendered */

window.addEventListener("load", () => {

    updateActiveAccordionHeights(
        ".faq-accordion.active .accordion-content"
    );

});

window.addEventListener("load", () => {

    updateActiveAccordionHeights(
        ".service-accordion.active .accordion-content"
    );

});

const compareButtons =
document.querySelectorAll(".compare-btn");

compareButtons.forEach(button => {

    button.addEventListener("click", () => {

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

        if(!target) return;

        target.classList.add("active");

    });

});

window.addEventListener("load", () => {

    const backToTopBtn =
    document.querySelector(".back-to-top-btn");

    if (!backToTopBtn) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 300) {

            backToTopBtn.classList.add("show");

        } else {

            backToTopBtn.classList.remove("show");

        }

    }, { passive: true });

});
