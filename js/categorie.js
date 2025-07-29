const hero = document.querySelector(".hero");
const ul = document.querySelector("ul");
const title = document.querySelector(".hero h1");
const contentArticles = document.querySelector(".articles");
const category = localStorage.getItem("category");

console.log(location.host, location.hostname, location.href, location.pathname);


let dataReseau, dataSysteme, dataProgrammation, dataCybersecurity, dataIa;

document.addEventListener("DOMContentLoaded", async () => {
    await getAllArticle();
});

async function getAllArticle() {
    try {
        const [pop, reseau, systeme, programmation, cybersecurity, ia] = await Promise.all([
            fetch("http://127.0.0.1:8000/articles/pop_rec"),
            fetch("http://127.0.0.1:8000/articles/reseau/liste"),
            fetch("http://127.0.0.1:8000/articles/systeme/liste"),
            fetch("http://127.0.0.1:8000/articles/programmation/liste"),
            fetch("http://127.0.0.1:8000/articles/cybersecurity/liste"),
            fetch("http://127.0.0.1:8000/articles/ia/liste"),
        ]);

        if (
            pop.ok && reseau.ok && systeme.ok &&
            programmation.ok && cybersecurity.ok && ia.ok
        ) {
            const [dataPop, reseauJson, systemeJson, progJson, cyberJson, iaJson] = await Promise.all([
                pop.json(),
                reseau.json(),
                systeme.json(),
                programmation.json(),
                cybersecurity.json(),
                ia.json(),
            ]);

            for (const element of dataPop.populaires) {
                ul.innerHTML += 
                `
                    <li id="${element.id}">
                        <span class="category">${element.categorie}</span><br>
                        <div>${element.titre}</div>
                    </li>
                `
            }
            
            dataReseau = reseauJson;
            dataSysteme = systemeJson;
            dataProgrammation = progJson;
            dataCybersecurity = cyberJson;
            dataIa = iaJson;

            console.log(dataPop, dataCybersecurity, dataIa, dataReseau, dataProgrammation, dataSysteme);
            displayPage(); // à définir si pas déjà présent
            returnArticles(dataSysteme);
        }
        switch (category) {
            case "reseau":
                hero.style.backgroundImage = `url('../images/${category}.jpg')`
                title.textContent = "Réseau Informatique";
                returnArticles(dataReseau);
                break;
            case "systeme":
                hero.style.backgroundImage = `url('../images/${category}.jpg')`
                title.textContent = "Système Informatique";
                returnArticles(dataSysteme);
                break;
            case "programmation":
                hero.style.backgroundImage = `url('../images/${category}.jpg')`
                title.textContent = "Programmation";
                returnArticles(dataProgrammation);
                break;
            case "cybersecurity":
                hero.style.backgroundImage = `url('../images/${category}.jpg')`
                title.textContent = "Cybersécurité";
                returnArticles(dataCybersecurity);
                break;
            case "ia":
                hero.style.backgroundImage = `url('../images/${category}.jpg')`
                title.textContent = "Intélligence Artificielle";
                returnArticles(dataIa);
                break;
            default:
                console.log("désolé!!!");
                break;
        }

        document.addEventListener("click", (e) => {
            if (e.target.closest("article")) {
                const idArticle = e.target.closest("article");
                localStorage.setItem("viewId", idArticle.id);
                location.pathname = "pages/contenu.html";
            }

            if (e.target.closest("li")){
                const idArticle = e.target.closest("li");
                localStorage.setItem("viewId", idArticle.id);
                location.pathname = "pages/contenu.html";
            }
            
        })

    } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
    }
}

hero.addEventListener("click", (e) => {
    if (e.target.localName === "button") {
        switch (e.target.value) {
            case "reseau":
                localStorage.setItem("category", e.target.value);
                hero.style.backgroundImage = `url('../images/${e.target.value}.jpg')`
                title.textContent = "Réseau Informatique";
                returnArticles(dataReseau);
                location.href = "http://"+location.host + location.pathname + "#article";
                break;
            case "systeme":
                localStorage.setItem("category", e.target.value);
                hero.style.backgroundImage = `url('../images/${e.target.value}.jpg')`
                title.textContent = "Système Informatique";
                returnArticles(dataSysteme);
                location.href = "http://"+location.host + location.pathname + "#article";
                break;
            case "programmation":
                localStorage.setItem("category", e.target.value);
                hero.style.backgroundImage = `url('../images/${e.target.value}.jpg')`
                title.textContent = "Programmation";
                returnArticles(dataProgrammation);
                location.href = "http://"+location.host + location.pathname + "#article";
                break;
            case "cybersecurity":
                localStorage.setItem("category", e.target.value);
                hero.style.backgroundImage = `url('../images/${e.target.value}.jpg')`
                title.textContent = "Cybersécurité";
                returnArticles(dataCybersecurity);
                location.href = "http://"+location.host + location.pathname + "#article";
                break;
            case "ia":
                localStorage.setItem("category", e.target.value);
                hero.style.backgroundImage = `url('../images/${e.target.value}.jpg')`
                title.textContent = "Intélligence Artificielle";
                returnArticles(dataIa);
                location.href = "http://"+location.host + location.pathname + "#article";
                break;
            default:
                console.log("désolé!!!");
                break;
        }
    }
});

function returnArticles(data) {
    contentArticles.innerHTML = ""; // nettoyer avant de réinjecter

    const articles = data.articles;
    for (const element of articles) {
        contentArticles.innerHTML += `
            <article id="${element.id}">
                <div class="article-img">
                    <img src="${element.image}" alt="${element.titre}">
                </div>
                <div class="article-text">
                    <h2>${element.titre}</h2>
                    <p>Un blog pour les curieux du numérique, les passionnés, et les geeks assumés! ✨</p>
                    <div><span class="category">${element.categorie}</span></div>
                </div>
            </article>
        `;
    }
}