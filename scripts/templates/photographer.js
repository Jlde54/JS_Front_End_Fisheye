/********************************************************************
 * Fonction "createElement" pour créer un élément HTML avec les attributs et les enfants spécifiés.
 *
 * @param {tag} - Le nom de la balise de l'élément HTML à créer.
 * @param {[attributes={}]} - Un objet contenant les attributs à ajouter à l'élément.
 * @param {[children=[]]} - Un tableau contenant les enfants à ajouter à l'élément. Les enfants peuvent être des chaînes de caractères ou des instances de Node.
 * @returns {Element} - L'élément HTML créé.
 */
function createElement(tag, attributes = {}, children = []) {
    // Création d'un élément HTML avec la balise spécifiée en paramètre
    const element = document.createElement(tag);
    // Parcourt des clés de l'objet attributes
    Object.keys(attributes).forEach(item => {
        // Vérifie si l'attribut commence par 'data-'
        item.startsWith("data-") || item.startsWith("aria-") || item === "role" || item === "tabindex"
            ? element.setAttribute(item, attributes[item]) 
            : element[item] = attributes[item];
    });
    // Parcourt le tableau des enfants
    children.forEach(child => {
        // Vérifie si l'enfant est une chaîne de caractères
        typeof child === "string" 
            ? element.appendChild(document.createTextNode(child)) 
            : child instanceof Node 
                ? element.appendChild(child) 
                : null;
    });
    // Retour de l'élément HTML créé
    return element;
}
/********************************************************************
 * Fonction "dataTemplate" pour créer un modèle de données basé sur les informations fournies 
 * Affichage des données des photographes (description ou medias)
 * 
 * @param {data} - objet contenant les propriétés à utiliser
 * @param {section} - section devant contenir les articles crées 
 * @param {dirPhotographer} - le répertoire des medias du photographe
 * @returns {article} - élément représentant la carte du photographe
 */
function dataTemplate (data, section, dirPhotographer) {
    // Déstructuration de l'objet 'data' pour extraire les propriétés nécessaires
    const { name, id, city, country, tagline, price, portrait, photographerId, title, image, video, likes, date } = data;

    // Initialisation de la variable 'picture' vide, utilisée pour stocker le chemin de l'image
    let picture = "";
    
    /********************************************************************
     * Fonction "getUserCardDOM" pour créer et retourner les éléments du DOM représentant les articles soit pour la page d'accueil des photographes, soit pour la page des médias d'un photographe.
     * 
     * @returns {name, picture, getUserCardDOM} - l'objet contenant le nom du photographe, le chemin de l'image et la méthode pour obtenir l'élément DOM représentant la carte utilisateur 
     */
    function getUserCardDOM () {
        // Vérifie si la section cible est '.photographer_section' (page d'accueil des photographes)
        if (section === ".photographer_section") {
            // Définition du chemin de l'image du photographe
            picture =`assets/photographers/${portrait}`;

            // Appel de la fonction createElement() pour la création de l'élément <article> : Carte du photographe
            const article = 
            createElement("article", {
                id: `art${id}` }, [
                    // Appel de la fonction createElement() pour la création de l'élément <a> : lien vers les médias du photographe
                    createElement("a", {
                        arialabel: `Lien vers la page du photographe ${name}`,
                        href: `./photographer.html?id=${id}&name=${name}&city=${city}&country=${country}&tagline=${tagline}&picture=assets/photographers/${portrait}&price=${price}`,
                        "data-id": id}, [
                            createElement("img", {
                                src: `assets/photographers/${portrait}`, 
                                alt: `Portrait du photographe ${name}` }, []
                            ),
                            createElement("h2", {}, [name])
                        ]
                    ),
                    // Appel de la fonction createElement() pour la création de l'élément <h3> : Localisation du photographe
                    createElement("h3", {}, [`${city}, ${country}`]),
                    // Appel de la fonction createElement() pour la création de l'élément <h4> : Slogan du photographe
                    createElement("h4", {}, [tagline]),
                    // Appel de la fonction createElement() pour la création de l'élément <p> : Tarif du photographe
                    createElement("p", {}, [`${price}€/jour`])
                ]
            );

            // Retour de l'élément <article> représentant la carte du photographe
            return (article);

        // sinon la section cible n'est pas '.photographer_section' (c'est donc la page contenant les médias d'un photographe)
        } else {
            let picture, tag, src, alt, className, imgMedia;
            // Préparation des données du média
            const mediaData = {
                image: image,   // le nom du fichier .jpg du média si c'est une image
                video: video,   // le nom du fichier .mp4 du média si c'est une vidéo
                dirPhotographer: dirPhotographer,   // le chemin vers le répertoire des medias du photographe
                title: title    // le titre du média
            };

            // Création de l'élement media (<img> ou <video>)
            if (image !== undefined) {
                picture = `./assets/photographers/${dirPhotographer}/${image}`; // chemin d'accès au fichier image
                className = "medias_section_img";   // classe CSS de l'image
                alt = "";    // alt texte vide
                tag = "img";    // balise de l'image

                // Appel de la création du media <img>
                imgMedia = MediaFactory("img", {picture, className, alt});
            } else {
                picture = `./assets/photographers/${dirPhotographer}/${video}`; // chemin d'accès au fichier video
                className = "medias_section_video";     // classe CSS de la vidéo
                alt = `Vidéo ${title}`;       // alt sera utilisé comme textContent dans <video>
                tag = "video";      // balise de la vidéo

                // Appel de la création du media <video>
                imgMedia = MediaFactory("video", {picture, className, alt});
            }

            // Construction de(s) élément(s) enfant(s) pour l'élément <article>
            const children = [imgMedia];

            // Appel de la fonction createElement() pour la création de l'élément <article> pour le média
            const article = createElement("article", {}, [
                // Appel de la fonction createElement() pour la création de l'élément <a> : Lien vers le media grand format
                createElement("a", {
                    "aria-label": `Lien vers le media ${title} grand format`,
                    href: "#",
                    className: "medias_section_link",
                    "data-id": `med${id}`,
                    id: `med${id}`}, children   // Ajout de la liste des enfants de l'élément <a>
                ), 
          
                // Appel de la fonction createElement() pour la création de l'élément <div> : Description du média
                createElement("div", { 
                    className: "medias_section_descMedia" }, [
                        // Appel de la fonction createElement() pour la création de l'élément <h3> : Titre du média
                        createElement("h3", { 
                            className: "medias_section_title" }, [`${title}`]),
                        // Appel de la fonction createElement() pour la création de l'élément <div> : Description des likes
                        createElement("div", { 
                            className: "medias_section_descLikes" }, [
                                // Appel de la fonction createElement() pour la création de l'élément <p> : Nombre de likes
                                createElement("p", { 
                                    className: "medias_section_likes",
                                    "aria-label": `${likes} likes` }, [`${likes}`]
                                ),
                                // Appel de la fonction createElement() pour la création de l'élément <p> : icon like
                                createElement("p", {
                                    className: "medias_section_icon" }, [
                                        createElement("i", { 
                                            className: "fas fa-heart",
                                            tabindex: "0"}, []
                                        )
                                    ]
                                )
                            ]
                        )
                    ]
                )
            ]);
            // Forcer la suppression de l'attribut "aria-hidden" en continu
            setInterval(() => {
                article.querySelector("i").removeAttribute("aria-hidden");
            }, 1000);
            
            // Retour de l'élément <article> représentant le média
            return (article);
        }
    }
    // Retour d'un objet contenant le nom du photographe, le chemin de l'image et la méthode pour obtenir l'élément DOM représentant la carte utilisateur
    return { name, picture, getUserCardDOM }
}

/********************************************************************
 * Fonction "displayData" asynchrone pour l'affichage des données des photographes ou des médias des photographes, selon les paramètres de la fonction.
 * 
 * @param {data} - les données à afficher
 * @param {section} - le sélecteur CSS de la section où les données doivent être affichées
 * @param {dirPhotographer} - le répertoire des photographes, utilisé pour créer le modèle de données
 */
async function displayData (data, section, dirPhotographer) {
    // Sélection de l'élément du DOM correspondant au sélecteur 'section' en paramètre
    const sectionData = document.querySelector(section);

    // Supprime tous les enfants de l'élément 'section' en paramètre
    sectionData.replaceChildren();

    // Parcourt chaque élément des données (data)
    data.forEach((item) => {
        // Appel de la fonction dataTemplate avec les arguments appropriés pour créer un modèle de données pour chaque item
        const dataModel = dataTemplate (item, section, dirPhotographer);

        // Appel de la fonction getUserCardDOM pour obtenir l'élément DOM représentant la carte utilisateur à partir du modèle de données
        const userCardDOM = dataModel.getUserCardDOM ();

        // Ajout de la carte utilisateur à la section du DOM spécifiée dans les paramètres de la fonction displayData
        sectionData.appendChild(userCardDOM);
    });
}
