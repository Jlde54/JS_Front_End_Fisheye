// Import(s)
// *********
import { listenersMedias, listenerLike } from "../listeners/listeners.js";
import { listenersDropDownMenu } from "../utils/dropdownMenu.js";

/********************************************************************
 * Fonction pour lancer les différents listeners
 * 
 * @param {mediaSection} - classe de la section des médias
 * @param {mediaFiltre} - tableau contenant les objets médias filtrés
 * @param {dirPhotographer} - répertoire des medias du photographe
 */
export function setupListeners(mediaSection, mediaFiltre, dirPhotographer) {
    listenersDropDownMenu(mediaFiltre, dirPhotographer);  // Listener du dropdown menu
    listenersMedias(mediaSection);  // Listener sur les médias
    listenerLike();  // Listener des likes
}