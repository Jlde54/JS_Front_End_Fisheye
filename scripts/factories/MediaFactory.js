/**
 * Fonction MediaFactory pour la création dynamique des éléments HTML <video> ou <img>
 * @param {type} - type de média à créer ("video" ou "img")
 * @param {picture} - chemin du fichier de l'image ou la vidéo
 * @param {className} - classe CSS de l'élément
 * @param {alt} - texte alternatif pour l'élément <img> (non utilisé pour <video>).
 * @returns {element} - élément HTML créé (<video> ou <img>)
 */
function MediaFactory (type, {picture, className, alt}) {
    // Initialisation de la variable pour stocker l'élément HTML créé
    let element;
    // Test sur le type de média à créer
    switch (type) {
        case "video":
            element = document.createElement('video');  // Création de l'élément vidéo
            element.src = picture;   // chemin du fichier vidéo
            element.className = className;   // classe css de l'élément vidéo
            break;
        case 'img':
            element = document.createElement('img');  // Création de l'élément img
            element.src = picture;     // chemin du fichier img
            element.className = className;     // classe css de l'élément img
            element.alt = alt;     // alt texte de l'élément img
            break;
        default:
            throw new Error('Type de média non supporté'); // Gestion des types de médias non supportés
            break;
    }
    return element;     // Retour de l'élément HTML créé
}
