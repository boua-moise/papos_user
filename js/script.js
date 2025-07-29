if (location.pathname !== "/categorie.html" && location.pathname !== "/contenu.html" ) {
    displayPage();
}

function displayPage() {
    setTimeout(() => {
        document.querySelector(".loader").style.display = "none";
        document.querySelector(".main").style.display = "flex";
    }, 1500)
}

function displayPage2() {
    document.querySelector(".main").style.display = "none";
    document.querySelector(".loader").style.display = "flex";
}