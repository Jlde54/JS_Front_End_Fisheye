/**
 * 
 * @param {*} data 
 * @returns 
 */
function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;
    /**
     * 
     * @returns 
     */
    function getUserCardDOM() {
        // Création des éléments <article> et <a> : Carte et lien du photographe
        const article = document.createElement( 'article' );
        const linkImg = document.createElement("a");
        linkImg.setAttribute("aria-label", `Lien vers la page du photographe ${name}`)
        // Suppression des espaces dans le nom du photgraphe
        const nameWoSpace = name.split(' ').join('');
        linkImg.setAttribute("href", `./${nameWoSpace}.html`);
        // Création de l'élément <img> : Portrait du photographe
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Portrait de ${name}`);
        img.setAttribute("aria-label", `Portrait du photographe ${name}`);
        // Création de l'élément <h2> : Nom du photographe
        const h2 = document.createElement("h2");
        h2.textContent = name;
        h2.setAttribute("aria-label", `Nom du photographe ${name}`);
        // Création de l'élément <h3> : Localisation du photographe
        const h3Location = document.createElement("h3");
        h3Location.textContent = `${city}, ${country}`;
        h3Location.setAttribute("aria-label", `Le photographe ${name} est situé à ${city}, ${country}`);
        // Création de l'élément <h4>  :Slogan du photographe
        const h4Tagline = document.createElement("h4");
        h4Tagline.textContent = tagline;
        h4Tagline.setAttribute("aria-label", `Le slogan du photographe ${name} est ${tagline}`);
        // Création de l'élément <p> : Tarif du photographe
        const pPrice = document.createElement("p");
        pPrice.textContent = `${price}€/jour`;
        pPrice.setAttribute("aria-label", `Le tarif du photographe ${name} est ${price}€/jour`);
        // Ajout des éléments à leur parent dans le DOM
        article.appendChild(linkImg);
        linkImg.appendChild(img);
        linkImg.appendChild(h2);
        article.appendChild(h3Location);
        article.appendChild(h4Tagline);
        article.appendChild(pPrice);
        // Appel de la fonction Listener sur le portrait du photographe
        listenPhotographer(linkImg, id);

        return (article);
    }
    return { id, name, picture, getUserCardDOM };
}

/**
 * Listener sur le portrait du photographe
 * @param {*} linkImg 
 * @param {*} id 
 */
function listenPhotographer (linkImg, id) {
    linkImg.addEventListener("click", async function (){
        const reponse = await fetch("../../data/photographers.json");
        const { media } = await reponse.json();
        // Apple de la fonction de Filtre sur les medias avec l'id du photographe
        mediaFilter(media, id);
    })
}

/**
 * Filtre les medias avec l'id du photographe
 * @param {*} media 
 * @param {*} id 
 */
function mediaFilter (medias, id) {
    const mediaFiltre = medias.filter(function (media){
        return media.photographerId = id;
    }) 
    console.log("mediaFiltre : ", mediaFiltre);
}