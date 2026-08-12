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

    updateThemeToggleAccessibility(themeToggle);

}

function updateHamburgerAccessibility(hamburger, isOpen) {

    if (!hamburger) return;

    hamburger.dataset.ariaEn =
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu";

    hamburger.dataset.ariaFr =
        isOpen
            ? "Fermer le menu de navigation"
            : "Ouvrir le menu de navigation";

    updateBilingualAriaLabels(
        getCurrentLanguage()
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

    const groupName =
        selector
            .replace(".", "")
            .replace(/[^a-zA-Z0-9-]/g, "-");

    function closeAccordion(accordion) {

        accordion.classList.remove("active");

        const header =
            accordion.querySelector(".accordion-header");

        const content =
            accordion.querySelector(".accordion-content");

        if (header) {

            header.setAttribute(
                "aria-expanded",
                "false"
            );

        }

        if (content) {

            content.style.maxHeight = null;

            content.setAttribute(
                "aria-hidden",
                "true"
            );

        }

    }

    function openAccordion(accordion) {

        accordion.classList.add("active");

        const header =
            accordion.querySelector(".accordion-header");

        const content =
            accordion.querySelector(".accordion-content");

        if (header) {

            header.setAttribute(
                "aria-expanded",
                "true"
            );

        }

        if (content) {

            content.setAttribute(
                "aria-hidden",
                "false"
            );

            content.style.maxHeight =
                content.scrollHeight + "px";

        }

    }

    accordions.forEach((accordion, index) => {

        const header =
            accordion.querySelector(".accordion-header");

        const content =
            accordion.querySelector(".accordion-content");

        if (!header || !content) return;

        const contentId =
            content.id ||
            `${groupName}-content-${index + 1}`;

        content.id = contentId;

        header.setAttribute(
            "aria-controls",
            contentId
        );

        header.setAttribute(
            "aria-expanded",
            "false"
        );

        content.setAttribute(
            "aria-hidden",
            "true"
        );

        /*
         * Temporary accessibility support for any
         * accordion headers that are still div elements.
         */
        if (header.tagName !== "BUTTON") {

            header.setAttribute(
                "role",
                "button"
            );

            header.setAttribute(
                "tabindex",
                "0"
            );

        }

        function toggleAccordion() {

            const isActive =
                accordion.classList.contains("active");

            accordions.forEach((item) => {

                closeAccordion(item);

            });

            if (!isActive) {

                openAccordion(accordion);

            }

        }

        header.addEventListener(
            "click",
            toggleAccordion
        );

        if (header.tagName !== "BUTTON") {

            header.addEventListener(
                "keydown",
                (event) => {

                    if (
                        event.key !== "Enter" &&
                        event.key !== " "
                    ) {
                        return;
                    }

                    event.preventDefault();
                    toggleAccordion();

                }
            );

        }

    });

    openAccordion(accordions[0]);

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

    updateHamburgerAccessibility(
    hamburger,
    isOpen
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

    updateHamburgerAccessibility(
    hamburger,
    false
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

            updateHamburgerAccessibility(
                hamburger,
                false
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
   CONTACT FORM
========================= */

const contactForm =
    document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();

            const currentLang =
                getCurrentLanguage();

            const submitBtn =
                contactForm.querySelector(
                    "button[type='submit']"
                );

            setSubmitState(
                submitBtn,
                true,
                currentLang === "fr"
                    ? "Envoi en cours..."
                    : "Sending..."
            );

            const formData =
                new FormData(contactForm);

            const payload = {
                name:
                    formData.get("user_name") || "",

                email:
                    formData.get("user_email") || "",

                message:
                    formData.get("message") || "",

                leadType:
                    formData.get("leadType")
                    || "General Contact",

                selectedSolution:
                    formData.get("selectedSolution")
                    || "Contact Page",

                sourcePage:
                    formData.get("sourcePage")
                    || "Contact",

                website:
                    formData.get("website") || "",

                language:
                    currentLang
            };

            const controller =
                new AbortController();

            const timeoutId =
                setTimeout(() => {

                    controller.abort();

                }, 15000);
            
            try {

            const response =
                await fetch(
                    "/api/contact.php",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",

                            "Accept":
                                "application/json"
                        },

                        body:
                            JSON.stringify(payload),

                        signal:
                            controller.signal
                    }
                );

            const result =
                await response.json();

                if (
                    !response.ok
                    || !result.success
                ) {

                    throw new Error(
                        result.message
                        || "Contact request failed."
                    );

                }

                contactForm.reset();

                window.location.href =
                    `contact-success.html?lang=${currentLang}`;

            } catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );

                setSubmitState(
                    submitBtn,
                    false,
                    currentLang === "fr"
                        ? "Discuter de mon projet"
                        : "Discuss My Project"
                );

                if (error.name === "AbortError") {

                    alert(
                        currentLang === "fr"
                            ? "La demande a pris trop de temps. Veuillez réessayer."
                            : "The request took too long. Please try again."
                    );

                } else {

                    alert(
                        error.message
                        || (
                            currentLang === "fr"
                                ? "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter à hello@automatesuite.io."
                                : "An error occurred while sending your message. Please try again or contact us at hello@automatesuite.io."
                        )
                    );

                }

            } finally {

                clearTimeout(timeoutId);

            }

        }
    );

}

/* =========================
   NEWSLETTER FORM
========================= */

const newsletterForm =
    document.getElementById("newsletter-form");

if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        async function (e) {

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

            const emailInput =
                document.getElementById(
                    "newsletter-email"
                );

            const honeypot =
                newsletterForm.querySelector(
                    "input[name='website']"
                );

            setSubmitState(
                submitBtn,
                true,
                currentLang === "fr"
                    ? "Inscription..."
                    : "Subscribing..."
            );

            try {

                const controller =
                    new AbortController();

                const timeoutId =
                    setTimeout(() => {

                        controller.abort();

                    }, 15000);

                const response =
                    await fetch(
                        "/api/newsletter/subscribe.php",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                "Accept":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                email:
                                    emailInput.value.trim(),

                                language:
                                    currentLang,

                                website:
                                    honeypot
                                        ? honeypot.value
                                        : ""
                            }),

                            signal:
                                controller.signal
                        }
                    );

                clearTimeout(timeoutId);

                let data;

                try {

                    data =
                        await response.json();

                } catch {

                    throw new Error(
                        "Invalid server response"
                    );

                }

                if (!response.ok || !data.success) {

                    const error =
                        new Error(
                            data.message ||
                            "Newsletter request failed"
                        );

                    error.status =
                        response.status;

                    throw error;
                }

                if (notification && message) {

                    message.textContent =
                        currentLang === "fr"
                            ? "Veuillez consulter votre boîte de réception pour confirmer votre inscription."
                            : "Please check your inbox to confirm your subscription.";

                    notification.classList.add(
                        "show"
                    );

                    setTimeout(() => {

                        notification.classList.remove(
                            "show"
                        );

                    }, 7000);

                }

                newsletterForm.reset();

            } catch (error) {

                console.error(
                    "Newsletter API error:",
                    error
                );

                if (notification && message) {

                    if (error.name === "AbortError") {

                        message.textContent =
                            currentLang === "fr"
                                ? "La demande a pris trop de temps. Veuillez réessayer."
                                : "The request took too long. Please try again.";

                    } else if (error.status === 429) {

                        message.textContent =
                            currentLang === "fr"
                                ? "Trop de tentatives. Veuillez réessayer plus tard."
                                : "Too many attempts. Please try again later.";

                    } else if (error.status === 422) {

                        message.textContent =
                            currentLang === "fr"
                                ? "Veuillez saisir une adresse e-mail valide."
                                : "Please enter a valid email address.";

                    } else {

                        message.textContent =
                            currentLang === "fr"
                                ? "L'inscription n'a pas pu être traitée. Veuillez réessayer."
                                : "Your subscription could not be processed. Please try again.";

                    }

                    notification.classList.add(
                        "show"
                    );

                    setTimeout(() => {

                        notification.classList.remove(
                            "show"
                        );

                    }, 7000);

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

        }
    );

}

initializeAccordionGroup(".service-accordion");

initializeAccordionGroup(".faq-accordion");

observeActiveAccordionHeights(
    ".service-accordion .accordion-content"
);

observeActiveAccordionHeights(
    ".faq-accordion .accordion-content"
);

window.addEventListener("resize", () => {

    updateActiveAccordionHeights(
        ".service-accordion.active .accordion-content"
    );

    updateActiveAccordionHeights(
        ".faq-accordion.active .accordion-content"
    );

});

function observeActiveAccordionHeights(selector) {

    if (!("ResizeObserver" in window)) return;

    const contents =
        document.querySelectorAll(selector);

    contents.forEach((content) => {

        const accordion =
            content.closest(
                ".service-accordion, .faq-accordion"
            );

        if (!accordion) return;

        const observer =
            new ResizeObserver(() => {

                if (
                    !accordion.classList.contains(
                        "active"
                    )
                ) {
                    return;
                }

                content.style.maxHeight =
                    content.scrollHeight + "px";

            });

        observer.observe(content);

    });

}

/* Recalculate active accordion heights after full rendering */

window.addEventListener("load", () => {

    updateActiveAccordionHeights(
        ".faq-accordion.active .accordion-content"
    );

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

function updateThemeToggleAccessibility(themeToggle) {

    if (!themeToggle) return;

    const isLight =
        document.body.classList.contains("light-mode");

    themeToggle.dataset.ariaEn =
        isLight
            ? "Switch to dark mode"
            : "Switch to light mode";

    themeToggle.dataset.ariaFr =
        isLight
            ? "Passer au mode sombre"
            : "Passer au mode clair";

    updateBilingualAriaLabels(getCurrentLanguage());

}

/* Case-study screenshot lightbox */

function initializeCaseStudyLightbox() {

    const lightbox =
        document.getElementById("case-study-lightbox");

    const lightboxImage =
        document.getElementById("case-study-lightbox-image");

    const closeButton =
        lightbox?.querySelector(".case-study-lightbox-close");

    const backdrop =
        lightbox?.querySelector(".case-study-lightbox-backdrop");

    const imageButtons =
        document.querySelectorAll(".case-study-image-open");

    if (
        !lightbox ||
        !lightboxImage ||
        !closeButton ||
        !backdrop
    ) {
        return;
    }

    let lastFocusedElement = null;

    function openLightbox(button) {

        const imageSource = button.dataset.imageSrc;

        const currentLanguage =
            getCurrentLanguage();

        const imageAlt =
            currentLanguage === "fr"
                ? button.dataset.imageAltFr || ""
                : button.dataset.imageAltEn || "";

        if (!imageSource) return;

        lastFocusedElement =
            document.activeElement;

        lightboxImage.src = imageSource;
        lightboxImage.alt = imageAlt;

        lightbox.removeAttribute("inert");
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.classList.add("lightbox-open");

        closeButton.focus();

    }

    function closeLightbox() {

        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        lightbox.setAttribute("inert", "");

        document.body.classList.remove("lightbox-open");

        lightboxImage.removeAttribute("src");
        lightboxImage.alt = "";

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }

    }

    imageButtons.forEach((button) => {

        button.addEventListener("click", () => {
            openLightbox(button);
        });

    });

    closeButton.addEventListener(
        "click",
        closeLightbox
    );

    backdrop.addEventListener(
        "click",
        closeLightbox
    );

    document.addEventListener("keydown", (event) => {

        if (!lightbox.classList.contains("active")) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "Tab") {
            event.preventDefault();
            closeButton.focus();
        }

    });

}

initializeCaseStudyLightbox();