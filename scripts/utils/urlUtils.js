/********************************************************************
 * Fonction "getURL" de récupération des paramètres de l'URL
 * 
 * @param {string} - nom du pramètre à récupérer
 * @returns {field} - valeur du paramètre
 */
export function getURL (string){
    // Création d'un objet contenant tous les paramètres de l'URL actuel de la page
    const urlParams = new URL(document.location).searchParams;
    // Récupération du paramètre correspondant à la valeur "string" passée en paramètre à la fonction
    const field = urlParams.get(string);
    // Retour de la valeur du paramètre
    return field;
}