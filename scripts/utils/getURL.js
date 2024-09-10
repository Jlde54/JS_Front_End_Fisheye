/********************************************************************
 * @description - récupération des paramètres de l'URL
 * @function (getURL)
 * @param {string} - nom du paramètre à récupérer
 * @returns {field} - valeur du paramètre 
 */
export function getURL (string){
    const urlParams = new URL(document.location).searchParams;  // objet contenant tous les paramètres de l'URL actuel de la page
    const field = urlParams.get(string);    // paramètre URL correspondant à la valeur "string" passée en paramètre
    return field;
}