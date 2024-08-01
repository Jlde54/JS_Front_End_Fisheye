
async function init() {
    const { photographers } = await getData();
    displayData(photographers, ".photographer_section");
}

// Initialise la page d'accueil
init();
