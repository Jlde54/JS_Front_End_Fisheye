/**
 * Initialisation des variables globales
 */
let images =[];
let descImages =[];
let mediaFiltre = [];
let dirPhotographer = "";

/**
 * Fonction asynchrone d'initialisation de la la page photographe (photographer.html)
 * Appel de la récupèration des paramètres de l'URL et des médias des photographes + affichage des medias des photographes
 */
async function init () {
    // Appel de la fonction getURL pour la récupèration des paramètres du photographe de l'URL
    const id = getURL ("id");   // identifiant du photographe
    const name = getURL ("name");   // nom du photographe
    const city = getURL ("city");   // ville du photographe
    const country = getURL ("country");     // pays du photographe
    const tagline = getURL ("tagline");     // slogan du photographe
    const picture = getURL ("picture");     // chemin du portrait du photographe
    const price = getURL ("price");     // tarif du photographe

    // Appel de la fonction getData pour la récupération des medias des photographes
    // getData se trouve dans le fichier /scripts/templates/photographer.js
    const { media } = await getData ();

    // Filtre des médias correspondants à l'id du photographe
    mediaFiltre = media.filter((item) => item.photographerId == id);

    // Appel de la fonction displayPhotographerHeader pour l'affichage de l'entête du photographe
    displayPhotographerHeader (name, city, country, tagline, picture);

    // Construction du nom du dossier du photographe "dirPhotographer"
    // 1) Prendre le contenu de "name" avant le 1er espace
    let string = "";
    const firstSpaceIndex = name.indexOf(' ');
    if (firstSpaceIndex === -1) {
        string = name
    } else {
        string = name.substring(0, firstSpaceIndex);
    }
    // 2) Mettre un espace à la place des caractères qui ne sont pas des lettres 
    dirPhotographer = string.replace(/[^a-zA-Z]/g, " ");

    // Appel de la fonction displayData pour l'affichage des medias des photographes
    // displayData se trouve dans le fichier /scripts/templates/photographer.js
    displayData (mediaFiltre, ".medias_section", dirPhotographer);

    // Appel de la fonction displayTarif pour l'affichage de l'encart contenant le nombre de likes et le tarif du photographe
    // 1) Extraction des likes des médias 
    const mapLikes = mediaFiltre.map(like => like.likes);
    // 2) Calcul de la somme des likes
    const sumLikes = mapLikes.reduce((a,b) => a + b, 0);
    // 3) Appel de la fonction displayTarif pour l'affichage
    displayTarif (price, sumLikes);
    
    // Appel de la fonction displayLightBox pour l'affichage de la lightbox
    displayLightBox ();

    // Appel des fonctions pour la création des listeners :
    // - pour ouvrir ou fermer le dropdown menu   
    listenersDropDown ();
    // - pour écouter le click sur un média et afficher la lightbox
    listenersMedias (".medias_section");
    // - pour augmenter le nombre de likes au click sur l'icon
    listenerLike ();
}

// Listener sur chaque icône "Like"
function listenerLike () {
    // Sélectionner tous les éléments avec la classe .fa-heart (icônes likes)
    const likes = document.querySelectorAll(".fa-heart");
    // Ajouter un listener de clic sur chaque icône
    likes.forEach(like => {
        like.addEventListener("click", (event) => {
            const clickedLike = event.target;
            // Vérifier si l'icône a déjà été likée
            if (clickedLike.classList.contains("liked")) {
                return;
            }
            // Trouver l'élément article parent
            const articleElem = clickedLike.closest("article");
            // Trouver l'élément ".medias_section_likes" à l'intérieur de l'élément "article"
            const likeElem = articleElem.querySelector(".medias_section_likes");
            // Incrémenter le nombre de likes
            let currentLikes = parseInt(likeElem.textContent);
            // Mettre à jour le nombre de likes sur le média cliqué
            likeElem.textContent = currentLikes + 1;
            // Trouver l'élément ".photograph-likes"
            const sumLikes = document.querySelector(".photograph-likes");
            let currentSumLikes = parseInt(sumLikes.textContent);
            // Mettre à jour le nombre de likes total du photographe
            sumLikes.innerHTML = `${currentSumLikes + 1} <span class="arrow"><i class="fa-solid fa-heart"></i></span>`;
            // Marquer l'icône comme likée
            clickedLike.classList.add("liked");
        })
    })
}

/**
 * Récupération des paramètres de l'URL
 * 
 * @param {string} - nom du pramètre à récupérer
 * @returns {field} - valeur du paramètre
 */
function getURL (string){
    // Création d'un objet contenant tous les paramètres de l'URL actuel de la page
    const urlParams = new URL(document.location).searchParams;
    // Récupération du paramètre correspondant à la valeur "string" passée en paramètre à la fonction
    const field = urlParams.get(string);
    // Retour de la valeur du paramètre
    return field;
}

// Récupération des medias des photographes depuis le fichier JSON
async function getData () {
    const reponse = await fetch("./data/photographers.json");
    const medias = await reponse.json();
    return medias;
}

// Création des éléments du header de la page photographe +
// Ajout des éléments à leur parent dans le DOM
function displayPhotographerHeader (name, city, country, tagline, picture) {
    // Création des éléments du header de la page photographe
    const photographHeader = document.querySelector(".photograph-header");

    const divPhotographerProfile = document.createElement("div");
    divPhotographerProfile.className = "photograph-header-profile";

    // Création de l'élément <img> : Portrait du photographe
    const imgPicture = document.createElement( 'img' );
    imgPicture.setAttribute("src", picture);
    imgPicture.setAttribute("alt", `Portrait du photographe ${name}`);
    imgPicture.className = "photograph-header-imgprofile";

    // Création de l'élément <h2> : Nom du photographe
    const h2Name = document.createElement("h2");
    h2Name.textContent = name;

    // Création de l'élément <h3> : Localisation du photographe
    const h3Location = document.createElement("h3");
    h3Location.textContent = `${city}, ${country}`;

    // Création de l'élément <h4> : Slogan du photographe
    const h4Tagline = document.createElement("h4");
    h4Tagline.textContent = tagline;

    // Ajout des éléments à leur parent dans le DOM
    photographHeader.insertBefore(divPhotographerProfile, photographHeader.firstChild);
    divPhotographerProfile.appendChild(h2Name);
    divPhotographerProfile.appendChild(h3Location);
    divPhotographerProfile.appendChild(h4Tagline);
    photographHeader.appendChild(imgPicture);
    
}

// Création des éléments du dropdown menu de la page photographe +
// Ajout des éléments à leur parent dans le DOM
function displayLightBox(){
    // Création des éléments du dropdown menu de la page photographe
    const main = document.querySelector("#main");
    const mediaSection = document.querySelector(".medias_section");

    const divSort = document.createElement("div");
    divSort.className = "photograph-sort";

    const labelDropDown = document.createElement("label");
    labelDropDown.setAttribute("for", "select-list");
    labelDropDown.textContent = "Trier par ";

    const divSelect = document.createElement("div");
    divSelect.className = "custom-dropdown";

    const divSelected = document.createElement('button');
    divSelected.className = 'btn selected';
    divSelected.innerHTML = 'Popularité <span class="arrow"><i class="fa-solid fa-chevron-down"></i></span>';
    // divSelected.arialabel = 'Choisir une option de tri les médias'

    const selectDropDown = document.createElement("div");
    selectDropDown.className = "menu";

    const optionDropDown1 = document.createElement("div");
    optionDropDown1.value = "Popularité";
    optionDropDown1.innerHTML = 'Popularité <span class="arrow"><i class="fa-solid fa-chevron-up"></i></span>';
    optionDropDown1.className = "option";

    const optionDropDown2 = document.createElement("div");
    optionDropDown2.value = "Date";
    optionDropDown2.textContent = "Date";
    optionDropDown2.className = "option";
    
    const optionDropDown3 = document.createElement("div");
    optionDropDown3.value = "Titre";
    optionDropDown3.textContent = "Titre";
    optionDropDown3.className = "option";

    // Ajout des éléments à leur parent dans le DOM
    main.insertBefore(divSort, mediaSection);
    divSort.appendChild(labelDropDown);
    divSort.appendChild(divSelect);
    divSelect.appendChild(divSelected);
    divSelect.appendChild(selectDropDown);
    selectDropDown.appendChild(optionDropDown1);
    selectDropDown.appendChild(optionDropDown2);
    selectDropDown.appendChild(optionDropDown3);
}

// Affichage de l'encart contenant le nombre total de likes et le tarif du photographe
function displayTarif (price, sumLikes) {
    const main = document.querySelector("#main");
    const divTarifLikes = document.createElement("div");
    divTarifLikes.className = "photograph-likes-tarif";

    const divLikes = document.createElement("div");
    divLikes.className = "photograph-likes";
    divLikes.innerHTML = `${sumLikes} <span class="arrow"><i class="fa-solid fa-heart"></i></span>`;

    const divTarif = document.createElement("div");
    divTarif.className = "photograph-tarif";
    divTarif.textContent = `${price}€/jour`;

    main.appendChild(divTarifLikes);
    divTarifLikes.appendChild(divLikes);
    divTarifLikes.appendChild(divTarif);
}

// Création des listeners pour ouvrir ou fermer le dropdown menu
function listenersDropDown () {
    const divSelected = document.querySelector(".selected");
    const selectDropDown = document.querySelector(".menu");

    divSelected.addEventListener('click', () => {
        selectDropDown.classList.toggle('show');
    });

    document.querySelectorAll('.custom-dropdown .option').forEach(option => {
        option.addEventListener('click', event => {
            // Mise à jour de divSelected avec le texte de l'option sélectionnée
            divSelected.innerHTML = `${event.currentTarget.textContent}<span class="arrow"><i class="fa-solid fa-chevron-down"></i></span>`;
            // Bascule de la classe show pour afficher/masquer le menu déroulant
            selectDropDown.classList.toggle('show');
            // Tri de mediaFiltre selon l'option sélectionnée
            switch (event.currentTarget.textContent) {
                case "Popularité ":
                    // Tri en ordre croissant de popularité
                    mediaFiltre.sort((a, b) => Number(a.likes) - Number(b.likes));
                    break;
                case "Date":
                    // Tri en ordre croissant de date
                    mediaFiltre.sort((a, b) => new Date(a.date) - new Date(b.date));
                    break;
                case "Titre":
                    // Tri en ordre croissant de titre
                    mediaFiltre.sort((a, b) => {
                        if(a.title < b.title) {
                            return -1;
                        }
                        if(a.title > b.title) {
                            return 1;
                        }
                        return 0;
                    });
                    break;
                default:
                    break;
            }
            
            // Appel de l'affichage des medias des photographes après le tri
            displayData (mediaFiltre, ".medias_section", dirPhotographer);
            listenersMedias (".medias_section");
            listenerLike ();
        });
    });
}

function listenersMedias (section) {
    const a = document.querySelectorAll(`${section} a`);
    let image = "";
    images =[];
    descImages =[];
    
    // Sélection de chaque média <img> ou <video>
    a.forEach((item, index) => {
        image = item.querySelector("img");
        if (!image) {
            image = item.querySelector("video");
        }
        
        const startIndexSrc = image.src.indexOf('/assets');
        const src = `.${image.src.substring(startIndexSrc)}`;

        let alt = image.alt;
        if(!alt) {
            const lastSlashIndex = src.lastIndexOf('/');
            const lastDotIndex = src.lastIndexOf('.');
            alt = src.substring(lastSlashIndex + 1, lastDotIndex);
        }

        // Enlever le mot "Media" dans l'argument "alt"
        const keyWord = "Media";
        const startIndexAlt = alt.indexOf(keyWord);
        if (startIndexAlt !== -1) {
            alt = `${alt.substring(startIndexAlt + keyWord.length).trim() + 1}`;
        }

        // remplissage des tableaux "images" et "descImages"
        images.push(src);
        descImages.push(alt);

        // Ajout du listener et appel de la modale lightbox
        item.addEventListener("click", (event) => {
            event.preventDefault();
            displayLightboxModal (images[index], descImages[index]);
            listenLightbox (index);
        });
    });
}

// Listener sur les flèches précédent et suivant dans la lightox
function listenLightbox (index) {
    // Listener sur la flèche "précédent" de la lightbox
    const prevBtn = document.querySelector(".lightbox-prev");
    prevBtn.addEventListener("click", () => {
        newIndex = (index - 1 + mediaFiltre.length) % mediaFiltre.length;
        displayLightboxModal (images[newIndex], descImages[index]);
        index = newIndex;
    })
    // Listener sur la flèche "suivant" de la lightbox
    const nextBtn = document.querySelector(".lightbox-next");
    nextBtn.addEventListener("click", () => {
        newIndex = (index + 1) % mediaFiltre.length;
        displayLightboxModal (images[newIndex], descImages[newIndex]);
        index = newIndex;
    })
}

/**
 * Appel de la fonction init() pour initialiser la page photographe (photographer.html)
 */
init ();
