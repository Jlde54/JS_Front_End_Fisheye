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
    // Affichge de l'overlay en modifiant son style display à "block"
    overlay.style.display = "block";
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
