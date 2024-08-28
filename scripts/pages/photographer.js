import { getPhotographerParams, getPhotographerFolder } from "../utils/photographerUtils.js";
import { displayPhotographerHeader, displayDropdownMenu, displayTarif } from "../components/displays.js";
import { displayData } from "../templates/photographer.js";
import { setupListeners } from '../listeners/setupListeners.js';
import { listenersMedias, listenerLike } from "../listeners/listeners.js";
import { getData } from "../services/dataService.js";

/********************************************************************
 * Initialisation des variables globales
 */
let mediaFiltre = [];   // tableau contenant les médias du photographe
let dirPhotographer = "";   // répertoire des medias du photographe
let isMenuOpen = false; // état du dropdown menu (ouvert ou fermé)
let focusedOptionIndex; // index de l'option qui a le focus dans le dropdown menu

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
   * Fermeture du menu dropdown
   * 
   * @param {dropdownButton} - 
   * @param {dropdownMenu} - 
   * @return {isMenuOpen}
   */
  export function closeDropdownMenu(dropdownButton, dropdownMenu) {
    dropdownMenu.style.display = 'none';
    dropdownButton.setAttribute('aria-expanded', 'false');
    isMenuOpen = false;
    // dropdownButton.focus();
    return isMenuOpen;
  }

/********************************************************************
 * Fonction "handleLikeListener" pour mettre à jour le nombre de likes sur le média cliqué, dans le total du photographe et dans "mediaFiltre"
 * 
 * @param {event}  
 * @param {index}  
 */
export function handleLikeListener (event, index) {
    const clickedLike = event.target;
    // Trouver l'élément article parent
    const articleElem = clickedLike.closest("article");
    // Trouver l'élément ".medias_section_likes" à l'intérieur de l'élément "article"
    const likeElem = articleElem.querySelector(".medias_section_likes");
    // Trouver l'élément ".photograph-likes"
    const sumLikes = document.querySelector(".photograph-likes");

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
 * Fonction "handleMediaListener" pour préparer l'affichage de la lightbox càd construire le chemin complet du média et appeler l'affichage du média cliqué
 * 
 * @param {event} - événement correspondant au média choisi
 * @param {index} - index correspondant au média choisi dans le tableau "mediaFiltre"
 */
export function handleMediaListener (event, index) {
    
    event.preventDefault(); // Empêche le comportement par défaut du lien
    let media = "";     // variable pour stocker le chemin de <img> ou <video>
    // Teste si le média courant est une image ou une vidéo et met à jour la variable image en conséquence
    media = mediaFiltre[index].image ? mediaFiltre[index].image : mediaFiltre[index].video;
    // Construction du chemin complet du média en combinant le répertoire du photographe et le nom de l'image/vidéo
    const pathMedia = `${mediaFiltre[index].dirPhotographer}${media}`
    // Appel de la fonction "displayLightbox" pour afficher le média cliqué dans la lightbox
    displayLightbox (pathMedia, mediaFiltre[index].title, "next");
    // Appel de la fonction "listenLightbox" pour ajouter les listeners sur les flèches suivant/précédent
    listenLightbox (index, mediaFiltre);
}

/********************************************************************
 * Fonction "init" asynchrone pour l'initialisation de la la page photographe (photographer.html)
 */
async function init () {
    // Appel de la fonction "getPhotographerParams" pour récupèrer les paramètres du photographe de l'URL
    const constURL = getPhotographerParams(urlArray);

    // Appel de la fonction "getData" pour la récupération des medias des photographes (getData se trouve dans le fichier /scripts/services/dataSercice.js)
    const { media } = await getData ();

    // Filtre des médias correspondants à l'id du photographe
    mediaFiltre = media.filter((item) => item.photographerId == constURL.id);

    // Appel de la fonction "displayPhotographerHeader" pour l'affichage de l'entête du photographe
    displayPhotographerHeader (constURL.name, constURL.city, constURL.country, constURL.tagline, constURL.picture);

    // Déterminer le dossier du photographe
    dirPhotographer = getPhotographerFolder(constURL.name);

    // Ajout de la propriété contenant le nom du dossier "dirPhotographer" et de la propriété "liked" dans chaque objet du tableau "mediaFiltre"
    mediaFiltre.forEach(item => {
        item.dirPhotographer = `./assets/photographers/${dirPhotographer}/`;
        item.liked = false;
    });

    // Appel de la fonction "displayData" pour l'affichage des medias des photographes (displayData se trouve dans le fichier /scripts/templates/photographer.js)
    displayData (mediaFiltre, ".medias_section", dirPhotographer);

    // Appel de la fonction "displayTarif" pour l'affichage de l'encart contenant le nombre de likes et le tarif du photographe
    // 1) Extraction et calcul de la somme des likes des médias 
    const sumLikes = mediaFiltre.map(like => like.likes).reduce((a,b) => a + b, 0);
    // 2) Appel de la fonction displayTarif pour l'affichage
    displayTarif (constURL.price, sumLikes);
    
    // Appel de la fonction "displayDropdownMenu" pour l'affichage du dropdown menu
    displayDropdownMenu ();

    // Configuration des listeners sur le dropdown menu, les medias et les likes
    setupListeners(".medias_section", isMenuOpen);
}

  /********************************************************************
   * Ouverture du menu dropdown
   * 
   * @param {dropdownButton} - élément qui affiche l'option sélectionnée dans le menu
   * @param {dropdownMenu} - menu déroulant qui contient les options de tri
   * @param {options} - options dans le menu
   * @return {type} - déclencheur de l'ouverture du menu (enter ou autre)
   */
  export function openDropdownMenu(dropdownButton, dropdownMenu, options, type) {
    dropdownMenu.style.display = 'block'; // afficher le menu
    dropdownButton.setAttribute('aria-expanded', 'true');
    isMenuOpen = true;  // menu ouvert
    focusedOptionIndex = 0;
    dropdownButton.blur();  // suppression du focus du bouton
    // mise du focus sur la 1ère option 
    type === "enter" && options[focusedOptionIndex].focus();
    return isMenuOpen;
  }

/********************************************************************
 * Fonction "optionSelected" pour l'affichage des médias après la sélection de l'option
 * 
 * @param {option} - option choisie 
 * @param {dropdownButton} - élément qui affiche l'option sélectionnée dans le menu
 * @param {dropdownMenu} - menu déroulant qui contient les options de tri 
 */
export function optionSelected (dropdownButton, dropdownMenu, option) {
    // Mise à jour de dropdownButton avec le texte de l'option sélectionnée
    dropdownButton.innerHTML = `${option.textContent}<span class="arrow"><i class="fa-solid fa-chevron-down"></i></span>`;
    // Tri de mediaFiltre selon l'option sélectionnée
    switch (option.textContent) {
        case "Popularité ":
            // Tri en ordre croissant de popularité
            mediaFiltre.sort((a, b) => Number(a.likes) - Number(b.likes));
            break;
        case "Date":
            // Tri en ordre croissant de date
            mediaFiltre.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case "Titre":
            // Tri en ordre alphabétique de titre
            mediaFiltre.sort((a, b) => {
                if(a.title < b.title) return -1;
                if(a.title > b.title) return 1;
                return 0;
            });
            break;
        default:
            break;
    }

    // Appel de la fermeture du menu
    isMenuOpen = closeDropdownMenu(dropdownButton, dropdownMenu);
    // Appel de l'affichage des medias des photographes après le tri
    displayData (mediaFiltre, ".medias_section", dirPhotographer);
    // Appel de la fonction "listenersMedias" pour l'ajout des listeners sur les médias affichés
    listenersMedias (".medias_section");
    // Appel de la fonction "listenerLike" pour l'ajout des listeners sur les likes des médias affichés
    listenerLike ();

    return isMenuOpen;
}

/********************************************************************
 * Appel de l'ouverture/Fermeture du menu dropdown en fonction du contenu de "isMenuOpen"
 * 
 * @param {dropdownButton} - bouton déclenchant l'ouverture du menu
 * @param {dropdownMenu} - élément représentant le menu
 * @param {options} - liste des options du menu 
 * @param {type} - événement ayant déclanché l'appel (clic ou enter)
 * @param {isMenuOpen} - menu ouvert ou fermé
 */
export function toggleDropdownMenu(dropdownButton, dropdownMenu, options, type, isMenuOpen) {
    if (isMenuOpen) {
        // Appel de la fermeture du menu
        isMenuOpen = closeDropdownMenu(dropdownButton, dropdownMenu);
    } else {
        // Appel de l'ouverture' du menu dropdown
        isMenuOpen = openDropdownMenu(dropdownButton, dropdownMenu, options, type);
    }
return isMenuOpen;
  }

/********************************************************************
 * Appel de la fonction init() pour initialiser la page contenant les médias du photographe sélectionné (photographer.html)
 */
init ();
