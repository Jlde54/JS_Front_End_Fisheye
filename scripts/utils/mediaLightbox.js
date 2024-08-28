// Sélection de la lightbox via son ID "#lightbox_modal"
const lightboxModal  = document.querySelector("#lightbox_modal");
// Sélection de l'overlay via sa classe ".overlay"
const lightboxOverlay = document.querySelector(".overlay");
// Sélection de la flèche "précédent" de la modale
const prevBtn = document.querySelector(".lightbox-prev");
// Sélection de la flèche "suivant" de la modale
const nextBtn = document.querySelector(".lightbox-next");

/********************************************************************
 * Fonction "closeModalLightbox" pour la fermeture de la modale lightbox
 * L'appel se fait depuis "photographer.html"
 */
function closeModalLightbox() {
    // Appel de la fonction "toggleModalLightbox" pour afficher ou cacher la lightbox et l'overlay
    toggleModalLightbox("none", "true");
}

/********************************************************************
 * Fonction "displayLightbox" pour afficher de la modale lightbox au clic sur un média du photographe
 * Appel depuis pages/photographer.js
 * 
 * @param {media} - chemin de l'image ou de la vidéo à afficher
 * @param {desc} - description associée à l'image ou la vidéo
 */
function displayLightbox(media, desc, type) {
    // Appel de la fonction "toggleModalLightbox" pour afficher ou cacher la lightbox et l'overlay
    toggleModalLightbox("block", "false");
    // Sélection de l'élément où l'image/la vidéo sera insérée via sa classe ".lightbox-img"
    const ligthboxImg = document.querySelector(".lightbox-img");
    // Sélection la description via sa classe ".lightbox-desc"
    const ligthboxDesc = document.querySelector(".lightbox-desc");
    // Réinitialise le contenu de l'élément pour s'assurer qu'il est vide
    ligthboxImg.innerHTML = "";
    // Initialisation de l'élément video ou img
    let imgMedia = "";

    // Teste si l'image est une vidéo en testant si le chemin se termine par ".mp4"
    if (media.endsWith(".mp4")) {
        // Si oui, création d'un élément <video> pour la vidéo
        imgMedia = document.createElement("video");
        if(imgMedia.paused){
            imgMedia.autoplay = "true"; // Ajout de l'attribut autoplay pour démarrer la lecture automatique
        }
    } else {
        // Si non, création d'un élément <img> pour l'image'
        imgMedia = document.createElement("img");
        imgMedia.alt = desc;    // Définit le texte alternatif de l'image
    }

    imgMedia.src = media;   // Définit la source de la vidéo ou de l'image
    ligthboxImg.appendChild(imgMedia);  // Ajout de l'élément vido ou img à la lightbox

    // Mise à jour du texte de la description dans la lightbox
    ligthboxDesc.textContent = desc;

    // Déplacement du focus initial sur la modale
    lightboxModal.querySelector(".lightbox-modal").focus();
    (type === "next" ? nextBtn : prevBtn).focus();

    // Appel de la fonction "focusTrapLightbox" pour gérer le Focus trap sur la modale
    focusTrapLightbox() 
}

/********************************************************************
 * Affichage du média précédent/suivant
 * 
 * @param {*} index 
 * @param {*} mediaFiltre 
 * @param {*} direction
 */
function displayMedia (index, mediaFiltre, direction) {
    let newIndex, media, pathMedia;
    // Calcul du nouvel index pour naviguer au média précédent
    if (direction ==="prev") {
        newIndex = (index - 1 + mediaFiltre.length) % mediaFiltre.length;
        // Calcul du nouvel index pour naviguer au média précédent
    } else {
        newIndex = (index + 1) % mediaFiltre.length;
    }
    // Test si le média au nouvel index est une image ou une vidéo
    media = mediaFiltre[newIndex].image ? mediaFiltre[newIndex].image : mediaFiltre[newIndex].video;
    // Construction du chemin complet du média
    pathMedia = `${mediaFiltre[newIndex].dirPhotographer}${media}`
    // Appel de la fonction "displayLightbox" pour afficher la lightbox avec le nouveau média et son titre
    if (direction ==="prev") {
        displayLightbox (pathMedia, mediaFiltre[newIndex].title, "prev");
    } else {
        displayLightbox (pathMedia, mediaFiltre[newIndex].title, "next");
    }
    // Mise à jour de l'index actuel avec le nouvel index
    index = newIndex;
    return index;
}

/********************************************************************
 * Configuration du focus trap sur la modale
 */
function focusTrapLightbox() {
    // Sélection des éléments interactifs de la modale (y compris les éléments HTML ayant un attribut "tabindex" qui n'est pas égale à -1.)
    const focusableElements = lightboxModal.querySelectorAll(`button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])`);
    // Sélection du 1er et du dernier élément intéractif
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    // Capturer les appuis sur les touches de tabulation
    lightboxModal.addEventListener("keydown", function (event) {
        // Capturer les appuis sur Tab et Shift + Tab
        if (event.key === 'Tab' || event.keyCode === 9) {
            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    });
}

/********************************************************************
 * Fonction "listenLightbox" pour écouter le clic, enter ou espace sur les flèches précédent et suivant dans la lightox
 * 
 * @param {index} - index actuel du média affiché dans la lightbox 
 * @param {mediaFiltre} - tableau contenant les objets médias filtrés 
 */
function listenLightbox (index, mediaFiltre) {
    // Initialisation à false d'une variable permettant de savoir si la touche "enter" a été activée
    let enterKeyTriggered = false;

    // Fonction générique pour gérer la navigation dans la lightbox
    function handleNavigation(direction) {
        if (!enterKeyTriggered) {
            index = displayMedia(index, mediaFiltre, direction);
        }
        enterKeyTriggered = false;
    }

    // Fonction générique pour gérer les événements clavier (Enter ou Espace)
    function handleKeydown(event, direction) {
        if (event.key === " " || event.key === "Enter") {
            enterKeyTriggered = true;
            index = displayMedia(index, mediaFiltre, direction);
        }
    }

    // Ajout des listeners pour le bouton "précédent"
    prevBtn.addEventListener("click", () => handleNavigation("prev"));
    prevBtn.addEventListener("keydown", (event) => handleKeydown(event, "prev"));

    // Ajout des listeners pour le bouton "suivant"
    nextBtn.addEventListener("click", () => handleNavigation("next"));
    nextBtn.addEventListener("keydown", (event) => handleKeydown(event, "next"));
}

/********************************************************************
 * Fonction "toggleModalLightbox" pour afficher ou cacher la lightbox et l'overlay
 * 
 * @param {string} display - "block" ou "none" pour contrôler l'affichage
 * @param {string} ariaHidden - "false" ou "true" pour l'attribut aria-hidden
 */
function toggleModalLightbox(display, ariaHidden) {
    lightboxModal.style.display = display;
    lightboxOverlay.style.display = display;
    lightboxModal.setAttribute("aria-hidden", ariaHidden);
}

// Fermeture de la modale avec la touche "Escape"
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        // Appel de la fonction "closeModalLightbox" pour femer la modale 
        closeModalLightbox();
    }
});