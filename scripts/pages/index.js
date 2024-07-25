// Récupération des datas des photographes depuis le fichier JSON
async function getPhotographers() {
    const reponse = await fetch("../../data/photographers.json");
    const photografers = await reponse.json();
    return photografers;
}
// Affichage des datas des photographes sur la page d'accueil
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}
// Appelle la récupèration et l'affichage des datas des photographes
async function init() {
    const { photographers } = await getPhotographers();
    await displayData(photographers);
    listenPhotographer();
}
// Initialise la page d'accueil
init();
