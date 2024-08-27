import { listenersDropDownMenu, listenersMedias, listenerLike } from "../listeners/listeners.js";
/********************************************************************
 * Fonction pour configurer les différents listeners
 * 
 * @param {mediaSection} - classe de la section des médias
 * @param {isMenuOpen} - état du dropdown menu (ouvert ou fermé)
 */
export function setupListeners(mediaSection, isMenuOpen) {
    listenersDropDownMenu(isMenuOpen);  // Gestion du dropdown menu
    listenersMedias(mediaSection);  // Gestion du clic sur les médias
    listenerLike();  // Gestion des likes
}