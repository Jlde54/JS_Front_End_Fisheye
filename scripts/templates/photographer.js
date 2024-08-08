/**
 * Fonction pour créer un modèle de données basé sur les informations fournies 
 * Affichage des données des photographes (description ou medias)
 * 
 * @param {data} - objet contenant les propriétés à utiliser
 * @param {section} - section devant contenir les articles crées 
 * @param {dirPhotographer} - chemin vers le répertoire des medias du photographe
 * @returns {article} - élément représentant la carte du photographe
 */
function dataTemplate (data, section, dirPhotographer) {
    // Déstructuration de l'objet 'data' pour extraire les propriétés nécessaires
    const { name, id, city, country, tagline, price, portrait, photographerId, title, image, video, likes, date } = data;

    // Initialisation de la variable 'picture' vide, utilisée pour stocker le chemin de l'image
    let picture = "";
    
    /**
     * Fonction pour créer et retourner les éléments DOM représentant les articles soit pour la page d'accueil des photographes, soit pour la page des médias d'un photographe.
     * 
     * @returns {name, picture, getUserCardDOM} - l'objet contenant le nom du photographe, le chemin de l'image et la méthode pour obtenir l'élément DOM représentant la carte utilisateur 
     */
    function getUserCardDOM () {
        // Vérifie si la section cible est '.photographer_section' (page d'accueil des photographes)
        if (section === ".photographer_section") {
            // Définition du chemin de l'image du photographe
            picture =`assets/photographers/${portrait}`;

            // Appel de la fonction createElement() pour la création de l'élément <a> : Lien vers les medias du photographe
            const linkPortrait = createElement('a', {
                'aria-label': `Lien vers la page du photographe ${name}`,
                href: `./photographer.html?id=${id}&name=${name}&city=${city}&country=${country}&tagline=${tagline}&picture=assets/photographers/${portrait}&price=${price}`,
                'data-id': id
            }, [
                // Appel de la fonction createElement() pour la création de l'élément <img> : Portrait du photographe
                createElement('img', { src: `assets/photographers/${portrait}`, alt: `Portrait du photographe ${name}` }),
                // Appel de la fonction createElement() pour la création de l'élément <h2> : Nom du photographe
                createElement('h2', {}, [name])
            ]);

            // Appel de la fonction createElement() pour la création de l'élément <article> : Carte du photographe
            const article = createElement('article', { id: `art${id}` }, [
                linkPortrait, 
                // Appel de la fonction createElement() pour la création de l'élément <h3> : Localisation du photographe
                createElement('h3', {}, [`${city}, ${country}`]),
                // Appel de la fonction createElement() pour la création de l'élément <h4> : Slogan du photographe
                createElement('h4', {}, [tagline]),
                // Appel de la fonction createElement() pour la création de l'élément <p> : Tarif du photographe
                createElement('p', {}, [`${price}€/jour`])
            ]);

            // Retour de l'élément <article> représentant la carte du photographe
            return (article);

        // sinon la section cible n'est pas '.photographer_section' (c'est donc la page contenant les médias d'un photographe)
        } else {
            // Préparation des données du média
            const mediaData = {
                image: image,   // le nom du fichier .jpg du média si c'est une image
                video: video,   // le nom du fichier .mp4 du média si c'est une vidéo
                dirPhotographer: dirPhotographer,   // le chemin vers le répertoire des medias du photographe
                title: title    // le titre du média
            };

            // Appel de la fonction factory "mediaElementFactory" pour la création de l'élément média approprié (image ou vidéo)
            const imgMedia = mediaElementFactory (mediaData);

            // Appel de la fonction createElement() pour la création de l'élément <article> pour le média
            const article = createElement('article', {}, [
                // Appel de la fonction createElement() pour la création de l'élément <a> : Lien vers le media grand format
                createElement('a', {
                    arialabel: `Lien vers le media ${title} grand format`,
                    href: "#",
                    'data-id': `med${id}`,
                    id: `med${id}`
                }, [
                    // Appel de la fonction createElement() pour la création de l'élément <img> ou <video> en fonction du contenu de imgMedia
                    createElement(imgMedia.tag, {
                        src: imgMedia.src,
                        className: imgMedia.className
                    })
                ]),
                // Appel de la fonction createElement() pour la création de l'élément <div> : Description du média
                createElement('div', { className: "medias_section_descMedia" }, [
                    // Appel de la fonction createElement() pour la création de l'élément <h3> : Titre du média
                    createElement('h3', { className: "medias_section_title" }, [`${title}`]),
                    // Appel de la fonction createElement() pour la création de l'élément <div> : Description des likes
                    createElement('div', { className: "medias_section_descLikes" }, [
                        // Appel de la fonction createElement() pour la création de l'élément <p> : Nombre de likes
                        createElement('p', { className: "medias_section_likes" }, [`${likes}`]),
                        // Appel de la fonction createElement() pour la création de l'élément <p> : icon like
                        createElement('p', { className: "medias_section_icon" }, [
                            createElement('i', { className: "fa-solid fa-heart", 'aria-hidden': "true" })
                        ])
                    ])
                ])
            ]);

            // Retourne l'élément <article> représentant le média
            return (article);
        }
    }
    // Retour d'un objet contenant le nom du photographe, le chemin de l'image et la méthode pour obtenir l'élément DOM représentant la carte utilisateur
    return { name, picture, getUserCardDOM }
}

 /**
  * Fonction pour créer et retourner un élément média (image ou vidéo)
  * 
  * @param {image} - le nom du fichier .jpg du média si c'est une image
  * @param {video} - le nom du fichier .mp4 du média si c'est une vidéo
  * @param {dirPhotographer} - le chemin vers le répertoire des medias du photographe
  * @param {title} - le titre du média
  * @returns {imgMedia} - l'élément média créé (image ou vidéo)
  */
function mediaElementFactory ({ image, video, dirPhotographer, title }) {
    // Initialisation des variables pour stocker le chemin du média et l'élément DOM du média
    let picture, tag, src, alt, className;

    // Test Si le média est une image
    if (image !== undefined) {
        // Définition du chemin de l'image
        picture = `./assets/photographers/${dirPhotographer}/${image}`;
        // Création de l'élément <img> : image du média avec ses attributs
        tag = 'img';
        // Définition du chemin du média
        src = picture;
        // Définition de l'attribut alt pour l'accessibilité
        alt = `Media ${title}`;
        // Ajout de la classe CSS "medias_section_img" à l'image
        className = "medias_section_img";

        // sinon c'est une vidéo
    } else if (video !== undefined) {
        // Définition du chemin de la vidéo
        picture = `./assets/photographers/${dirPhotographer}/${video}`;
        // Création de l'élément <video> : video du média avec ses attributs
        tag = 'video';
        // Définition du chemin du média
        src = picture;
        // Ajout de la classe CSS "medias_section_img" à la vidéo
        className = "medias_section_img";
        // Si aucune source de média n'est fournie, lancer une erreur
    } else {
        throw new Error("No media source provided");
    }
    // Retourner l'élément média créé (image ou vidéo)
    const imgMedia = {
        tag: tag,
        src: src,
        alt: alt,
        className: className
    };
    return imgMedia;
}

/**
 * Fonction pour créer un élément HTML avec les attributs et les enfants spécifiés.
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
        if (item.startsWith('data-')) {
            // Si oui, utilisation de setAttribute pour les attributs 'data-'
            element.setAttribute(item, attributes[item]);
        } else {
            // Sinon, assignation directe de l'attribut à l'élément
            element[item] = attributes[item];
        }
    });
    // Parcourt le tableau des enfants
    children.forEach(child => {
        // Vérifie si l'enfant est une chaîne de caractères
        if (typeof child === 'string') {
            // Si oui, Création d'un nœud de texte et ajout à l'élément
            element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            // Sinon et si l'enfant est une instance de Node, ajout direct à l'élément
            element.appendChild(child);
        }
    });
    // Retour de l'élément HTML créé
    return element;
}

/**
 * Fonction asynchrone pour l'affichage des données des photographes ou des médias des photographes, selon les paramètres de la fonction.
 * 
 * @param {*} data - les données à afficher
 * @param {*} section - le sélecteur CSS de la section où les données doivent être affichées
 * @param {*} dirPhotographer - le répertoire des photographes, utilisé pour créer le modèle de données
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


/**
 * Fonction asynchrone de récupération des données des photographes ou des médias des photographes depuis le fichier JSON
 * 
 * @returns {data} - l'objet JavaScript contenant les données des photographes 
 */
async function getData () {
    // Requête HTTP pour récupérer le fichier JSON contenant les données des photographes (avec attente que l'opération soit terminée)
    const reponse = await fetch("./data/photographers.json");

     // Conversion de la réponse HTTP en objet JavaScript (avec attente que l'opération soit terminée) dans la constante "data"
    const data = await reponse.json();

    // Retour de l'objet JavaScript "data" contenant les données des photographes.
    return data;
}
