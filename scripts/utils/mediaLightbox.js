// Sélection des éléments
// **********************
const lightboxModal  = document.querySelector("#lightbox_modal");
const lightboxOverlay = document.querySelector(".overlay");
const prevBtn = document.querySelector(".lightbox-prev");   // flèche "précédent"
const nextBtn = document.querySelector(".lightbox-next");   // flèche "suivant"

// Variable(s) globale(s)
// **********************
let isLightboxModalOpen = false;   // modale ouverte/fermée

/********************************************************************
 * Fonction "closeModalLightbox" pour la fermeture de la modale lightbox
 * L'appel se fait depuis "photographer.html"
 */
function closeModalLightbox() {
    toggleModalLightbox("none", "true");    // afficher ou cacher la lightbox et l'overlay
    isLightboxModalOpen = false;   // modale fermée
}

/********************************************************************
 * Fonction "displayLightbox" pour afficher de la modale lightbox au clic sur un média du photographe
 * 
 * @param {media} - chemin de l'image ou de la vidéo à afficher
 * @param {desc} - description associée à l'image ou la vidéo
 */
function displayLightbox(media, desc, type) {
    toggleModalLightbox("block", "false");  // afficher ou cacher la lightbox et l'overlay
    const ligthboxImg = document.querySelector(".lightbox-img");
    const ligthboxDesc = document.querySelector(".lightbox-desc");
    ligthboxImg.innerHTML = "";
    let imgMedia = "";  // élément video ou img

    if (media.endsWith(".mp4")) {   // test si media video
        imgMedia = document.createElement("video");     // création d'un élément <video> pour la vidéo
        if(imgMedia.paused){
            imgMedia.autoplay = "true"; // Ajout de l'attribut autoplay pour démarrer la lecture automatique
        }
    } else {
        imgMedia = document.createElement("img");   // création d'un élément <img> pour l'image'
        imgMedia.alt = desc;    // texte alternatif de l'image
    }

    imgMedia.src = media;   // source de la vidéo ou de l'image
    ligthboxImg.appendChild(imgMedia);

    ligthboxDesc.textContent = desc;

    lightboxModal.querySelector(".lightbox-modal").focus(); // focus sur la modale
    (type === "next" ? nextBtn : prevBtn).focus();  // focus sur la flèche "suivant" ou "précédent"

    isLightboxModalOpen = true;   // modale ouverte

    focusTrapLightbox()     // gérer le Focus trap sur la modale
}

/********************************************************************
 * Affichage du média précédent/suivant
 * 
 * @param {index} - index du média cliqué
 * @param {mediaFiltre} - tableau contenant les objets médias filtrés
 * @param {direction} - flèche cliquée (prev ou next)
 * @return {index} - nouvel index (précédent ou suivant)
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
    if (direction ==="prev") {
        displayLightbox (pathMedia, mediaFiltre[newIndex].title, "prev");   // afficher la lightbox
    } else {
        displayLightbox (pathMedia, mediaFiltre[newIndex].title, "next");   // afficher la lightbox
    }
    index = newIndex;   // Mise à jour de l'index actuel avec le nouvel index
    return index;
}

/********************************************************************
 * Configuration du focus trap sur la modale
 */
function focusTrapLightbox() {
    // Sélection des éléments interactifs de la modale
    const focusableElements = lightboxModal.querySelectorAll(`button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])`);
    // Sélection du 1er et du dernier élément intéractif
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    // Capturer les appuis sur les touches Tab et Shift + Tab
    lightboxModal.addEventListener("keydown", function (event) {
        if (event.key === 'Tab' || event.keyCode === 9) {
            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();    // focus sur le dernier élément intéractif
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();   // focus sur le premier élément intéractif
            }
        }
    });
}

/********************************************************************
 * Fonction "listenLightbox" pour écouter le clic, enter ou espace sur les flèches "précédent" et "suivant" dans la lightox
 * 
 * @param {index} - index actuel du média affiché dans la lightbox 
 * @param {mediaFiltre} - tableau contenant les objets médias filtrés 
 */
function listenLightbox (index, mediaFiltre) {
    let enterKeyTriggered = false;  // variable informant que la touche "enter" est désactivée

    // Fonction pour gérer la navigation dans la lightbox
    function handleNavigation(direction) {
        if (!enterKeyTriggered) {
            index = displayMedia(index, mediaFiltre, direction);    // affichage du média précédent/suivant
        }
        enterKeyTriggered = false;  // variable informant que la touche "enter" est désactivée
    }

    /********************************************************************
     * Fonction pour gérer les événements clavier (Enter ou Espace)
     * 
     * @param {event} - touche ayant déclenché l'appel à la fonction
     * @param {direction} - flèche cliquée (précédent ou suivant)
     */
    function handleKeydown(event, direction) {
        if (event.key === " " || event.key === "Enter") {
            enterKeyTriggered = true;   // variable informant que la touche "enter" est activée
            index = displayMedia(index, mediaFiltre, direction);    // affichage du média précédent/suivant
        }
    }

    // Listeners
    // *********

    // Listeners pour le bouton "précédent"
    prevBtn.addEventListener("click", () => handleNavigation("prev"));
    prevBtn.addEventListener("keydown", (event) => handleKeydown(event, "prev"));

    // Listeners pour le bouton "suivant"
    nextBtn.addEventListener("click", () => handleNavigation("next"));
    nextBtn.addEventListener("keydown", (event) => handleKeydown(event, "next"));
}

/********************************************************************
 * Fonction "toggleModalLightbox" pour afficher ou cacher la lightbox et l'overlay
 * 
 * @param {display} - contenu de la propriété "display" (none ou block) 
 * @param {ariaHidden} - contenu de la propriété "aria-hidden" (true ou false)
 */
function toggleModalLightbox(display, ariaHidden) {
    lightboxModal.style.display = display;  // Affiche/cache la modale en modifiant son style display
    lightboxOverlay.style.display = display;    // Affiche/cache l'overlay en modifiant son style display
    lightboxModal.setAttribute("aria-hidden", ariaHidden);  // mettre l'attribut "aria-hidden" de la modale à true /false
}

// *********
// Listeners
// *********

// Fermeture de la modale avec la touche "Escape"
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && isLightboxModalOpen) {
        closeModalLightbox();   // Fermeture de la modale 
    }
});