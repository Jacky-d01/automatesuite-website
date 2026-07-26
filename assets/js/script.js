document.documentElement.classList.add("js");

function setLanguage(language) {

    localStorage.setItem("language", language);
    document.documentElement.lang = language;

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

    updateBilingualAriaLabels(language);
    updateBilingualImageAlts(language);

    window.requestAnimationFrame(() => {

    updateActiveAccordionHeights(
        ".faq-accordion.active .accordion-content"
    );

    updateActiveAccordionHeights(
        ".service-accordion.active .accordion-content"
    );

    });

}

function getCurrentLanguage() {

    return localStorage.getItem("language") || "en";

}

function applySavedTheme() {

    const savedTheme =
        localStorage.getItem("theme");

    const themeToggle =
        document.getElementById("theme-toggle");

    const isLight =
        savedTheme === "light";

    document.body.classList.toggle(
        "light-mode",
        isLight
    );

    if (!themeToggle) return;

    themeToggle.textContent =
        isLight ? "🌙" : "☀️";

    themeToggle.setAttribute(
        "aria-label",
        isLight
            ? "Switch to dark mode"
            : "Switch to light mode"
    );

}

function updateBilingualAriaLabels(language) {

    const elements =
        document.querySelectorAll(
            "[data-aria-en][data-aria-fr]"
        );

    elements.forEach((element) => {

        const ariaLabel =
            language === "fr"
                ? element.getAttribute("data-aria-fr")
                : element.getAttribute("data-aria-en");

        if(ariaLabel) {

            element.setAttribute(
                "aria-label",
                ariaLabel
            );

        }

    });

}

function updateBilingualImageAlts(language) {

    const images = document.querySelectorAll(
            "img[data-alt-en][data-alt-fr]"
    );

    images.forEach((image) => {

        const imageAlt =
            language === "fr"
                ? image.getAttribute("data-alt-fr")
                : image.getAttribute("data-alt-en");

        if (imageAlt) {
            image.setAttribute("alt", imageAlt);
        }

    });

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

    applySavedTheme();

    const themeToggle =
        document.getElementById("theme-toggle");

        if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            const isCurrentlyLight =
                document.body.classList.contains(
                    "light-mode"
                );

            localStorage.setItem(
                "theme",
                isCurrentlyLight ? "dark" : "light"
            );

            applySavedTheme();

        });

    }

    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const menuOverlay = document.getElementById("menu-overlay");

    if(!hamburger || !navMenu || !menuOverlay) return;

    /* Open / Close Menu */

    hamburger.addEventListener("click", () => {

    const isOpen =
        navMenu.classList.toggle("active");

    menuOverlay.classList.toggle(
        "active",
        isOpen
    );

    document.body.classList.toggle(
        "menu-open",
        isOpen
    );

    hamburger.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    hamburger.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );

    });

    /* Close Menu On Overlay Click */

    menuOverlay.addEventListener("click", () => {

    navMenu.classList.remove("active");
    menuOverlay.classList.remove("active");
    document.body.classList.remove("menu-open");

    hamburger.setAttribute(
        "aria-expanded",
        "false"
    );

    hamburger.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    });

    /* Close Menu When Clicking Links */

    const navItems = document.querySelectorAll(".nav-links a");

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            navMenu.classList.remove("active");
            menuOverlay.classList.remove("active");
            document.body.classList.remove("menu-open");

            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );

            hamburger.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });

});

window.addEventListener("pageshow", () => {

    applySavedTheme();

});

/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("active");

                /*
                 * Reveal each element only once.
                 * It stays visible after resizing
                 * or changing viewport dimensions.
                 */
                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

} else {

    /*
     * Safe fallback for browsers
     * without IntersectionObserver.
     */
    revealElements.forEach((element) => {

        element.classList.add("active");

    });

}

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

                console.error("EmailJS contact error:", error);

                setSubmitState(
                    submitBtn,
                    false,
                    currentLang === "fr"
                        ? "Discuter de mon projet"
                        : "Discuss My Project"
                );

                alert(
                    currentLang === "fr"
                        ? "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter à hello@automatesuite.io."
                        : "An error occurred while sending your message. Please try again or contact us at hello@automatesuite.io."
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
        document.getElementById("newsletter-form");

    if (newsletterForm) {

        newsletterForm.addEventListener("submit", async function (e) {

            e.preventDefault();

            const currentLang =
                getCurrentLanguage();

            const submitBtn =
                newsletterForm.querySelector(
                    "button[type='submit']"
                );

            const notification =
                document.getElementById(
                    "newsletter-notification"
                );

            const message =
                document.getElementById(
                    "notification-message"
                );

            setSubmitState(
                submitBtn,
                true,
                currentLang === "fr"
                    ? "Inscription..."
                    : "Subscribing..."
            );

            try {

                const emailRequest =
                    emailjs.sendForm(
                        "service_fnchujr",
                        "template_ipivbnt",
                        newsletterForm
                    );

                const timeout =
                    new Promise((_, reject) => {

                        setTimeout(() => {

                            reject(
                                new Error(
                                    "Newsletter request timed out"
                                )
                            );

                        }, 15000);

                    });

                await Promise.race([
                    emailRequest,
                    timeout
                ]);

                if (notification && message) {

                    message.textContent =
                        currentLang === "fr"
                            ? "Votre inscription a bien été enregistrée."
                            : "Your subscription has been successfully recorded.";

                    notification.classList.add("show");

                    setTimeout(() => {

                        notification.classList.remove("show");

                    }, 5000);

                }

                newsletterForm.reset();

            } catch (error) {

                console.error(
                    "EmailJS newsletter error:",
                    error
                );

                if (notification && message) {

                    message.textContent =
                        currentLang === "fr"
                            ? "L'inscription n'a pas pu être envoyée. Veuillez réessayer."
                            : "Your subscription could not be submitted. Please try again.";

                    notification.classList.add("show");

                    setTimeout(() => {

                        notification.classList.remove("show");

                    }, 5000);

                }

            } finally {

                setSubmitState(
                    submitBtn,
                    false,
                    currentLang === "fr"
                        ? "S'abonner"
                        : "Subscribe"
                );

            }

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
