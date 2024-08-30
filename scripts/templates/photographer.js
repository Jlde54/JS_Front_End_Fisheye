/********************************************************************
 * Fonction "createElement" pour créer un élément HTML avec les attributs et les enfants spécifiés.
 *
 * @param {tag} - Le nom de la balise de l'élément HTML à créer.
 * @param {[attributes={}]} - Un objet contenant les attributs à ajouter à l'élément.
 * @param {[children=[]]} - Un tableau contenant les enfants à ajouter à l'élément. Les enfants peuvent être des chaînes de caractères ou des instances de Node.
 * @returns {Element} - L'élément HTML créé.
 */
export function createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    Object.keys(attributes).forEach(item => {   // Parcourt des clés de l'objet attributes
        // Vérifie si l'attribut commence par "data-" ou "aria-" ou bien est "role" ou "tabindex"
        if (item.startsWith("data-") || item.startsWith("aria-") || item === "role" || item === "tabindex") {
            element.setAttribute(item, attributes[item])
        } else {
            element[item] = attributes[item];
        }
    });
    // Parcourt le tableau des enfants
    children.forEach(child => {
        // Vérifie si l'enfant est une chaîne de caractères
        if (typeof child === "string") {
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            element.appendChild(child);
        }
    });
    // Retour de l'élément HTML créé
    return element;
}

/********************************************************************
 * Fonction "displayData" asynchrone pour l'affichage des données des photographes ou des médias des photographes, selon les paramètres de la fonction.
 * 
 * @param {data} - les données à afficher
 * @param {section} - le sélecteur CSS de la section où les données doivent être affichées
 * @param {dirPhotographer} - le répertoire des photographes, utilisé pour créer le modèle de données
 */
export async function displayData (data, section, dirPhotographer) {
    const sectionData = document.querySelector(section);
    sectionData.replaceChildren();  // Supprime tous les enfants de l'élément 'section' en paramètre

    data.forEach((item) => {    // Parcourt chaque élément des données (data)
        const dataModel = dataTemplate (item, section, dirPhotographer);    // Appel de la fonction pour créer un modèle de données pour chaque item
        const userCardDOM = dataModel.getUserCardDOM ();    // Appel de la fonction pour obtenir l'élément DOM représentant la carte utilisateur à partir du modèle de données
        sectionData.appendChild(userCardDOM);   // Ajout de la carte utilisateur à la section du DOM spécifiée dans les paramètres
    });
}

/********************************************************************
 * Fonction "dataTemplate" pour créer un modèle de données basé sur les informations fournies 
 * Affichage des données des photographes (description ou medias)
 * 
 * @param {data} - objet contenant les propriétés à utiliser
 * @param {section} - section devant contenir les articles crées 
 * @param {dirPhotographer} - répertoire des medias du photographe
 * @returns {article} - élément représentant la carte du photographe
 */
function dataTemplate (data, section, dirPhotographer) {
    // Déstructuration de l'objet 'data' pour extraire les propriétés nécessaires
    const { name, id, city, country, tagline, price, portrait, title, image, video, likes } = data
    let picture = "";   // Initialisation de 'picture', utilisée pour stocker le chemin de l'image

    /********************************************************************
     * Fonction "getUserCardDOM" pour créer et retourner les éléments du DOM représentant les articles soit pour la page d'accueil des photographes, soit pour la page des médias d'un photographe. 
     *  
     * @returns {} - carte média (image ou vidéo)
     */
    function getUserCardDOM() {
        if (section === ".photographer_section") {  // Si la section cible est la page d'accueil des photographes
            return createPhotographerCard();    // création d'une carte de photographe
        } else {    // sinon la section cible est la page contenant les médias d'un photographe
            return createMediaCard();
        }
    }

    /********************************************************************
     * Fonction pour créer une carte de photographe
     * 
     * @returns {article} - élément <article> représentant la carte média
     */
    function createPhotographerCard() {
        const picture = `assets/photographers/${portrait}`; // Définition du chemin de l'image du photographe
        const article = createElement("article", { id: `art${id}` }, [  // création de la carte du photographe
            createPhotographerLink(picture),    // création du lien vers la page du photographe
            createElement("h3", {}, [`${city}, ${country}`]),   // création de l'élément <h3> : localisation
            createElement("h4", {}, [tagline]), // création de l'élément <h4> : slogan
            createElement("p", {}, [`${price}€/jour`])  // création de l'élément <p> : tarif
        ]);
        return article;
    }

    /********************************************************************
     * Fonction pour créer le lien vers la page du photographe
     * 
     * @param {picture} - chemin de l'image du photographe
     * @returns {} - lien vers la page du photographe
     */
    function createPhotographerLink(picture) {
        return createElement("a", {     // création du lien vers les médias du photographe
            arialabel: `Lien vers la page du photographe ${name}`,
            href: `./photographer.html?id=${id}&name=${name}&city=${city}&country=${country}&tagline=${tagline}&picture=assets/photographers/${portrait}&price=${price}`,
            "data-id": id
        }, [
            createElement("img", {
                src: picture,
                alt: `Portrait du photographe ${name}`
            }, []),
            createElement("h2", {}, [name])
        ]);
    }

    /********************************************************************
     * Fonction pour créer une carte média (image ou vidéo)
     * 
     * @returns - élément <article> représentant le média
     */
    function createMediaCard() {
        const mediaData = prepareMediaData();   // préparation des données du média
        const imgMedia = createMediaElement(mediaData); // création de l'élément média (image ou vidéo)
        const article = createElement("article", {}, [
            createMediaLink(imgMedia, mediaData),   // création du lien vers le média en grand format
            createMediaDescription(mediaData)   // création de la description du média (titre et likes)
        ]);
        ensureAriaHiddenIsRemoved(article); // s'assurer que l'attribut aria-hidden est supprimé
        return article;
    }

    /********************************************************************
     * Fonction pour préparer les données du média
     * 
     * @returns - données du média
     */
    function prepareMediaData() {
        return {
            image: image,   // le nom du fichier .jpg du média si c'est une image
            video: video,   // le nom du fichier .mp4 du média si c'est une vidéo
            dirPhotographer: dirPhotographer,   // le chemin vers le répertoire des medias du photographe
            title: title    // le titre du média
        };
    }

    /********************************************************************
     * Fonction pour créer l'élément média (image ou vidéo)
     * 
     * @param {mediaData} - données du média
     * @returns - élément media <img> ou <video>
     */
    function createMediaElement(mediaData) {
        if (mediaData.image !== undefined) {
            return MediaFactory("img", {    // création du media <img>
                picture: `./assets/photographers/${mediaData.dirPhotographer}/${mediaData.image}`,  // chemin d'accès au fichier image
                className: "medias_section_img",
                alt: ""
            });
        } else {
            return MediaFactory("video", {  // création du media <video>
                picture: `./assets/photographers/${mediaData.dirPhotographer}/${mediaData.video}`,  // chemin d'accès au fichier video
                className: "medias_section_video",
                alt: `Vidéo ${mediaData.title}` // alt sera utilisé comme textContent dans <video>
            });
        }
    }

    /********************************************************************
     * Fonction pour créer le lien vers le média en grand format dans la lightbox
     * 
     * @param {imgMedia} - élement media (<img> ou <video>)
     * @param {mediaData} - données du média
     * @returns - élément lien vers le média en grand format dans la lightbox
     */
    function createMediaLink(imgMedia, mediaData) {
        return createElement("a", {     // lien vers le média en grand format dans la lightbox
            "aria-label": `Lien vers le media ${mediaData.title} grand format`,
            href: "#",
            className: "medias_section_link",
            "data-id": `med${id}`,
            id: `med${id}`
        }, [imgMedia]);
    }

    /********************************************************************
     * Fonction pour créer la description du média (titre et likes)
     * 
     * @param {mediaData} - données du média
     * @returns - élément description du média (titre et likes)
     */
    function createMediaDescription(mediaData) {
        return createElement("div", { className: "medias_section_descMedia" }, [    // Description du média
            createElement("h3", { className: "medias_section_title" }, [`${mediaData.title}`]), // Titre du média
            createElement("div", { className: "medias_section_descLikes" }, [   // Description des likes
                createElement("p", { className: "medias_section_likes", "aria-label": `${likes} likes` }, [`${likes}`]),    // Nombre de likes
                createElement("p", { className: "medias_section_icon" }, [  // icon like
                    createElement("i", { className: "fas fa-heart", tabindex: "0" }, [])
                ])
            ])
        ]);
    }

    /********************************************************************
     * Fonction pour s'assurer que l'attribut aria-hidden est supprimé
     * 
     * @param {article}  élément <article> représentant le média
     */
    function ensureAriaHiddenIsRemoved(article) {
        // Forcer la suppression de l'attribut "aria-hidden" en continu
        setInterval(() => {
            article.querySelector("i").removeAttribute("aria-hidden");
        }, 1000);
    }

    // Retour des nom du photographe, chemin de l'image et méthode pour obtenir l'élément DOM représentant la carte utilisateur
    return { name, picture, getUserCardDOM }
}