/********************************************************************
 * Fonction "getData" asynchrone de récupération des données des photographes ou des médias des photographes depuis le fichier JSON
 * 
 * @returns {data} - l'objet JavaScript contenant les données des photographes 
 */
export async function getData () {
    // Requête HTTP pour récupérer le fichier JSON contenant les données des photographes (avec attente que l'opération soit terminée)
    const reponse = await fetch("./data/photographers.json");

     // Conversion de la réponse HTTP en objet JavaScript (avec attente que l'opération soit terminée) dans la constante "data"
    const data = await reponse.json();

    // Retour de l'objet JavaScript "data" contenant les données des photographes.
    return data;
}