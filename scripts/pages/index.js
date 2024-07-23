async function getPhotographers() {
    // Récupération des photographes depuis le fichier JSON
    const reponse = await fetch("../../data/photographers.json");
    const photografers = await reponse.json();
    return photografers;
}

async function displayData(photographers) {
    // Affichage des portraits des photographes sur la page d'accueil
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        console.log("photographerModel : ", photographerModel);
        const userCardDOM = photographerModel.getUserCardDOM();
        console.log("userCardDOM : ", userCardDOM);
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère et affiche les datas des photographes
    const { photographers } = await getPhotographers();
    console.log("photographers : ", photographers)
    displayData(photographers);
}

init();
