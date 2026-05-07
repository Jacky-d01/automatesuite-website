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