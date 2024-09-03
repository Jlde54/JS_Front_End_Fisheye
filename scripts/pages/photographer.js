// Import(s)
import { getPhotographerParams, getPhotographerFolder } from "../utils/photographerUtils.js";
import { displayPhotographerHeader, displayTarif, displayDropdownMenu } from "../components/displays.js";
import { displayData } from "../templates/photographer.js";
import { setupListeners } from '../listeners/setupListeners.js';
import { getData } from "../services/getData.js";

/********************************************************************
 * Initialisation des variables globales
 */
let mediaFiltre = [];   // tableau contenant les médias du photographe
let dirPhotographer = "";   // répertoire des medias du photographe

// Paramètres de l'URL
let urlArray = [
    "id",           // identifiant du photographe
    "name",         // nom du photographe
    "city",         // ville du photographe
    "country",      // pays du photographe
    "tagline",      // slogan du photographe
    "picture",      // chemin du portrait du photographe
    "price"];       // tarif du photographe

/********************************************************************
 * @description - mettre à jour le nombre de likes sur le média cliqué, dans le total du photographe et dans "mediaFiltre"
 * @function (handleLikeListener)
 * @param {event} - événement ayant déclenché le like
 * @param {index} - index du médias ayant déclenché le like
 */
export function handleLikeListener (event, index) {
    const clickedLike = event.target;   //  élément like cliqué
    const articleElem = clickedLike.closest("article"); // Trouver l'élément article parent le + proche contenant l'élément cliqué
    const likeElem = articleElem.querySelector(".medias_section_likes");    // likes pour la photo
    const sumLikes = document.querySelector(".photograph-likes");   // nombre total de likes

    // Récupérer les valeurs actuelles
    let currentLikes = parseInt(likeElem.textContent);
    let currentSumLikes = parseInt(sumLikes.textContent);

    const isLiked = mediaFiltre[index].liked;   // Vérifier si le média est déjà liké

    // Définir les valeurs à mettre à jour
    const likeChange = isLiked ? -1 : 1;    // ajout ou retrait de like
    const newLikes = currentLikes + likeChange;
    const newSumLikes = currentSumLikes + likeChange;

    // Mettre à jour l'état du média dans mediaFiltre
    mediaFiltre[index].liked = !isLiked;
    mediaFiltre[index].likes += likeChange;

    // Mettre à jour l'affichage des likes pour le média cliqué
    likeElem.textContent = newLikes;
    likeElem.setAttribute("aria-label", `${newLikes} likes`);

    // Mettre à jour le total des likes affiché
    sumLikes.innerHTML = `${newSumLikes} <span class="arrow"><i class="fa-solid fa-heart"></i></span>`;
    sumLikes.setAttribute("aria-label", `${newSumLikes} likes`);

}

/********************************************************************
 * @description - construire le chemin complet du média et appeler l'affichage du média cliqué dans la lightbox
 * @function (handleMediaListener)
 * @param {event} - événement correspondant au média choisi
 * @param {index} - index correspondant au média choisi dans le tableau "mediaFiltre"
 */
export function handleMediaListener (event, index) {
    event.preventDefault();
    let media = "";     // variable pour stocker le chemin de <img> ou <video>
    media = mediaFiltre[index].image ? mediaFiltre[index].image : mediaFiltre[index].video; // media est le media en cours (image ou vidéo)
    const pathMedia = `${mediaFiltre[index].dirPhotographer}${media}`   // Construction du chemin complet du média
    openLightbox (event, pathMedia, mediaFiltre[index].title, "next");  // Appel de "openLightbox" pour afficher le média cliqué dans la lightbox
    listenLightbox (index, mediaFiltre);    // Appel de "listenLightbox" pour ajouter les listeners sur les flèches suivant/précédent
}

/********************************************************************
 * @description - initialisation de la la page photographe (photographer.html)
 * @function (init)
 */
async function init () {
    const constURL = getPhotographerParams(urlArray);   // Appel de "getPhotographerParams" pour récupèrer les paramètres du photographe de l'URL
    const { media } = await getData (); // Appel de "getData" pour la récupérer les medias des photographes

    mediaFiltre = media.filter((item) => item.photographerId == constURL.id);   // Filtre des médias correspondants à l'id du photographe

    displayPhotographerHeader (constURL.name, constURL.city, constURL.country, constURL.tagline, constURL.picture); // Appel de l'affichage de l'entête du photographe

    dirPhotographer = getPhotographerFolder(constURL.name); // Déterminer le dossier du photographe

    // Ajout de la propriété contenant le nom du dossier "dirPhotographer" et de la propriété "liked" dans chaque objet du tableau "mediaFiltre"
    mediaFiltre.forEach(item => {
        item.dirPhotographer = `./assets/photographers/${dirPhotographer}/`;
        item.liked = false;
    });

    displayData (mediaFiltre, ".medias_section", dirPhotographer);  // Appel de l'affichage des medias des photographes

    // Appel de l'affichage de l'encart contenant le nombre de likes et le tarif du photographe 
    const sumLikes = mediaFiltre.map(like => like.likes).reduce((a,b) => a + b, 0); // Extraction et calcul de la somme des likes des médias
    displayTarif (constURL.price, sumLikes);    // 2) Appel de l'affichage du tarif et du total des likes
    
    displayDropdownMenu ();    // Appel de l'affichage du dropdown menu

    setupListeners(".medias_section", mediaFiltre, dirPhotographer);    // Configuration des listeners sur le dropdown menu, les medias et les likes
}

/********************************************************************
 * Appel de la fonction init() pour initialiser la page contenant les médias du photographe sélectionné (photographer.html)
 */
init ();
