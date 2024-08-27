import { getData } from "../services/dataService.js";

/********************************************************************
 * Fonction asynchrone d'initialisation de la page d'accueil (index.html)
 */
async function init () {
    // Appel de la fonction getData() pour récupèrer les données des photographes en extrayant la propriété "photographers" (avec attente que l'opération soit terminée).
    // getData() se trouve dans le fichier scripts/templates/photographer.js
    const { photographers } = await getData();

    // Appel de la fonction displayData() pour afficher, dans la section ".photographer_section", les données des photographes récupérées avec getData().
    // displayData() se trouve dans le fichier scripts/templates/photographer.js
    displayData (photographers, ".photographer_section");
}

/********************************************************************
 * Appel de la fonction init() pour initialiser la page d'accueil (index.html)
 */
init ();
