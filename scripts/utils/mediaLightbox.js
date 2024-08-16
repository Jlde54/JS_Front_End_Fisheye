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
}

/********************************************************************
 * Fonction "displayLightboxModal" pour afficher de la modale lightbox au clic sur un média du photographe
 * 
 * @param {image} - chemin de l'image ou de la vidéo à afficher
 * @param {desc} - description associée à l'image ou la vidéo
 */
function displayLightbox(image, desc) {
    // Sélection de la lightbox via son ID "#lightbox_modal"
    const modal = document.querySelector("#lightbox_modal");
    // Sélection de l'overlay via sa classe ".overlay"
    const overlay = document.querySelector(".overlay");
    // Affichage de la lightbox en modifiant son style display à "block"
	modal.style.display = "block";
    // Affichage de l'overlay en modifiant son style display à "block"
    overlay.style.display = "block";
    // Focus sur le bouton de fermeture
    document.querySelector('.lightbox-close').focus();
    // Sélection de l'élément où l'image ou la vidéo sera insérée via sa classe ".lightbox-img"
    const ligthboxImg = document.querySelector(".lightbox-img");
    // Réinitialise le contenu de l'élément pour s'assurer qu'il est vide
    ligthboxImg.innerHTML = "";
    // Teste si l'image est une vidéo en testant si le chemin se termine par ".mp4"
    if (image.endsWith(".mp4")) {
        // Si oui, création d'un élément <video> pour la vidéo
        const imgMedia = document.createElement("video");
        imgMedia.src = image;   // Définit la source de la vidéo
        imgMedia.autoplay = "true"; // Ajout de l'attribut autoplay pour démarrer la lecture automatique
        ligthboxImg.appendChild(imgMedia);  // Ajout de l'élément vidéo à la lightbox
    } else {
        // Si non, création d'un élément <img> pour l'image'
        const imgMedia = document.createElement("img");
        imgMedia.src = image;   // Définit la source de l'image'
        imgMedia.alt = desc;    // Définit le texte alternatif de l'image
        ligthboxImg.appendChild(imgMedia);  // Ajout de l'élément img à la lightbox
    }
    // Sélection la description via sa classe ".lightbox-desc"
    const ligthboxDesc = document.querySelector(".lightbox-desc");
    // Mise à jour du texte de la description dans la lightbox
    ligthboxDesc.textContent = desc;
}


/********************************************************************
 * Fonction "listenLightbox" pour écouter le clic sur les flèches précédent et suivant dans la lightox
 * 
 * @param {index} - index actuel du média affiché dans la lightbox 
 * @param {mediaFiltre} - tableau contenant les objets médias filtrés 
 */
function listenLightbox (index, mediaFiltre) {
    // Listener sur la flèche "précédent" de la lightbox via sa classe ".lightbox-prev"
    const prevBtn = document.querySelector(".lightbox-prev");
    // Ajout du listener au "click" sur la flèche
    prevBtn.addEventListener("click", () => {
        // Calcul du nouvel index pour naviguer au média précédent
        newIndex = (index - 1 + mediaFiltre.length) % mediaFiltre.length;
        // Test si le média au nouvel index est une image ou une vidéo
        if (mediaFiltre[newIndex].image) {
            image = mediaFiltre[newIndex].image;    // Récupère le chemin de l'image
        } else {
            image = mediaFiltre[newIndex].video;    // Récupère le chemin de la vidéo
        }
        // Construction du chemin complet du média
        pathImage = `${mediaFiltre[newIndex].dirPhotographer}${image}`
        // Appel de la fonction "displayLightbox" pour afficher la lightbox avec le nouveau média et son titre
        displayLightbox (pathImage, mediaFiltre[newIndex].title);
        // Mise à jour de l'index actuel avec le nouvel index
        index = newIndex;
    })
    // Listener sur la flèche "suivant" de la lightbox via sa classe ".lightbox-next"
    const nextBtn = document.querySelector(".lightbox-next");
    // Ajout du listener au "click" sur la flèche
    nextBtn.addEventListener("click", () => {
        // Calcul du nouvel index pour naviguer au média suivant
        newIndex = (index + 1) % mediaFiltre.length;
        // Test si le média au nouvel index est une image ou une vidéo
        if (mediaFiltre[newIndex].image) {
            image = mediaFiltre[newIndex].image;    // Récupère le chemin de l'image
        } else {
            image = mediaFiltre[newIndex].video;    // Récupère le chemin de la vidéo
        }
        // Construction du chemin complet du média
        pathImage = `${mediaFiltre[newIndex].dirPhotographer}${image}`
        // Appel de la fonction "displayLightbox" pour afficher la lightbox avec le nouveau média et son titre
        displayLightbox (pathImage, mediaFiltre[newIndex].title);
        // Mise à jour de l'index actuel avec le nouvel index
        index = newIndex;
    })
}

// Fermeture de la modale avec la touche "Escape"
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape") {
        closeModalLightbox();
    }
});