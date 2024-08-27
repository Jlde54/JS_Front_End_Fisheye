import { optionSelected, closeDropdownMenu, toggleDropdownMenu, openDropdownMenu, handleMediaListener, handleLikeListener } from "../pages/photographer.js";

let focusedOptionIndex = 0; // index de l'option qui a le focus dans le dropdown menu

/********************************************************************
 * Fonction "listenersDropDownMenu" pour créer les listeners pour ouvrir ou fermer le dropdown menu et pour sélectionner une option
 */
export function listenersDropDownMenu (isMenuOpen) {
    // Sélection du bouton du dropdown menu, du dropdown menu et des options du menu
    const dropdownButton = document.querySelector("#select-list");
    const dropdownMenu = document.querySelector("#dropdown-menu");
    const options = Array.from(dropdownMenu.querySelectorAll(".option"));

    function handleKeyNavigation(event) {
        // Gestion de la navigation dans les options avec les flèches vers le haut ou vers le bas, enter, espace ou escape
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault(); // Empêcher le comportement par défaut
            // Gestion de l'appui sur la flèche vers le bas
            if (event.key === "ArrowDown") {
                // Avance l'index de l'option, avec une boucle si on dépasse la dernière option.
                focusedOptionIndex = (focusedOptionIndex + 1) % options.length;
                // Gestion de l'appui sur la flèche vers le haut
            } else if (event.key === "ArrowUp") {
                // Recule l'index de l'option, avec une boucle si on dépasse la première option.
                focusedOptionIndex = (focusedOptionIndex - 1 + options.length) % options.length;
            }
            // Focus sur l'option actuellement sélectionnée
            options[focusedOptionIndex].focus();
        // Sélection de l'option actuelle si Enter ou Espace
        } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault(); // Empêcher le comportement par défaut
            // Appel de la fonction "optionSelected" pour afficher les médias correspondant à la sélection de l'option
            isMenuOpen = optionSelected(dropdownButton, dropdownMenu, options[focusedOptionIndex]);
        // Ferme le menu si "Escape" est pressé.
        } else if (event.key === "Escape") {
            // Appel de la fermeture du menu
            isMenuOpen = closeDropdownMenu(dropdownButton, dropdownMenu);
        }
    }

    // Ouverture/Fermeture du menu si clic sur le bouton(dropdownButton)
    dropdownButton.addEventListener("click", (event) => {
        event.preventDefault();
        // Appel de la fermeture/Ouverture du menu
        toggleDropdownMenu(dropdownButton, dropdownMenu, options, "click");
    });
    
    // Fermeture du menu si clic sur la page en dehors du bouton (dropdownButton) et du menu (dropdownMenu)
    document.addEventListener("click", (event) => {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            // Appel de la fermeture du menu
            isMenuOpen = closeDropdownMenu(dropdownButton, dropdownMenu);
        }
    });
    // Listener sur les appuis sur les touches (flèches vers le bas et le haut, Enter et Escape) 
    document.addEventListener("keydown", (event) => {
        // Test si le menu est ouvert ou fermé
        if (isMenuOpen) {   // Le menu est ouvert
            handleKeyNavigation(event);
        //Si le menu est fermé et que le bouton du menu a le focus et que Enter ou Espace sont pressés
        } else if (document.activeElement === dropdownButton && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault(); // Empêcher le comportement par défaut
            // Appel 
            isMenuOpen = openDropdownMenu(dropdownButton, dropdownMenu, options, "enter");
        }
    });
    
    // Listeners sur les options
    options.forEach((option) => {
        option.addEventListener("click", () => isMenuOpen =  optionSelected (dropdownButton, dropdownMenu, option));
        option.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                isMenuOpen =  optionSelected (dropdownButton, dropdownMenu, option);
            }
        });
    });
}

/********************************************************************
 * Fonction "listenersMedias" pour la création des listeners pour ouvrir la lightbox
 * 
 * @param {section} - section contenant les médias affichés
 */
export function listenersMedias (section) {
    // Sélection de tous les médias <a> dans la section spécifiée
    const mediaLinks  = document.querySelectorAll(`${section} a`);

    // Gestion des événements clic et clavier (enter ou espacement) sur chaque média
    function handleEvent(event, index) {
        if (event.type === "click" || event.key === " " || event.key === "Enter") {
            event.preventDefault();
            handleMediaListener(event, index);  // construction du chemin complet du média et appel de l'affichage du média cliqué
        }
    }
     // Ajout des listeners (clic et clavier) sur chaque média
     mediaLinks.forEach((item, index) => {
        item.addEventListener("click", (event) => handleEvent(event, index));
        item.addEventListener("keydown", (event) => handleEvent(event, index));
    });
}

/********************************************************************
 * Fonction "listenerLike" pour écouter chaque icône "Like" et mettre à jour le nombre de likes sur le média cliqué, dans le total du photographe et dans "mediaFiltre"
 */
export function listenerLike () {
    // Sélection de tous les éléments avec la classe .fa-heart (icônes likes)
    const likes = document.querySelectorAll(".fa-heart");
    // Ajout d'un listener sur clic, enter ou espacement sur chaque icône
    likes.forEach((like, index) => {
        like.addEventListener("click", (event) => {
            handleLikeListener (event, index)   // mise à jour du nombre de likes sur le média cliqué, dans le total du photographe et dans "mediaFiltre" 
        });
        like.addEventListener("keydown", (event) => {
            if (event.key === " " || event.key === "Enter") {
                event.preventDefault();
                handleLikeListener (event, index)   // mise à jour du nombre de likes sur le média cliqué, dans le total du photographe et dans "mediaFiltre" 
            }
        })
    })
}