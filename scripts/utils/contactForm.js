// Sélection des éléments
// **********************
const modal = document.querySelector("#contact_modal");
const overlay = document.querySelector(".overlay");
const contactButton = document.querySelector(".photograph-header-button");  // bouton "Contactez-moi"
const btnSubmit = document.querySelector(".btn-submit");    // bouton "Envoyer"

// Variable(s) globale(s)
// **********************
let isContactModalOpen = false;   // modale ouverte/fermée

/********************************************************************
 * Fonction "closeModalForm" pour la fermeture de la modale du formulaire de contact.
 * L'appel se fait depuis "photographer.html"
 */
function closeModalForm() {
    toggleModalForm("none", "true");    // afficher/cacher la modale et l'overlay et mettre l'attribut "aria-hidden" à true /false
    contactButton.focus();  // focus sur le bouton "Contactez-moi"
    isContactModalOpen = false;   // modale fermée
}

/********************************************************************
 * Fonction "openModalForm" pour afficher la modale du formulaire de contact au clic sur le bouton "Contactez-moi".
 * L'appel se fait depuis "photographer.html"
 */
function openModalForm() {
    document.formContact.reset();   // Réinitialisation des champs du formulaire de contact "formContact"
    toggleModalForm("block", "false");  // afficher/cacher la modale et l'overlay et mettre l'attribut "aria-hidden" à true /false
    modal.querySelector("#first").focus();  // focus sur le 1er champ du formulaire
    isContactModalOpen = true;   // modale ouverte
    focusTrapForm();    // gérer le Focus trap sur la modale
}

/********************************************************************
 * Configuration du focus trap sur la modale
 */
function focusTrapForm() {
    const focusableElements = modal.querySelectorAll(`button, input, textarea, [tabindex]:not([tabindex="-1"])`);   // éléments interactifs de la modale

    // Sélection du 1er et du dernier élément intéractif
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Capturer les appuis surTab et Shift + Tab
    modal.addEventListener("keydown", (event) => {
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
 * Fonction pour afficher ou cacher la modale et l'overlay et pour mettre l'attribut "aria-hidden" de la modale à true /false
 * 
 * @param {display} - contenu de la propriété "display" (none ou block) 
 * @param {ariaHidden} - contenu de la propriété "aria-hidden" (true ou false)
 */
function toggleModalForm(display, ariaHidden) {
    modal.style.display = display;  // Affiche/cache la modale en modifiant son style display
    overlay.style.display = display;    // Affiche/cache l'overlay en modifiant son style display
    modal.setAttribute("aria-hidden", ariaHidden);  // mettre l'attribut "aria-hidden" de la modale à true /false
}

/********************************************************************
 * Contrôle des champs et soumission du formulaire
 * 
 * @param {event} - événement ayant déclenché le submit
 */
function handleSubmit(event) {
    event.preventDefault();
    if (!formContact.checkValidity()) { // Teste si le formulaire de contact n'est pas valide
        formContact.reportValidity();   // Affichage des messages d'erreur
        let inputs = formContact.querySelectorAll("input, textarea");   // Validation individuelle des champs
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                input.setAttribute("aria-invalid", "true"); // Marque le champ comme invalide
            } else {
                input.setAttribute("aria-invalid", "false"); // Marque le champ comme valide
            }
        });
    } else {    // Si le formulaire est valide, récupèration des valeurs des champs
        const formData = ["first", "last", "email", "message"].map(id => document.querySelector(`#${id}`).value);
        closeModalForm(); // Fermeture de la modale
        // Affichage dans la console des données soumises par l'utilisateur
        console.log(`Formulaire soumis avec : ${formData.join(', ')}`);
    }
}

// *********
// Listeners
// *********

// Listener sur le bouton "Envoyer" du formulaire de contact
btnSubmit.addEventListener("click", handleSubmit);  // sur le click
btnSubmit.addEventListener("keydown", (event) => {  // sur le "Enter" ou "Espace"
    if (event.key === "Enter" || event.key === " ") {
        // Empêche le rechargement de la page par défaut du bouton de soumission
        event.preventDefault();
        // Teste si le formulaire de contact est valide
        handleSubmit(event);
    }
})

// Fermeture de la modale avec la touche "Escape"
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && isContactModalOpen) {
        closeModalForm();   //  Fermeture de la modale
    }
});
