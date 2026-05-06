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