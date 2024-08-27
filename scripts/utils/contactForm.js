// Sélection de la modale via son ID "#contact_modal"
const modal = document.querySelector("#contact_modal");
// Sélection de l'overlay via sa classe ".overlay"
const overlay = document.querySelector(".overlay");
// Sélection du bouton d'ouverture de la modale de contact "Contactez-moi"
const contactButton = document.querySelector(".photograph-header-button");
// Sélection du bouton "Envoyer" du formulaire de contact
const btnSubmit = document.querySelector(".btn-submit");

/********************************************************************
 * Fonction "closeModalForm" pour la fermeture de la modale du formulaire de contact.
 * L'appel se fait depuis "photographer.html"
 */
function closeModalForm() {
    // Appel de la fonction "toggleModalForm" pour afficher/cacher la modale et l'overlay et pour mettre l'attribut "aria-hidden" à true /false
    toggleModalForm("none", "true");
    contactButton.focus();  // Retour du focus sur le bouton "Contactez-moi"
}

/********************************************************************
 * Fonction "displayModalForm" pour afficher de la modale du formulaire de contact au clic sur le bouton "Contactez-moi".
 * L'appel se fait depuis "photographer.html"
 */
function displayModalForm() {
    document.formContact.reset();   // Réinitialisation des champs du formulaire de contact "formContact"

    // Appel de la fonction "toggleModalForm" pour afficher/cacher la modale et l'overlay et pour mettre l'attribut "aria-hidden" à true /false
    toggleModalForm("block", "false");
    modal.querySelector("#first").focus();  // focus sur le 1er champ du formulaire
    focusTrapForm();    // Appel de la fonction "focusTrapForm" pour gérer le Focus trap sur la modale
}

/********************************************************************
 * Configuration du focus trap sur la modale
 */
function focusTrapForm() {
    // Sélection des éléments interactifs de la modale (y compris les éléments HTML ayant un attribut "tabindex" qui n'est pas égale à -1.)
    const focusableElements = modal.querySelectorAll(`button, input, textarea, [tabindex]:not([tabindex="-1"])`);

    // Sélection du 1er et du dernier élément intéractif
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Capturer les appuis sur les touches clavier
    modal.addEventListener('keydown', (event) => {
        // Capturer les appuis sur Tab et Shift + Tab
        if (event.key === 'Tab' || event.keyCode === 9);
            if (event.shiftKey && document.activeElement === firstElement) { // Si "Shift + Tab" est pressé et que l'élément actif est le 1er champ
                    event.preventDefault();
                    lastElement.focus(); // Boucle au dernier élément
            } else if (!event.shiftKey && document.activeElement === lastElement) { // Si seulement "Tab" est pressé et que l'élément actif est le dernier champ
                    event.preventDefault();
                    firstElement.focus(); // Boucle au premier élément
            }
    });
}

// Fonction pour afficher ou cacher la modale et l'overlay et pour mettre l'attribut "aria-hidden" de la modale à true /false
function toggleModalForm(display, ariaHidden) {
    // Affiche/cache la modale en modifiant son style display
    modal.style.display = display;
    // Affiche/cache l'overlay en modifiant son style display
    overlay.style.display = display;
    // mettre l'attribut "aria-hidden" de la modale à true /false
    modal.setAttribute('aria-hidden', ariaHidden);
}

function handleSubmit(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    if (!formContact.checkValidity()) { // Teste si le formulaire de contact n'est pas valide
        formContact.reportValidity();   // Affichage des messages d'erreur
    } else {
        // Si le formulaire est valide, récupèration des valeurs des champs
        const formData = ["first", "last", "email", "message"].map(id => document.querySelector(`#${id}`).value);
        closeModalForm(); // Fermeture de la modale
        // Affichage dans la console des données soumises par l'utilisateur
        console.log(`Formulaire soumis avec : ${formData.join(', ')}`);
    }
}

// Listener sur le bouton "Envoyer" du formulaire de contact
btnSubmit.addEventListener("click", handleSubmit);  // sur le click
btnSubmit.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        // Empêche le rechargement de la page par défaut du bouton de soumission
        event.preventDefault();
        // Teste si le formulaire de contact est valide
        handleSubmit(event);
    }
})

// Fermeture de la modale avec la touche "Escape"
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        // Appel de la fonction "closeModalForm" pour femer la modale
        closeModalForm();
    }
});
