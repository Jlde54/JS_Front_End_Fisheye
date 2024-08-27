/********************************************************************
 * Fonction "displayPhotographerHeader" pour la création des éléments du header de la page photographe +
 * Ajout des éléments à leur parent dans le DOM
 * 
 * @param {name} - nom du photographe
 * @param {city} - ville du photographe
 * @param {country} - pays du photographe 
 * @param {tagline} - slogan du photographe
 * @param {picture} - chemin complet vers le portrait du photographe
 */
export function displayPhotographerHeader (name, city, country, tagline, picture) {

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
 * Fonction "displayDropdownMenu" pour la création des éléments du dropdown menu de la page photographe
 */
export function displayDropdownMenu(){
    // Sélection de l'élément principal de la page via son ID "#main"
    const main = document.querySelector("#main");
    // Sélection de la section des médias via sa classe ".medias_section"
    const mediaSection = document.querySelector(".medias_section");
    // Création de l'élément <div> pour contenir le dropdown menu
    const divSort = createElement("div", {
        className: "photograph-sort"}, [
            // Création de l'élément <label> pour le dropdown menu avec le texte "Trier par"
            createElement("span", {
                className: "photographer-sort-span",
                textContent: "Trier par "}, []
            ),
            // Création de l'élément <div> pour le menu déroulant personnalisé
            createElement("div", {
                className : "custom-dropdown"}, [
                    // Création d'un bouton pour afficher le menu déroulant avec l'option sélectionnée et une icône
                    createElement("button", {
                        id: "select-list",
                        className: "btn selected", 
                        innerHTML: `Popularité <span class="arrow"><i class="fa-solid fa-chevron-down" aria-hidden="true"></i></span>`, 
                        "aria-haspopup": "true",
                        "aria-expanded": "false",
                        "aria-controls": "dropdown-menu"}, []
                    ),
                    // Création de l'élément <div> pour contenir les options du menu déroulant
                    createElement("div", {
                        className : "menu",
                        id: "dropdown-menu",
                        role: "menu"}, [    // élément menu
                            // Création d'une option pour trier par "Popularité" avec une icône de flèche vers le haut
                            createElement("div", {
                                value: "Popularité", 
                                innerHTML: `Popularité <span class="arrow"><i class="fa-solid fa-chevron-up" aria-hidden="true"></i></span>`, 
                                className: "option",
                                role: "menuitem",
                                tabindex : "0"}, []
                            ),
                            // Création d'une option pour trier par "Date"
                            createElement("div", {
                                value: "Date", 
                                innerHTML: "Date", 
                                className: "option",
                                role: "menuitem",
                                tabindex : "0"}, []
                            ),
                            // Création d'une option pour trier par "Titre"
                            createElement("div", {
                                value: "Titre", 
                                innerHTML: "Titre", 
                                className: "option",
                                role: "menuitem",
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
 * Fonction "displayTarif" pour l'affichage de l'encart contenant le nombre total de likes et le tarif du photographe
 * 
 * @param {price} - tarif journalier
 * @param {sumLikes} - nombre total de "likes"
 */
export function displayTarif (price, sumLikes) {
    // Sélection de l'élément principal de la page via son ID "#main"
    const main = document.querySelector("#main");
    // Création d'un élément <div> pour contenir le tarif et les likes
    const divTarifLikes = 
        createElement("div", {
            className: "photograph-likes-tarif"}, [ 
            // Création d'un élément <div> pour afficher le nombre de "likes"
            createElement("div", {
                className: "photograph-likes", 
                "aria-label": `${sumLikes} likes`,
                innerHTML: `${sumLikes} <span class="arrow"><i class="fa-solid fa-heart"></i></span>`}, []), 
                // Création d'un élément <div> pour afficher le tarif journalier
            createElement("div", {
                className: "photograph-tarif", 
                textContent: `${price}€/jour`,
                "aria-label": `${price} euros par jour`}, [])
        ]);
    // Ajout du conteneur des likes et du tarif à l'élément principal de la page
    main.appendChild(divTarifLikes);
}