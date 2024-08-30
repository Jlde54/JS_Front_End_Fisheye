// Import(s)
// *********
import { getURL } from "./urlUtils.js";

/********************************************************************
 * Fonction "getPhotographerFolder" pour obtenir le nom du dossier du photographe
 * 
 * @param {name} - nom du photographe
 * @returns {dirPhotographer} - dossier du photographe
 */
export function getPhotographerFolder(name) {
    // Prendre le contenu de "name" avant le 1er espace
    let dirPhotographer = "";
    const firstSpaceIndex = name.indexOf(" ");
    let string = firstSpaceIndex === -1 ? name : name.substring(0, firstSpaceIndex);
    // Mettre un espace à la place des caractères qui ne sont pas des lettres 
    dirPhotographer = string.replace(/[^a-zA-Z]/g, " ");
    return dirPhotographer;
}

/********************************************************************
 * @description - Fonction "getPhotographerParams" pour récupérer les paramètres de l'URL
 * 
 * @param {urlArray} - libellés des paramètres de l'URL
 * 
 * @function (getURL) - récupération d'un paramètre de l'URL
 * 
 * @returns {params} - objet contenant les données des paramètres de l'URL
 */
export function getPhotographerParams(urlArray) {
    const params = {};
    urlArray.forEach(elem => {
        params[elem] = getURL(elem);
    });
    return params;
}
