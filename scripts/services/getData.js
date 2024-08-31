/********************************************************************
 * Fonction "getData" asynchrone de récupération des données des photographes ou des médias des photographes depuis le fichier JSON
 * 
 * @description - récupération des données des photographes ou des médias des photographes depuis le fichier JSON
 * @function (getData)
 * @returns {} - l'objet JavaScript contenant les données des photographes 
 */
export async function getData () {
    const reponse = await fetch("./data/photographers.json");   // récupérer le fichier JSON contenant les données des photographes
    return await reponse.json();    // Conversion de la réponse HTTP en objet JavaScript et return 
}