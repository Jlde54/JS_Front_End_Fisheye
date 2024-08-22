/********************************************************************
 * Initialisation des variables globales
 */
let mediaFiltre = [];   // Tableau contenant les médias du photographe
let dirPhotographer = "";   // le répertoire des medias du photographe
let isMenuOpen = false;
let focusedOptionIndex;

  /********************************************************************
   * Fermeture du menu dropdown
   * 
   * @param {dropdownButton} - 
   * @param {dropdownMenu} - 
   */
  function closeDropdownMenu(dropdownButton, dropdownMenu) {
    dropdownMenu.style.display = 'none';
    dropdownButton.setAttribute('aria-expanded', 'false');
    isMenuOpen = false;
  }

/********************************************************************
 * Fonction "displayDropdownMenu" pour la création des éléments du dropdown menu de la page photographe
 */
function displayDropdownMenu(){
    // Sélection de l'élément principal de la page via son ID "#main"
    const main = document.querySelector("#main");
    // Sélection de la section des médias via sa classe ".medias_section"
    const mediaSection = document.querySelector(".medias_section");
    // Création de l'élément <div> pour contenir le dropdown menu
    const divSort = createElement("div", {
        className: "photograph-sort"}, [
            // Création de l'élément <label> pour le dropdown menu avec le texte "Trier par"
            createElement("span", {
                className: "photographer-sort-span",
                textContent: "Trier par "}, []
            ),
            // Création de l'élément <div> pour le menu déroulant personnalisé
            createElement("div", {
                className : "custom-dropdown"}, [
                    // Création d'un bouton pour afficher le menu déroulant avec l'option sélectionnée et une icône
                    createElement("button", {
                        id: "select-list",
                        className: "btn selected", 
                        innerHTML: `Popularité <span class="arrow"><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></span>`, 
                        "aria-haspopup": "true",
                        "aria-expanded": "false",
                        "aria-controls": "dropdown-menu"}, []
                    ),
                    // Création de l'élément <div> pour contenir les options du menu déroulant
                    createElement("div", {
                        className : "menu",
                        id: "dropdown-menu",
                        role: "menu"}, [    // élément menu
                            // Création d'une option pour trier par "Popularité" avec une icône de flèche vers le haut
                            createElement("div", {
                                value: "Popularité", 
                                innerHTML: `Popularité <span class="arrow"><i class="fa-solid fa-chevron-up" aria-hidden="true"></i></span>`, 
                                className: "option",
                                role: "menuitem"}, []
                            ),
                            // Création d'une option pour trier par "Date"
                            createElement("div", {
                                value: "Date", 
                                innerHTML: "Date", 
                                className: "option",
                                role: "menuitem"}, []
                            ),
                            // Création d'une option pour trier par "Titre"
                            createElement("div", {
                                value: "Titre", 
                                innerHTML: "Titre", 
                                className: "option",
                                role: "menuitem"}, []
                            )
                        ]
                    )
                ]
            )
        ]
    );

    // Ajout de l'élément "divSort" à son parent "main" avant l'élément "mediaSection"
    main.insertBefore(divSort, mediaSection);
}

/********************************************************************
 * Fonction "displayPhotographerHeader" pour la création des éléments du header de la page photographe +
 * Ajout des éléments à leur parent dans le DOM
 * 
 * @param {*} name 
 * @param {*} city 
 * @param {*} country 
 * @param {*} tagline 
 * @param {*} picture 
 */
function displayPhotographerHeader (name, city, country, tagline, picture) {

    // Création des éléments du header de la page photographe
    const photographHeader = document.querySelector(".photograph-header");

    // Création de l'élément <div> : nom, localisation et slogan du photographe
    const divPhotographerProfile = 
        createElement("div", {
            className: "photograph-header-profile",
            "aria-labelledby": "photographer-name"}, [
                createElement( "h1", {
                    textContent: name, 
                    id: "photographer-name"}, []),
                createElement( "h2", {
                    textContent: `${city}, ${country}`}, []),
                createElement( "h3", {
                    textContent: tagline}, [])
        ]);

    // Création de l'élément <img> : Portrait du photographe
    const imgPicture = 
        createElement("figure", {}, [
            createElement( "img", {
                src: picture, 
                className: "photograph-header-imgprofile", 
                alt: `Portrait du photographe ${name} basé à ${city}, ${country}`}, []
            )
        ]);

    // Ajout des éléments à leur parent dans le DOM
    photographHeader.insertBefore(divPhotographerProfile, photographHeader.firstChild);
    photographHeader.appendChild(imgPicture);
}

/********************************************************************
 * Fonction "displayTarif" pour l'affichage de l'encart contenant le nombre total de likes et le tarif du photographe
 * 
 * @param {price} - tarif journalier
 * @param {sumLikes} - nombre total de "likes"
 */
function displayTarif (price, sumLikes) {
    // Sélection de l'élément principal de la page via son ID "#main"
    const main = document.querySelector("#main");
    // Création d'un élément <div> pour contenir le tarif et les likes
    const divTarifLikes = 
        createElement("div", {
            className: "photograph-likes-tarif"}, [ 
            // Création d'un élément <div> pour afficher le nombre de "likes"
            createElement("div", {
                className: "photograph-likes", 
                "aria-label": `${sumLikes} likes`,
                innerHTML: `${sumLikes} <span class="arrow"><i class="fa-solid fa-heart" aria-hidden="true"></i></span>`}, []), 
                // Création d'un élément <div> pour afficher le tarif journalier
            createElement("div", {
                className: "photograph-tarif", 
                textContent: `${price}€/jour`,
                "aria-label": `${price} euros par jour`}, [])
        ]);
    // Ajout du conteneur des likes et du tarif à l'élément principal de la page
    main.appendChild(divTarifLikes);
}

/********************************************************************
 * Fonction "getURL" de récupération des paramètres de l'URL
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

/********************************************************************
 * Fonction "handleMediaListener" pour préparer l'affichage de la lightbox càd construire le chemin complet du média et appeler l'affichage du média cliqué
 * 
 * @param {event} - événement correspondant au média choisi
 * @param {index} - index correspondant au média choisi dans le tableau "mediaFiltre"
 */
function handleMediaListener (event, index) {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    let media = "";     // variable pour stocker le chemin de <img> ou <video>
    // Teste si le média courant est une image ou une vidéo et met à jour la variable image en conséquence
    media = mediaFiltre[index].image ? mediaFiltre[index].image : mediaFiltre[index].video;
    // Construction du chemin complet du média en combinant le répertoire du photographe et le nom de l'image/vidéo
    pathMedia = `${mediaFiltre[index].dirPhotographer}${media}`
    // Appel de la fonction "displayLightbox" pour afficher le média cliqué dans la lightbox
    displayLightbox (pathMedia, mediaFiltre[index].title, "next");
    // Appel de la fonction "listenLightbox" pour ajouter les listeners sur les flèches suivant/précédent
    listenLightbox (index, mediaFiltre);
}

/********************************************************************
 * Fonction "init" asynchrone pour l'initialisation de la la page photographe (photographer.html)
 */
async function init () {
    // Appel de la fonction "getURL" pour la récupèration des paramètres du photographe de l'URL
    const id = getURL ("id");   // identifiant du photographe
    const name = getURL ("name");   // nom du photographe
    const city = getURL ("city");   // ville du photographe
    const country = getURL ("country");     // pays du photographe
    const tagline = getURL ("tagline");     // slogan du photographe
    const picture = getURL ("picture");     // chemin du portrait du photographe
    const price = getURL ("price");     // tarif du photographe

    // Appel de la fonction "getData" pour la récupération des medias des photographes (getData se trouve dans le fichier /scripts/templates/photographer.js)
    const { media } = await getData ();

    // Filtre des médias correspondants à l'id du photographe
    mediaFiltre = media.filter((item) => item.photographerId == id);

    // Appel de la fonction "displayPhotographerHeader" pour l'affichage de l'entête du photographe
    displayPhotographerHeader (name, city, country, tagline, picture);

    // Construction du nom du dossier du photographe "dirPhotographer"
    // 1) Prendre le contenu de "name" avant le 1er espace
    let string = "";
    const firstSpaceIndex = name.indexOf(" ");
    string = firstSpaceIndex === -1 ? name : name.substring(0, firstSpaceIndex);
    // 2) Mettre un espace à la place des caractères qui ne sont pas des lettres 
    dirPhotographer = string.replace(/[^a-zA-Z]/g, " ");

    // Ajout de la propriété contenant le nom du dossier "dirPhotographer" et de la propriété "liked" dans chaque objet du tableau "mediaFiltre"
    for (let i = 0; i < mediaFiltre.length; i++) {
        mediaFiltre[i].dirPhotographer = `./assets/photographers/${dirPhotographer}/`;
        mediaFiltre[i].liked = false;
    }

    // Appel de la fonction "displayData" pour l'affichage des medias des photographes (displayData se trouve dans le fichier /scripts/templates/photographer.js)
    displayData (mediaFiltre, ".medias_section", dirPhotographer);

    // Appel de la fonction "displayTarif" pour l'affichage de l'encart contenant le nombre de likes et le tarif du photographe
    // 1) Extraction et calcul de la somme des likes des médias 
    const sumLikes = mediaFiltre.map(like => like.likes).reduce((a,b) => a + b, 0);
    // 2) Appel de la fonction displayTarif pour l'affichage
    displayTarif (price, sumLikes);
    
    // Appel de la fonction "displayDropdownMenu" pour l'affichage du dropdown menu
    displayDropdownMenu ();

    // Appel des fonctions pour la création des listeners :
    // 1) pour ouvrir ou fermer le dropdown menu et choisir une option de tri
    listenersDropDownMenu ();
    // 2) pour écouter le clic sur un média et afficher la lightbox
    listenersMedias (".medias_section");
    // 3) pour augmenter le nombre de likes au clic sur l'icon
    listenerLike ();
}

/********************************************************************
 * Fonction "listenerLike" pour écouter le clic sur chaque icône "Like"
 */
function listenerLike () {
    // Sélectionner tous les éléments avec la classe .fa-heart (icônes likes)
    const likes = document.querySelectorAll(".fa-heart");
    // Ajouter un listener de clic sur chaque icône
    likes.forEach((like, index) => {
        like.addEventListener("click", (event) => {
            const clickedLike = event.target;
            // Trouver l'élément article parent
            const articleElem = clickedLike.closest("article");
            // Trouver l'élément ".medias_section_likes" à l'intérieur de l'élément "article"
            const likeElem = articleElem.querySelector(".medias_section_likes");
            let currentLikes = parseInt(likeElem.textContent);
            // Trouver l'élément ".photograph-likes"
            const sumLikes = document.querySelector(".photograph-likes");
            let currentSumLikes = parseInt(sumLikes.textContent);
            // Mise à jour du nombre de likes sur le média cliqué, dans le total du photographe et dans "mediaFiltre"
            // Test si le média actuel est déjà liké
            if (mediaFiltre[index].liked === true) {
                // Décrémente le nombre de "likes" affichés pour ce média
                likeElem.textContent = currentLikes - 1;
                // Mise à jour du nombre de likes dans l'attribut "aria-label"
                likeElem.setAttribute("aria-label", `${currentSumLikes - 1} likes`);
                // Change l'état "liked" du média à false
                mediaFiltre[index].liked = false;
                // Décrémente le nombre total de "likes" pour ce média dans le tableau
                mediaFiltre[index].likes --;
                // Mise à jour du total des "likes" affichés avec le nombre réduit
                sumLikes.innerHTML = `${currentSumLikes - 1} <span class="arrow"><i class="fa-solid fa-heart"></i></span>`;
                sumLikes.setAttribute("aria-label", `${currentSumLikes - 1} likes`);
                // si le média actuel n'est pas liké
            } else {
                // Incrémente le nombre de "likes" affichés pour ce média
                likeElem.textContent = currentLikes + 1;
                // Change l'état "liked" du média à true
                mediaFiltre[index].liked = true;
                // Incrémente le nombre total de "likes" pour ce média dans le tableau
                mediaFiltre[index].likes ++;
                // Mise à jour du total des "likes" affichés avec le nombre augmenté
                sumLikes.innerHTML = `${currentSumLikes + 1} <span class="arrow"><i class="fa-solid fa-heart"></i></span>`;
                sumLikes.setAttribute("aria-label", `${currentSumLikes + 1} likes`);
            }
        })
    })
}

/********************************************************************
 * Fonction "listenersDropDownMenu" pour créer les listeners pour ouvrir ou fermer le dropdown menu et pour sélectionner une option
 */
function listenersDropDownMenu () {
    // Sélection du bouton du dropdown menu, du dropdown menu et des options du menu
    const dropdownButton = document.querySelector("#select-list");
    const dropdownMenu = document.querySelector("#dropdown-menu");
    const options = Array.from(dropdownMenu.querySelectorAll(".option"));

    // Ouverture/Fermeture du menu si clic sur le bouton(dropdownButton)
    dropdownButton.addEventListener("click", (event) => {   
        event.preventDefault();
        // Appel de la fermeture/Ouverture du menu
        toggleDropdownMenu(dropdownButton, dropdownMenu, options);
    });
    
    // Fermeture du menu si clic sur la page en dehors du bouton (dropdownButton) et du menu (dropdownMenu)
    document.addEventListener("click", (event) => {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            // Appel de la fermeture du menu
            closeDropdownMenu(dropdownButton, dropdownMenu);
        }
    });
    // Listener sur les appuis sur les touches (flèches vers le bas et le haut, Enter et Escape) 
    document.addEventListener("keydown", (event) => {
        // Test si le menu est ouvert ou fermé
        if (isMenuOpen) {   // Le menu est ouvert
            // Gestion de la navigation dans les options avec les flèches vers le haut ou vers le bas
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault(); // Empêcher le comportement par défaut
                // Gestion de l'appui sur la flèche vers le bas
                if (event.key === "ArrowDown") {
                    // Avance l'index de l'option, avec une boucle si on dépasse la dernière option.
                    focusedOptionIndex = (focusedOptionIndex + 1) % options.length;
                    // Gestion de l'appui sur la flèche vers le haut
                } else if (event.key === "ArrowUp") {
                    // Recule l'index de l'option, avec une boucle si on dépasse la première option.
                    focusedOptionIndex = (focusedOptionIndex - 1 + options.length) % options.length;
                }
                // Focus sur l'option actuellement sélectionnée
                options[focusedOptionIndex].focus();
            // Sélection de l'option actuelle si Enter ou Espace
            } else if (event.key === "Enter" || event.key === " ") {
                event.preventDefault(); // Empêcher le comportement par défaut
                // Appel de la fonction "optionSelected" pour afficher les médias correspondant à la sélection de l'option
                optionSelected(dropdownButton, dropdownMenu, options[focusedOptionIndex]);
            // Ferme le menu si "Escape" est pressé.
            } else if (event.key === "Escape") {
                // Appel de la fermeture du menu
                closeDropdownMenu(dropdownButton, dropdownMenu);
            }
        //Si le menu est fermé et que le bouton du menu a le focus et que Enter ou Espace sont pressés
        } else if (document.activeElement === dropdownButton && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault(); // Empêcher le comportement par défaut
            // Appel 
            openDropdownMenu(dropdownButton, dropdownMenu, options);
        }
    });
    
    options.forEach((option, index) => {
        option.addEventListener("click", () => {
            optionSelected (dropdownButton, dropdownMenu, option);
        });

        option.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            optionSelected (dropdownButton, dropdownMenu, option);
            }
        });
    });
}

function listenersDropDownMenuold () {
    // Sélection du bouton du dropdown menu, du dropdown menu et des options du menu
    const dropdownButton = document.querySelector("#select-list");
    const dropdownMenu = document.querySelector("#dropdown-menu");
    const options = Array.from(dropdownMenu.querySelectorAll(".option"));

    // Ouverture/Fermeture du menu si clic sur le bouton(dropdownButton)
    dropdownButton.addEventListener("click", (event) => {   
        event.preventDefault();
        // Appel de la fermeture/Ouverture du menu
        toggleDropdownMenu(dropdownButton, dropdownMenu, options);
    });
    
    // Fermeture du menu si clic sur la page en dehors du bouton (dropdownButton) et du menu (dropdownMenu)
    document.addEventListener("click", (event) => {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            // Appel de la fermeture du menu
            closeDropdownMenu(dropdownButton, dropdownMenu);
        }
    });
    // Listener sur les appuis sur les touches (flèches vers le bas et le haut, Enter et Escape) 
    document.addEventListener("keydown", (event) => {
        // Test si le menu est ouvert ou fermé
        if (isMenuOpen) {   // Le menu est ouvert
            // Gestion de la navigation dans les options avec les flèches vers le haut ou vers le bas
            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault(); // Empêcher le comportement par défaut
                // Gestion de l'appui sur la flèche vers le bas
                if (event.key === "ArrowDown") {
                    // Avance l'index de l'option, avec une boucle si on dépasse la dernière option.
                    focusedOptionIndex = (focusedOptionIndex + 1) % options.length;
                    // Gestion de l'appui sur la flèche vers le haut
                } else if (event.key === "ArrowUp") {
                    // Recule l'index de l'option, avec une boucle si on dépasse la première option.
                    focusedOptionIndex = (focusedOptionIndex - 1 + options.length) % options.length;
                }
                // Focus sur l'option actuellement sélectionnée
                options[focusedOptionIndex].focus();
            // Sélection de l'option actuelle si Enter ou Espace
            } else if (event.key === "Enter" || event.key === " ") {
                event.preventDefault(); // Empêcher le comportement par défaut
                // Appel de la fonction "optionSelected" pour afficher les médias correspondant à la sélection de l'option
                optionSelected(dropdownButton, dropdownMenu, options[focusedOptionIndex]);
            // Ferme le menu si "Escape" est pressé.
            } else if (event.key === "Escape") {
                // Appel de la fermeture du menu
                closeDropdownMenu(dropdownButton, dropdownMenu);
            }
        //Si le menu est fermé et que le bouton du menu a le focus et que Enter ou Espace sont pressés
        } else if (document.activeElement === dropdownButton && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault(); // Empêcher le comportement par défaut
            // Appel 
            openDropdownMenu(dropdownButton, dropdownMenu, options);
        }
    });
    
    options.forEach((option, index) => {
        option.addEventListener("click", () => {
            optionSelected (dropdownButton, dropdownMenu, option);
        });

        option.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            optionSelected (dropdownButton, dropdownMenu, option);
            }
        });
    });
}

/********************************************************************
 * Fonction "listenersMedias" pour la création des listeners pour ouvrir la lightbox
 * 
 * @param {section} - section contenant les médias affichés
 */
function listenersMedias (section) {
    // Sélection de tous les éléments <a> dans la section spécifiée, représentant des liens vers les médias
    const a = document.querySelectorAll(`${section} a`);
    
    // Parcours de chaque élément <a> (représentant une image ou une vidéo)
    a.forEach((item, index) => {
        
        // Ajout du listener pour le clic sur un élément <a>
        item.addEventListener("click", (event) => {
            handleMediaListener (event, index)
        });
        // Ajout du listener pour le "enter" sur un élément <a>
        item.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                handleMediaListener(event, index);
            }
        });
    });
}

  /********************************************************************
   * Ouverture du menu dropdown
   * 
   * @param {dropdownButton} - 
   * @param {dropdownMenu} - 
   * @param {options} - 
   */
  function openDropdownMenu(dropdownButton, dropdownMenu, options) {
    dropdownMenu.style.display = 'block';
    dropdownButton.setAttribute('aria-expanded', 'true');
    isMenuOpen = true;
    focusedOptionIndex = 0;
    // options[focusedOptionIndex].focus();
  }

/********************************************************************
 * Fonction "optionSelected" pour l'affichage des médias après la sélection de l'option
 * 
 * @param {event} - événement lié à l'option choisie 
 * @param {dropdownButton} - élément qui affiche l'option sélectionnée dans le menu
 * @param {dropdownMenu} - menu déroulant qui contient les options de tri 
 */
function optionSelected (dropdownButton, dropdownMenu, option) {
    // Mise à jour de dropdownButton avec le texte de l'option sélectionnée
    dropdownButton.innerHTML = `${option.textContent}<span class="arrow"><i class="fa-solid fa-chevron-down"></i></span>`;
    // Masque le menu déroulant et met l'attribut 'aria-expanded' à false
    // dropdownButton.setAttribute("aria-expanded", "false");
    // dropdownMenu.style.display = "none";
    // Tri de mediaFiltre selon l'option sélectionnée
    switch (option.textContent) {
        case "Popularité ":
            // Tri en ordre croissant de popularité
            mediaFiltre.sort((a, b) => Number(a.likes) - Number(b.likes));
            break;
        case "Date":
            // Tri en ordre croissant de date
            mediaFiltre.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case "Titre":
            // Tri en ordre alphabétique de titre
            mediaFiltre.sort((a, b) => {
                if(a.title < b.title) return -1;
                if(a.title > b.title) return 1;
                return 0;
            });
            break;
        default:
            break;
    }

    // Appel de la fermeture du menu
    closeDropdownMenu(dropdownButton, dropdownMenu);
    // Appel de l'affichage des medias des photographes après le tri
    displayData (mediaFiltre, ".medias_section", dirPhotographer);
    // Appel de la fonction "listenersMedias" pour l'ajout des listeners sur les médias affichés
    listenersMedias (".medias_section");
    // Appel de la fonction "listenerLike" pour l'ajout des listeners sur les likes des médias affichés
    listenerLike ();
}

/********************************************************************
 * Appel de l'ouverture/Fermeture du menu en fonction du contenu de "isMenuOpen"
 * 
 * @param {dropdownButton} - 
 * @param {dropdownMenu} - 
 * @param {options} - 
 */
function toggleDropdownMenu(dropdownButton, dropdownMenu, options) {
    if (isMenuOpen) {
        // Appel de la fermeture du menu
        closeDropdownMenu(dropdownButton, dropdownMenu);
    } else {
        // Appel de l'ouverture' du menu dropdown
        openDropdownMenu(dropdownButton, dropdownMenu, options);
    }
  }

/********************************************************************
 * Appel de la fonction init() pour initialiser la page contenant les médias du photographe sélectionné (photographer.html)
 */
init ();
