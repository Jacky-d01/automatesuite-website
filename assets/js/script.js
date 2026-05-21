function setLanguage(language) {

    const elements = document.querySelectorAll("[data-lang-en]");

    elements.forEach(element => {

        if(language === "fr") {
            element.textContent = element.getAttribute("data-lang-fr");
        } else {
            element.textContent = element.getAttribute("data-lang-en");
        }

    });

}

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