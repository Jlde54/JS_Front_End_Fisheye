// Import(s)
// *********
import { displayData } from "../templates/photographer.js";
import { listenersMedias, listenerLike } from "../listeners/listeners.js";

// Variable(s) globale(s)
// **********************
let isMenuOpen = false;   // état du dropdown menu (ouvert ou fermé)
let focusedOptionIndex = 0; // index de l'option qui a le focus dans le dropdown menu

/********************************************************************
 * @description - Fermeture du menu dropdown
 * @function (closeDropdownMenu)
 * @param {dropdownButton} - élément qui affiche l'option sélectionnée dans le menu
 * @param {dropdownMenu} - menu déroulant qui contient les options de tri
 */
export function closeDropdownMenu(dropdownButton, dropdownMenu) {
    dropdownMenu.style.display = 'none';
    dropdownButton.setAttribute('aria-expanded', 'false');
    isMenuOpen = false; // Dropdown menu fermé
    dropdownButton.focus();
}

/********************************************************************
 * @description - Configuration du focus trap sur le dropdown menu
 * @function (focusTrapForm)
 */
function focusTrapMenu() {
    const menu = document.querySelector("#dropdown-menu");
    const focusableElements = menu.querySelectorAll(".option");   // toutes les options du menu

    // Sélection du 1er et du dernier élément intéractif
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Capturer les appuis surTab et Shift + Tab
    menu.addEventListener("keydown", (event) => {
        if (event.key === "Tab" || event.keyCode === 9) {
            if (event.shiftKey && document.activeElement === firstElement) { // Si "Shift + Tab" et l'élément actif est le 1er champ
                    event.preventDefault();
                    lastElement.focus(); // Boucle au dernier élément
            } else if (!event.shiftKey && document.activeElement === lastElement) { // Si "Tab" est pressé et l'élément actif est le dernier champ
                    event.preventDefault();
                    firstElement.focus(); // Boucle au premier élément
            }
        }
    });
}

/********************************************************************
 * @description - créer les listeners pour ouvrir ou fermer le dropdown menu et pour sélectionner une option
 * @function (listenersDropDownMenu)
 * @param {mediaFiltre} - tableau contenant les objets médias filtrés
 * @param {dirPhotographer} - répertoire des medias du photographe
 */
export function listenersDropDownMenu (mediaFiltre, dirPhotographer) {
    const dropdownButton = document.querySelector("#select-list");  // bouton du dropdown menu
    const dropdownMenu = document.querySelector("#dropdown-menu");  // dropdown menu
    const options = Array.from(dropdownMenu.querySelectorAll(".option"));   // options du menu

    /********************************************************************
     * @description - Gestion de la navigation dans les options avec les flèches vers le haut ou vers le bas, enter, espace ou escape
     * @function (handleKeyNavigation)
     * @param {event} - événement ayant déclenché l'appel de la fonction
     */
    function handleKeyNavigation(event) {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            if (event.key === "ArrowDown") {    // appui sur la flèche vers le bas
                // Avance l'index de l'option, avec une boucle si on dépasse la dernière option.
                focusedOptionIndex = (focusedOptionIndex + 1) % options.length;
            } else if (event.key === "ArrowUp") {   // appui sur la flèche vers le haut
                // Recule l'index de l'option, avec une boucle si on dépasse la première option.
                focusedOptionIndex = (focusedOptionIndex - 1 + options.length) % options.length;
            }
            options[focusedOptionIndex].focus();    // Focus sur l'option actuellement sélectionnée
        } else if (event.key === "Enter" || event.key === " ") {    // Sélection de l'option actuelle si Enter ou Espace
            event.preventDefault();
            optionSelected(dropdownButton, dropdownMenu, options[focusedOptionIndex], mediaFiltre, dirPhotographer);    // afficher les médias correspondant à la sélection de l'option
        } else if (event.key === "Escape") {    // Ferme le menu si "Escape" est pressé.
            closeDropdownMenu(dropdownButton, dropdownMenu);    // fermeture du menu
        }
    }

    // *********
    // Listeners
    // *********

    // Ouverture/Fermeture du menu si clic sur le bouton (dropdownButton)
    dropdownButton.addEventListener("click", (event) => {
        event.preventDefault();
        toggleDropdownMenu(dropdownButton, dropdownMenu, options, "click", isMenuOpen); // fermeture/Ouverture du menu
    });

    // Ouverture/Fermeture du menu si Enter ou Espace sur le bouton (dropdownButton)
    dropdownButton.addEventListener("keydown", (event) => {
        if ((event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            toggleDropdownMenu(dropdownButton, dropdownMenu, options, "enter", isMenuOpen); // fermeture/Ouverture du menu
        }
    });

    // Fermeture du menu si clic sur la page en dehors du bouton (dropdownButton) et du menu (dropdownMenu)
    document.addEventListener("click", (event) => {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target) && isMenuOpen) {
            closeDropdownMenu(dropdownButton, dropdownMenu);    // fermeture du menu
        }
    });

    // Fermeture du menu avec la touche "Escape"
    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape" && isMenuOpen) {
            toggleDropdownMenu(dropdownButton, dropdownMenu, options, "escape", isMenuOpen);    // fermeture/Ouverture du menu
        } else if(event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
        }
    });

    // Appuis sur les flèches vers le bas et le haut, Enter et Escape 
    dropdownMenu.addEventListener("keydown", (event) => {
        if (isMenuOpen) {   // Le menu est ouvert
            handleKeyNavigation(event);
        }
    });

    // Listener sur les options
    options.forEach((option) => {
        option.addEventListener("click", () => optionSelected (dropdownButton, dropdownMenu, option, mediaFiltre, dirPhotographer));    // afficher les médias correspondant à la sélection de l'option
        option.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {   // appui sur "Eneter" ou "Espace"
                event.preventDefault();
                optionSelected (dropdownButton, dropdownMenu, option, mediaFiltre, dirPhotographer);    // afficher les médias correspondant à la sélection de l'option
            }
        });
    });
}

/********************************************************************
 * @description - Ouverture du menu dropdown
 * @function (openDropdownMenu)
 * @param {dropdownButton} - élément qui affiche l'option sélectionnée dans le menu
 * @param {dropdownMenu} - menu déroulant qui contient les options de tri
 * @param {options} - options dans le menu
 * @return {type} - déclencheur de l'ouverture du menu (enter ou autre)
 */
export function openDropdownMenu(dropdownButton, dropdownMenu, options, type) {
    dropdownMenu.style.display = 'block'; // afficher le menu
    dropdownButton.setAttribute('aria-expanded', 'true');
    isMenuOpen = true;  // menu ouvert
    focusedOptionIndex = 0; // index de la 1ère option
    dropdownButton.blur();  // suppression du focus du bouton
    type === "enter" && options[focusedOptionIndex].focus();    // mise du focus sur la 1ère option 
    focusTrapMenu() // gérer le Focus trap sur le menu
}

/********************************************************************
 * @description - affichage des médias après la sélection de l'option
 * @function (optionSelected)
 * @param {option} - option choisie 
 * @param {dropdownButton} - élément qui affiche l'option sélectionnée dans le menu
 * @param {dropdownMenu} - menu déroulant qui contient les options de tri 
 */
export function optionSelected (dropdownButton, dropdownMenu, option, mediaFiltre, dirPhotographer) {
    // Mise à jour de dropdownButton avec le texte de l'option sélectionnée
    dropdownButton.innerHTML = `${option.textContent}<span class="arrow"><i class="fa-solid fa-chevron-down"></i></span>`;
    switch (option.textContent) {   // Tri de mediaFiltre selon l'option sélectionnée
        case "Popularité ":
            mediaFiltre.sort((a, b) => Number(a.likes) - Number(b.likes));  // Tri en ordre croissant de popularité
            break;
        case "Date":
            mediaFiltre.sort((a, b) => new Date(a.date) - new Date(b.date));    // Tri en ordre croissant de date
            break;
        case "Titre":
            mediaFiltre.sort((a, b) => {    // Tri en ordre alphabétique de titre
                if(a.title < b.title) return -1;
                if(a.title > b.title) return 1;
                return 0;
            });
            break;
        default:
            break;
    }
    closeDropdownMenu(dropdownButton, dropdownMenu);    // fermeture du menu
    displayData (mediaFiltre, ".medias_section", dirPhotographer);  // affichage des medias des photographes après le tri
    listenersMedias (".medias_section");    // ajout des listeners sur les médias affichés
    listenerLike ();    // ajout des listeners sur les likes des médias affichés
}

/********************************************************************
 * Appel de l'ouverture/Fermeture du menu dropdown en fonction du contenu de "isMenuOpen"
 * 
 * @description - Appel de l'ouverture/Fermeture du menu dropdown en fonction du contenu de "isMenuOpen"
 * @function (toggleDropdownMenu)
 * @param {dropdownButton} - bouton déclenchant l'ouverture du menu
 * @param {dropdownMenu} - élément représentant le menu
 * @param {options} - liste des options du menu 
 * @param {type} - événement ayant déclanché l'appel (clic ou enter)
 * @param {isMenuOpen} - menu ouvert ou fermé
 */
export function toggleDropdownMenu(dropdownButton, dropdownMenu, options, type, isMenuOpen) {
    if (isMenuOpen) {
        closeDropdownMenu(dropdownButton, dropdownMenu);    // fermeture du menu
    } else {
        openDropdownMenu(dropdownButton, dropdownMenu, options, type);  // ouverture du menu dropdown
    }
}
