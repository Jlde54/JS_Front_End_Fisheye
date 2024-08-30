/********************************************************************
 * Fonction "getURL" de récupération des paramètres de l'URL
 * 
 * @param {string} - nom du pramètre à récupérer
 * @returns {field} - valeur du paramètre
 */
export function getURL (string){
    const urlParams = new URL(document.location).searchParams;  // objet contenant tous les paramètres de l'URL actuel de la page
    const field = urlParams.get(string);    // paramètre correspondant à la valeur "string" passée en paramètre
    return field;
}