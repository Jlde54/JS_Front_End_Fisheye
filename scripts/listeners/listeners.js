// Import(s)
// *********
import { handleMediaListener, handleLikeListener } from "../pages/photographer.js";

/********************************************************************
 * Fonction "listenersMedias" pour la création des listeners pour ouvrir la lightbox
 * 
 * @param {section} - section contenant les médias affichés
 */
export function listenersMedias (section) {
    const mediaLinks  = document.querySelectorAll(`${section} a`);  // Sélection de tous les médias <a> dans la section spécifiée

    // Gestion des événements clic et clavier (enter ou espacement) sur chaque média
    function handleEvent(event, index) {
        if (event.type === "click" || event.key === " " || event.key === "Enter") {
            event.preventDefault();
            handleMediaListener(event, index);  // construction du chemin complet du média et appel de l'affichage du média cliqué
        }
    }
     // Ajout des listeners (clic et clavier) sur chaque média
     mediaLinks.forEach((item, index) => {
        item.addEventListener("click", (event) => handleEvent(event, index));
        item.addEventListener("keydown", (event) => handleEvent(event, index));
    });
}

/********************************************************************
 * Fonction "listenerLike" pour écouter chaque icône "Like" et mettre à jour le nombre de likes sur le média cliqué, dans le total du photographe et dans "mediaFiltre"
 */
export function listenerLike () {
    const likes = document.querySelectorAll(".fa-heart");   // Sélection de tous les éléments avec la classe .fa-heart (icônes likes)
    // Ajout d'un listener sur clic, enter ou espacement sur chaque icône
    likes.forEach((like, index) => {
        like.addEventListener("click", (event) => {
            handleLikeListener (event, index)   // mise à jour du nombre de likes sur le média cliqué, dans le total du photographe et dans "mediaFiltre" 
        });
        like.addEventListener("keydown", (event) => {
            if (event.key === " " || event.key === "Enter") {
                event.preventDefault();
                handleLikeListener (event, index)   // mise à jour du nombre de likes sur le média cliqué, dans le total du photographe et dans "mediaFiltre" 
            }
        })
    })
}