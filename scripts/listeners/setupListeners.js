// Import(s)
// *********
import { listenersMedias, listenerLike } from "../listeners/listeners.js";
import { listenersDropDownMenu } from "../utils/dropdownMenu.js";

/********************************************************************
 * @description - lancer les listeners sur le dropdown menu, sur les médias et sur les likes
 * @function (setupListeners)
 * @param {mediaSection} - classe de la section des médias
 * @param {mediaFiltre} - tableau contenant les objets médias filtrés
 * @param {dirPhotographer} - répertoire des medias du photographe
 */
export function setupListeners(mediaSection, mediaFiltre, dirPhotographer) {
    listenersDropDownMenu(mediaFiltre, dirPhotographer);  // Listener sur le dropdown menu
    listenersMedias(mediaSection);  // Listener sur les médias
    listenerLike();  // Listener sur les likes
}