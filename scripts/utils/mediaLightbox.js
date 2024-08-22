let index;
/********************************************************************
 * Fonction "closeModalLightbox" pour la fermeture de la modale lightbox
 * L'appel se fait depuis "photographer.html"
 */
function closeModalLightbox() {
    // Sélection de l'élément de la modale via son ID "#lightbox_modal_modal"
    const modal = document.querySelector("#lightbox_modal");
    // Sélection de l'élément de l'overlay via sa classe ".overlay"
    const overlay = document.querySelector(".overlay");
    // Cache la modale en modifiant son style display à "none"
    modal.style.display = "none";
    // Cache l'overlay en modifiant son style display à "none"
    overlay.style.display = "none";
    // Retour du focus sur le média sélectionné
    // document.querySelector(".photograph-header-button").focus();
    modal.setAttribute("aria-hidden", "true");
    // Réactivation des éléments en arrière-plan de la modale :
    // Sélection de tous les enfants de <body> excepté la modale
    document.querySelectorAll('body > *:not(#lightbox_modal):not(.lightbox-prev):not(.lightbox-next):not(.lightbox-close)').forEach(element => {
        // Pour chacun, suppression de l'attribut "aria-hidden" pour les rendre invisibles aux technologies d"assistance
        element.removeAttribute("aria-hidden");
        element.setAttribute("tabindex", "-1"); // Désactive le focus sur ces éléments
    });
}

/********************************************************************
 * Fonction "displayLightbox" pour afficher de la modale lightbox au clic sur un média du photographe
 * Appel depuis pages/photographer.js
 * 
 * @param {media} - chemin de l'image ou de la vidéo à afficher
 * @param {desc} - description associée à l'image ou la vidéo
 */
function displayLightbox(media, desc, type) {
    // Sélection de la lightbox via son ID "#lightbox_modal"
    const modal = document.querySelector("#lightbox_modal");
    // Sélection de l'overlay via sa classe ".overlay"
    const overlay = document.querySelector(".overlay");
    // Affichage de la lightbox en modifiant son style display à "block"
	modal.style.display = "block";
    // Affichage de l'overlay en modifiant son style display à "block"
    overlay.style.display = "block";
    // La modale est accessible par les technologies d’assistance
    modal.setAttribute("aria-hidden", "false");
    // Désactivation des éléments en arrière-plan de la modale
    document.querySelectorAll('body > *:not(#lightbox_modal):not(.lightbox-prev):not(.lightbox-next):not(.lightbox-close)').forEach(element => {
        element.setAttribute("aria-hidden", "true");
        element.setAttribute("tabindex", "-1"); // Désactive le focus sur les éléments en arrière-plan
    });
    // Sélection de l'élément où l'image/la vidéo sera insérée via sa classe ".lightbox-img"
    const ligthboxImg = document.querySelector(".lightbox-img");
    // Réinitialise le contenu de l'élément pour s'assurer qu'il est vide
    ligthboxImg.innerHTML = "";
    // Teste si l'image est une vidéo en testant si le chemin se termine par ".mp4"
    if (media.endsWith(".mp4")) {
        // Si oui, création d'un élément <video> pour la vidéo
        const imgMedia = document.createElement("video");
        imgMedia.src = media;   // Définit la source de la vidéo
        imgMedia.autoplay = "true"; // Ajout de l'attribut autoplay pour démarrer la lecture automatique
        ligthboxImg.appendChild(imgMedia);  // Ajout de l'élément vidéo à la lightbox
    } else {
        // Si non, création d'un élément <img> pour l'image'
        const imgMedia = document.createElement("img");
        imgMedia.src = media;   // Définit la source de l'image'
        imgMedia.alt = desc;    // Définit le texte alternatif de l'image
        ligthboxImg.appendChild(imgMedia);  // Ajout de l'élément img à la lightbox
    }
    // Sélection la description via sa classe ".lightbox-desc"
    const ligthboxDesc = document.querySelector(".lightbox-desc");
    // Mise à jour du texte de la description dans la lightbox
    ligthboxDesc.textContent = desc;
    // Déplacement du focus initial sur la modale
    console.log("modal.querySelector(.lightbox-modal : ", modal.querySelector(".lightbox-modal"));
    modal.querySelector(".lightbox-modal").focus();
    console.log("modal.querySelector(.lightbox-next : ", modal.querySelector(".lightbox-next"));
    type === "next" ? modal.querySelector(".lightbox-next").focus() : modal.querySelector(".lightbox-prev").focus();
    // Appel de la fonction "focusTrapLightbox" pour gérer le Focus trap sur la modale
    focusTrapLightbox()
    // Ajout du gestionnaire pour forcer le focus à rester dans la lightbox
    modal.addEventListener("focusin", (event) => {
        if (!modal.contains(event.target)) {
            event.stopPropagation();
            modal.focus(); // Redirige le focus vers la modale si le focus sort
        }
    }); 
}

/********************************************************************
 * Affichage du média suivant
 * 
 * @param {*} index 
 * @param {*} mediaFiltre 
 */
function displayNextMedia (index, mediaFiltre) {
    // Calcul du nouvel index pour naviguer au média suivant
    newIndex = (index + 1) % mediaFiltre.length;
    // Test si le média au nouvel index est une image ou une vidéo
    media = mediaFiltre[newIndex].image ? mediaFiltre[newIndex].image : mediaFiltre[newIndex].video;
    // Construction du chemin complet du média
    pathMedia = `${mediaFiltre[newIndex].dirPhotographer}${media}`
    // Appel de la fonction "displayLightbox" pour afficher la lightbox avec le nouveau média et son titre
    displayLightbox (pathMedia, mediaFiltre[newIndex].title, "next");
    // Mise à jour de l'index actuel avec le nouvel index
    index = newIndex;
    // Appel de la fonction "listenLightbox" pour ajouter les listeners sur les flèches suivant/précédent
    listenLightbox (index, mediaFiltre);
    return index;
}

/********************************************************************
 * Affichage du média précédent
 * 
 * @param {*} index 
 * @param {*} mediaFiltre 
 */
function displayPrevMedia (index, mediaFiltre) {
    // Calcul du nouvel index pour naviguer au média précédent
    newIndex = (index - 1 + mediaFiltre.length) % mediaFiltre.length;
    // Test si le média au nouvel index est une image ou une vidéo
    media = mediaFiltre[newIndex].image ? mediaFiltre[newIndex].image : mediaFiltre[newIndex].video;
    // Construction du chemin complet du média
    pathMedia = `${mediaFiltre[newIndex].dirPhotographer}${media}`
    // Appel de la fonction "displayLightbox" pour afficher la lightbox avec le nouveau média et son titre
    displayLightbox (pathMedia, mediaFiltre[newIndex].title, "prev");
    // Mise à jour de l'index actuel avec le nouvel index
    index = newIndex;
    // Appel de la fonction "listenLightbox" pour ajouter les listeners sur les flèches suivant/précédent
    listenLightbox (index, mediaFiltre);
    return index;
}

/********************************************************************
 * Configuration du focus trap sur la modale
 */
function focusTrapLightbox() {
    // Sélection de la modale via son ID "#lightbox_modal"
    const modal = document.querySelector("#lightbox_modal");    
    // Sélection des éléments interactifs de la modale (y compris les éléments HTML ayant un attribut "tabindex" qui n'est pas égale à -1.)
    const focusableElements = modal.querySelectorAll(`button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])`);
    // Sélection du 1er et du dernier élément intéractif
    const firstElement = focusableElements[0];

    const lastElement = focusableElements[focusableElements.length - 1];

    // Capturer les appuis sur les touches de tabulation
    modal.addEventListener("keydown", function (event) {

        // Capturer les appuis sur Tab et Shift + Tab
        const isTabPressed = (event.key === "Tab" || event.keyCode === 9);

        if (!isTabPressed) return;
        if (event.shiftKey) { // Si "Shift + Tab" est pressé
            if (document.activeElement === firstElement) {
                event.preventDefault();
                console.log("lastElement : ", lastElement);
                lastElement.focus(); // Boucle au dernier élément
            }
        } else { // Si seulement "Tab" est pressé
            if (document.activeElement === lastElement) {
                event.preventDefault();
                console.log("firstElement : ", firstElement);
                firstElement.focus(); // Boucle au premier élément
            }
        }
    });
}

/********************************************************************
 * Fonction "listenLightbox" pour écouter le clic sur les flèches précédent et suivant dans la lightox
 * 
 * @param {index} - index actuel du média affiché dans la lightbox 
 * @param {mediaFiltre} - tableau contenant les objets médias filtrés 
 */
function listenLightbox (index, mediaFiltre) {
    // Initialisation à false d'une variable permettant de savoir si la touche "enter" a été activée
    let enterKeyTriggered = false;
    // Listener sur la flèche "précédent" de la lightbox via sa classe ".lightbox-prev"
    const prevBtn = document.querySelector(".lightbox-prev");
    // Ajout du listener au "clic" sur la flèche
    prevBtn.addEventListener("click", () => {
        if (!enterKeyTriggered) { // Vérifier que l'Enter n'a pas déjà déclenché l'action
            const newIndex = displayPrevMedia(index, mediaFiltre);
            index = newIndex;
        }
        enterKeyTriggered = false; // Réinitialiser la variable après le clic
    })
    prevBtn.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            enterKeyTriggered = true;
            const newIndex = displayPrevMedia(index, mediaFiltre);
            index = newIndex;
        }
    });

    // Listener sur la flèche "suivant" de la lightbox via sa classe ".lightbox-next"
    const nextBtn = document.querySelector(".lightbox-next");
    // Ajout du listener au "clic" sur la flèche
    nextBtn.addEventListener("click", () => {
        if (!enterKeyTriggered) {   // Vérifier que l'Enter n'a pas déjà déclenché l'action
            const newIndex = displayNextMedia(index, mediaFiltre);
            index = newIndex;
        }
        enterKeyTriggered = false; // Réinitialiser la variable après le clic
    })
    nextBtn.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            enterKeyTriggered = true;
            const newIndex = displayNextMedia(index, mediaFiltre);
            index = newIndex;
        }
    });
}

// Fermeture de la modale avec la touche "Escape"
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeModalLightbox();
    }
});