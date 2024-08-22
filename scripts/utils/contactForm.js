/********************************************************************
 * Fonction "closeModalForm" pour la fermeture de la modale du formulaire de contact.
 * L'appel se fait depuis "photographer.html"
 */
function closeModalForm() {
    // Sélection de la modale via son ID "#contact_modal"
    const modal = document.querySelector("#contact_modal");
    // Sélection de l'overlay via sa classe ".overlay"
    const overlay = document.querySelector(".overlay");
    // Cache la modale en modifiant son style display à "none"
    modal.style.display = "none";
    // Cache l'overlay en modifiant son style display à "none"
    overlay.style.display = "none";
    // Retour du focus sur le bouton "Contactez-moi"
    document.querySelector(".photograph-header-button").focus();
    // La modale est ignorée par les technologies d’assistance 
    modal.setAttribute('aria-hidden', 'true');
}

/********************************************************************
 * Fonction "displayModalForm" pour afficher de la modale du formulaire de contact au clic sur le bouton "Contactez-moi".
 * L'appel se fait depuis "photographer.html"
 */
function displayModalForm() {
    // Réinitialisation des champs du formulaire de contact "formContact"
    document.formContact.reset();
    // Sélection de la modale via son ID "#contact_modal"
    const modal = document.querySelector("#contact_modal");
    // Sélection de l'overlay via sa classe ".overlay"
    const overlay = document.querySelector(".overlay");
    // Affichage de la modale en modifiant son style display à "block"
	modal.style.display = "block";
    // Affichage de l'overlay en modifiant son style display à "block"
    overlay.style.display = "block";
    // La modale est accessible par les technologies d’assistance
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector("#first").focus();
    // Appel de la fonction "focusTrapForm" pour gérer le Focus trap sur la modale
    focusTrapForm()
}

/********************************************************************
 * Configuration du focus trap sur la modale
 */
function focusTrapForm() {
    // Sélection de la modale via son ID "#contact_modal"
    const modal = document.querySelector("#contact_modal");
    // Sélection des éléments interactifs de la modale (y compris les éléments HTML ayant un attribut "tabindex" qui n'est pas égale à -1.)
    const focusableElements = modal.querySelectorAll(`button, input, textarea, [tabindex]:not([tabindex="-1"])`);
    // Sélection du 1er et du dernier élément intéractif
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    // Capturer les appuis sur les touches clavier
    modal.addEventListener('keydown', function (event) {
        // Capturer les appuis sur Tab et Shift + Tab
        const isTabPressed = (event.key === 'Tab' || event.keyCode === 9);
        if (!isTabPressed) return;
        if (event.shiftKey) { // Si "Shift + Tab" est pressé
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus(); // Boucle au dernier élément
            }
        } else { // Si seulement "Tab" est pressé
            if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus(); // Boucle au premier élément
            }
        }
    });
}

// Listener sur le bouton "Envoyer" du formulaire de contact
const btnSubmit = document.querySelector(".btn-submit");
btnSubmit.addEventListener("click", (event) => {
    // Empêche le rechargement de la page par défaut du bouton de soumission
    event.preventDefault();
    // Teste si le formulaire de contact est valide
    if (!formContact.checkValidity()) {
        // Si non, affichage des messages d'erreur
        formContact.reportValidity();
        return;     // Stoppe la fonction si le formulaire est invalide
    } else {
        // Si le formulaire est valide, récupèration des valeurs des champs
        const first = document.querySelector("#first").value;
        const last = document.querySelector("#last").value;
        const email = document.querySelector("#email").value;
        const message = document.querySelector("#message").value;
        // Sélection de la modale via son ID "#contact_modal"
        const modal = document.querySelector("#contact_modal");
        // Sélection de l'overlay via sa classe ".overlay"
        const overlay = document.querySelector(".overlay");
        // Cache la modale en modifiant son style display à "none"
        modal.style.display = "none";
        // Cache l'overlay en modifiant son style display à "none"
        overlay.style.display = "none";
        // Affichage dans la console des données soumises par l'utilisateur
        console.log(`Formulaire soumis avec : ${first}, ${last}, ${email}, ${message}`);
    }
})

// Fermeture de la modale avec la touche "Escape"
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeModalForm();
    }
});
