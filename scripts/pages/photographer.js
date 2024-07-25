function photographerTemplate(photografers) {
    const { name, id, city, country, tagline, price, portrait } = photografers;
    const picture = `./assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // Création de l'élément <article> : Carte du photographe
        const article = document.createElement( 'article' );
        article.setAttribute("id",`art${id}`)

        // Création de l'élément <a> : Lien vers les medias du photographe
        const linkImg = document.createElement("a");
        linkImg.setAttribute("aria-label", `Lien vers la page du photographe ${name}`)
        linkImg.setAttribute("href", "./photographer.html");
        linkImg.setAttribute("target", "_blank")
        linkImg.dataset.id = id;

        // Création de l'élément <img> : Portrait du photographe
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Portrait du photographe ${name}`);

        // Création de l'élément <h2> : Nom du photographe
        const h2 = document.createElement("h2");
        h2.textContent = name;

        // Création de l'élément <h3> : Localisation du photographe
        const h3Location = document.createElement("h3");
        h3Location.textContent = `${city}, ${country}`;

        // Création de l'élément <h4>  :Slogan du photographe
        const h4Tagline = document.createElement("h4");
        h4Tagline.textContent = tagline;

        // Création de l'élément <p> : Tarif du photographe
        const pPrice = document.createElement("p");
        pPrice.textContent = `${price}€/jour`;

        // Ajout des éléments à leur parent dans le DOM
        article.appendChild(linkImg);
        linkImg.appendChild(img);
        linkImg.appendChild(h2);
        article.appendChild(h3Location);
        article.appendChild(h4Tagline);
        article.appendChild(pPrice);

        return (article);
    }
    return { name, id, city, country, tagline, price, portrait, getUserCardDOM };
}

 // Listener sur le portrait du photographe + affichage page photographe
async function listenPhotographer (id, name, city, country, tagline, portrait) {
    const linksPhotographe = document.querySelector(`#art${id}`);
    linksPhotographe.addEventListener("click", async function (event){
        const id = event.target.dataset.id;
        mediaFilter(id);
        buildPhotograferPage(name, city, country, tagline, portrait);
    });
}

// Récupération des medias des photographes depuis le fichier JSON
async function getMedias() {
    const reponse = await fetch("./data/photographers.json");
    const medias = await reponse.json();
    return medias;
}

 // Filtre les medias avec l'id du photographe
async function mediaFilter (id) {
    const { media } = await getMedias();
    const mediaFiltre = media.filter((item) => item.photographerId == id);
    console.log("mediaFiltre : ", mediaFiltre);
}

function buildPhotograferPage (name, city, country, tagline, portrait) {
    const photographHeader = document.querySelector(".photograph-header");
    const divPhotographerProfile = document.createElement("div");
    divPhotographerProfile.className = "profile";
     // Création de l'élément <h2> : Nom du photographe
     const h2Name = document.createElement("h2");
     h2Name.textContent = name;
     // Création de l'élément <h3> : Localisation du photographe
     const h3Location = document.createElement("h3");
     h3Location.textContent = `${city}, ${country}`;
     // Création de l'élément <h4>  :Slogan du photographe
     const h4Tagline = document.createElement("h4");
     h4Tagline.textContent = tagline;
     photographHeader.appendChild(divPhotographerProfile);
     divPhotographerProfile.appendChild(h2Name);
     divPhotographerProfile.appendChild(h3Location);
     divPhotographerProfile.appendChild(h4Tagline);
     
}