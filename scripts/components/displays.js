// Import(s)
// *********
import { createElement } from "../templates/photographer.js";

/********************************************************************
 * @description - Création des éléments du dropdown menu de la page photographe
 * @function (getPhotographerFolder)
 */
export function displayDropdownMenu(){
    const main = document.querySelector("#main");
    const mediaSection = document.querySelector(".medias_section");
    const divSort = createElement("div", {  // Création de l'élément <div> pour contenir le dropdown menu
        className: "photograph-sort"}, [
            createElement("span", { // Création de l'élément <span> pour le dropdown menu avec le texte "Trier par"
                className: "photographer-sort-span",
                textContent: "Trier par "}, []
            ),
            createElement("div", {  // Création de l'élément <div> pour le menu déroulant personnalisé
                className : "custom-dropdown"}, [
                    createElement("button", {   // Création d'un bouton pour afficher le menu déroulant avec l'option sélectionnée et une icône
                        id: "select-list",
                        className: "btn selected", 
                        innerHTML: `Popularité <span class="arrow"><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></span>`, 
                        "aria-haspopup": "true",
                        "aria-expanded": "false",
                        "aria-controls": "dropdown-menu"}, []
                    ),
                    createElement("div", {  // Création de l'élément <div> pour contenir les options du menu déroulant
                        className : "menu",
                        id: "dropdown-menu",
                        role: "list"}, [    // élément menu
                            createElement("div", {  // Création de l'option pour trier par "Popularité" avec une icône de flèche vers le haut
                                // textContent: "Popularité", 
                                "aria-label": "Option Popularité",
                                innerHTML: `Popularité <span class="arrow"><i class="fa-solid fa-chevron-up" aria-hidden="true"></i></span>`, 
                                className: "option",
                                role: "listitem",
                                tabindex : "0"}, []
                            ),
                            createElement("div", {  // Création de l'option pour trier par "Date"
                                textContent: "Date", 
                                "aria-label": "Option Date",
                                // innerHTML: "Date", 
                                className: "option",
                                role: "listitem",
                                tabindex : "0"}, []
                            ),
                            createElement("div", {  // Création de l'option pour trier par "Titre"
                                textContent: "Titre", 
                                "aria-label": "Option Titre",
                                // innerHTML: "Titre",  
                                className: "option",
                                role: "listitem",
                                tabindex : "0"}, []
                            )
                        ]
                    )
                ]
            )
        ]
    );

    // Ajout de l'élément "divSort" à son parent "main" avant l'élément "mediaSection"
    main.insertBefore(divSort, mediaSection);
}

/********************************************************************
 * @description - Création des éléments du header de la page photographe + Ajout des éléments à leur parent dans le DOM
 * @function (displayPhotographerHeader)
 * @param {name} - nom du photographe
 * @param {city} - ville du photographe
 * @param {country} - pays du photographe 
 * @param {tagline} - slogan du photographe
 * @param {picture} - chemin complet vers le portrait du photographe
 */
export function displayPhotographerHeader (name, city, 
    country, tagline, picture) {

    // Création des éléments du header de la page photographe
    const photographHeader = document.querySelector(".photograph-header");

    // Création de l'élément <div> : nom, localisation et slogan du photographe
    const divPhotographerProfile = 
        createElement("div", {
            className: "photograph-header-profile",
            "aria-labelledby": "photographer-name"}, [
                createElement( "h1", {
                    textContent: name, 
                    id: "photographer-name"}, []),
                createElement( "h2", {
                    textContent: `${city}, ${country}`}, []),
                createElement( "h3", {
                    textContent: tagline}, [])
        ]);

    // Création de l'élément <img> : Portrait du photographe
    const imgPicture = 
        createElement("figure", {}, [
            createElement( "img", {
                src: picture, 
                className: "photograph-header-imgprofile", 
                alt: `Portrait du photographe ${name} basé à ${city}, ${country}`}, []
            )
        ]);

    // Ajout des éléments à leur parent dans le DOM
    photographHeader.insertBefore(divPhotographerProfile, photographHeader.firstChild);
    photographHeader.appendChild(imgPicture);
}

/********************************************************************
 * @description - Affichage de l'encart contenant le nombre total de likes et le tarif du photographe
 * @function (displayTarif)
 * @param {price} - tarif journalier
 * @param {sumLikes} - nombre total de "likes"
 */
export function displayTarif (price, sumLikes) {
    const main = document.querySelector("#main");
    const divTarifLikes =
        createElement("div", {  // Création d'un élément <div> pour contenir le tarif et les likes
            className: "photograph-likes-tarif"}, [
                createElement("div", {  // Création d'un élément <div> pour afficher le nombre de "likes"
                    className: "photograph-likes", 
                    "aria-label": `${sumLikes} likes`,
                    innerHTML: `${sumLikes} <span class="arrow"><i class="fa-solid fa-heart"></i></span>`}, []
                ), 
                createElement("div", {  // Création d'un élément <div> pour afficher le tarif journalier
                    className: "photograph-tarif", 
                    textContent: `${price}€/jour`,
                    "aria-label": `${price} euros par jour`}, []
                )
            ]
        );
    // Ajout du conteneur des likes et du tarif à l'élément principal de la page
    main.appendChild(divTarifLikes);
}