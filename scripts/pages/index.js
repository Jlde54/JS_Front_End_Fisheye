// Import(s)
// *********
import { getData } from "../services/dataService.js";
import { displayData } from "../templates/photographer.js";

/********************************************************************
 * Fonction asynchrone d'initialisation de la page d'accueil (index.html)
 */
async function init () {
    const { photographers } = await getData();  // Appel de la fonction getData() pour récupèrer les données des photographes
    displayData (photographers, ".photographer_section");   // Appel de la fonction displayData() pour afficher les données des photographes 
}

/********************************************************************
 * Appel de la fonction init() pour initialiser la page d'accueil (index.html)
 */
init ();
