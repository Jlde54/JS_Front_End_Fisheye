// Fermeture de la modale du formulaire
function closeModalForm() {
    const modal = document.querySelector("#contact_modal");
    modal.style.display = "none";
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "none";
}

// Afficher de la modale du formulaire
function displayModalForm() {
    document.form.reset();
    const modal = document.querySelector("#contact_modal");
	modal.style.display = "block";
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "block";
}

// Afficher de la modale lightbox
function displayLightboxModal(image, desc) {
    const modal = document.querySelector("#lightbox_modal");
	modal.style.display = "block";
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "block";

    const ligthboxImg = document.querySelector(".lightbox-img");
    ligthboxImg.innerHTML = "";
    if (image.endsWith(".mp4")) {
        const imgMedia = document.createElement("video");
        imgMedia.src = image;
        imgMedia.alt = desc;
        ligthboxImg.appendChild(imgMedia);
    } else {
        const imgMedia = document.createElement("img");
        imgMedia.src = image;
        imgMedia.alt = desc;
        ligthboxImg.appendChild(imgMedia);
    }

    const ligthboxDesc = document.querySelector(".lightbox-desc");
    ligthboxDesc.textContent = desc;
}

// Fermeture de la modale lightbox
function closeModalLightbox() {
    const modal = document.querySelector("#lightbox_modal");
    modal.style.display = "none";
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "none";
}

// Listener sur le bouton "Envoyer" du formulaire
const btnSubmit = document.querySelector(".btn-submit");
btnSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    } else {
        const first = document.querySelector("#first").value;
        const last = document.querySelector("#last").value;
        const email = document.querySelector("#email").value;
        const message = document.querySelector("#message").value;

        const modal = document.querySelector("#contact_modal");
        modal.style.display = "none";
        const overlay = document.querySelector(".overlay");
        overlay.style.display = "none";

        console.log(`Formulaire soumis avec : ${first}, ${last}, ${email}, ${message}`);
    }
})



