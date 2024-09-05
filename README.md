
Pour démarrer le projet, il suffit d'ouvrir le fichier `index.html`.

Lien GitHub du projet : https://jlde54.github.io/JS_Front_End_Fisheye/

Organisation des dossiers :
Dossier "assets" contenant les sous-dossiers : 
    - "icons" avec les icônes utilisés dans les modales
    - "images" avec le logo FishEye (logo.png).
    - "photographers" avec les portaits des photographes ainsi que des sous-dossiers contenant les médias (travaux) de chaque photographe.
Dossier "css" contenant les fichiers css "style.css" et "photographers.css".
Dossier "data" contenant" le fichier "photographers.json".
Dossier "scripts" contenant les sous-dossiers Javascript :
    - "components" avec le fichier "displays.js" : fonctions de création des éléments de la page photographes càd : 
        - du dropdown menu, 
        - du header et 
        - de l'encart contenant le nombre total de likes et le tarif
    - "factories" avec le fichier "MediaFactory.js" : fonction factory de création dynamique des éléments HTML <video> ou <img>
    - "listeners" avec les fichiers "listeners.js" et "setupListeners.js" : 
        - setupListeners.js : fonction pour lancer les listeners sur le dropdown menu, sur les médias et sur les likes
        - listener.js : fonctions d'écoute sur les médias et sur les icônes likes
    - "pages" avec les fichiers "index.js" et "photographer.js" :
        - index.js : initialisation de la page d'accueil (récupération des données photographes et affichage de la page index.html)
        - photographer.js : initialisation de la page photographe (récupération des données photographes et affichage de la page photographer.html)
    - "services" avec le fichier "getData.js : requête fetch pour récupérer le fichier JSON contenant les données des photographes
    - "templates" avec le fichier "photographer.js" : fonctions pour la création dynamique des éléments HTML des pages index.html et photographe.html
    - "utils" avec les fichiers "contactForm.js", "dropdownMenu.js", "getURL.js, "mediaLightbox.js" et "photographerUtils.js" :
        - contactForm.js : fonctions de gestion du formulaire de contact (ouverture, fermeture, focus trap, submit et listeners)
        - dropdownMenu.js : fonctions de gestion du dropdown menu (ouverture, fermeture, navigation et choix des options et listeners)
        - getURL.js : récupération des paramètres de l'URL
        - mediaLightbox.js : fonctions de gestion de la lightbox (ouverture, fermeture, focus trap, submit et listeners)
        - photographerUtils.js : fonctions pour créer le nom du dossier du photographe et pour lancer la récupération des paramètres de l'URL
Les fichiers HTML "index.html" et "photographer.html" se trouvent au niveau racine du projet.