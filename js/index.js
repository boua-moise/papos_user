const hero = document.querySelector(".hero");
console.log(location.host, location.hostname, location.href, location.pathname);

hero.addEventListener("click", (e) => {
    if (e.target.localName === "button") {
        switch (e.target.value) {
            case "reseau":
                localStorage.setItem("category", e.target.value);
                location.href = "http://localhost:5500/pages/categorie.html";
                break;
            case "systeme":
                localStorage.setItem("category", e.target.value);
                location.href = "http://localhost:5500/pages/categorie.html";
                break;
            case "programmation":
                localStorage.setItem("category", e.target.value);
                location.href = "http://localhost:5500/pages/categorie.html";
                break;
            case "cybersecurity":
                localStorage.setItem("category", e.target.value);
                location.href = "http://localhost:5500/pages/categorie.html";
                break;
            case "ia":
                localStorage.setItem("category", e.target.value);
                location.href = "http://localhost:5500/pages/categorie.html";
                break;
            default:
                console.log("désolé!!!");
                break;
        }
    }
});

document.addEventListener("click", (e) => {
    if (e.target.closest("article")) {
        const idArticle = e.target.closest("article");
        localStorage.setItem("viewId", idArticle.id);
        location.pathname = "pages/contenu.html";

    }
})