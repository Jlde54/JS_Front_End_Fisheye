
// Appel de la récupèration des paramètres de l'URL et des médias des photographes + l'affichage des medias des photographes
async function init() {
    // Appel de la récupèration des paramètres de l'URL
    const id = getURL("id");
    const name = getURL("name");
    const city = getURL("city");
    const country = getURL("country");
    const tagline = getURL("tagline");
    const picture = getURL("picture");
    const price = getURL("price");
    // Appel de la récupération des medias des photographes
    const { media } = await getData();
    // Filtre des médias sur l'id du photographe
    const mediaFiltre = media.filter((item) => item.photographerId == id);
    // Appel de l'affichage de l'entête du photographe
    displayPhotographerHeader(name, city, country, tagline, picture);
    // Construction du nom du dossier du photographe 
    let string = "";
    const firstSpaceIndex = name.indexOf(' ');
    if (firstSpaceIndex === -1) {
        string = name
    } else {
        string = name.substring(0, firstSpaceIndex);
    }
    let dirPhotographer = string.replace(/[^a-zA-Z]/g, " ");
    // Appel de l'affichage des medias des photographes
    displayData(mediaFiltre, ".medias_section", dirPhotographer);
    // Appel de la création des listeners pour ouvrir ou fermer le dropdown menu
    displayTarif (price);
    listenersDropDown();
}

// Récupération des paramètres de l'URL
function getURL (string){
    const urlParams = new URL(document.location).searchParams;
    const field = urlParams.get(string);
    return field;
}

// Récupération des medias des photographes depuis le fichier JSON
async function getData() {
    const reponse = await fetch("./data/photographers.json");
    const medias = await reponse.json();
    return medias;
}

// Création des éléments du header et du dropdown menu de la page photographe +
// Ajout des éléments à leur parent dans le DOM
function displayPhotographerHeader (name, city, country, tagline, picture) {
    // Création des éléments du header de la page photographe
    const photographHeader = document.querySelector(".photograph-header");

    const divPhotographerProfile = document.createElement("div");
    divPhotographerProfile.className = "photograph-header-profile";

    // Création de l'élément <img> : Portrait du photographe
    const imgPicture = document.createElement( 'img' );
    imgPicture.setAttribute("src", picture);
    imgPicture.setAttribute("alt", `Portrait du photographe ${name}`);
    imgPicture.className = "photograph-header-imgprofile";

    // Création de l'élément <h2> : Nom du photographe
    const h2Name = document.createElement("h2");
    h2Name.textContent = name;

    // Création de l'élément <h3> : Localisation du photographe
    const h3Location = document.createElement("h3");
    h3Location.textContent = `${city}, ${country}`;

    // Création de l'élément <h4> : Slogan du photographe
    const h4Tagline = document.createElement("h4");
    h4Tagline.textContent = tagline;

    // Création des éléments du dropdown menu de la page photographe
    const main = document.querySelector("#main");
    const mediaSection = document.querySelector(".medias_section");

    const divSort = document.createElement("div");
    divSort.className = "photograph-sort";

    const labelDropDown = document.createElement("label");
    labelDropDown.setAttribute("for", "select-list");
    labelDropDown.textContent = "Trier par ";

    const divSelect = document.createElement("div");
    divSelect.className = "custom-dropdown";

    const divSelected = document.createElement('button');
    divSelected.className = 'selected';
    divSelected.innerHTML = 'Popularité <span class="arrow"><i class="fa-solid fa-chevron-down"></i></span>';

    const selectDropDown = document.createElement("div");
    // selectDropDown.className = "select-list";
    selectDropDown.className = "menu";

    const optionDropDown1 = document.createElement("div");
    optionDropDown1.value = "Popularité";
    optionDropDown1.innerHTML = 'Popularité <span class="arrow"><i class="fa-solid fa-chevron-up"></i></span>';
    optionDropDown1.className = "option";

    const optionDropDown2 = document.createElement("div");
    optionDropDown2.value = "Date";
    optionDropDown2.textContent = "Date";
    optionDropDown2.className = "option";
    
    const optionDropDown3 = document.createElement("div");
    optionDropDown3.value = "Titre";
    optionDropDown3.textContent = "Titre";
    optionDropDown3.className = "option";

    // Ajout des éléments à leur parent dans le DOM
    photographHeader.insertBefore(divPhotographerProfile, photographHeader.firstChild);

    divPhotographerProfile.appendChild(h2Name);
    divPhotographerProfile.appendChild(h3Location);
    divPhotographerProfile.appendChild(h4Tagline);
    
    photographHeader.appendChild(imgPicture);

    main.insertBefore(divSort, mediaSection);

    divSort.appendChild(labelDropDown);
    divSort.appendChild(divSelect);

    divSelect.appendChild(divSelected);
    divSelect.appendChild(selectDropDown);
    
    selectDropDown.appendChild(optionDropDown1);
    selectDropDown.appendChild(optionDropDown2);
    selectDropDown.appendChild(optionDropDown3);
}

// Affichage de l'encart contenant le nombre total de likes et le tarif du photographe
function displayTarif (price) {
    const main = document.querySelector("#main");
    const divTarifLikes = document.createElement("div");
    divTarifLikes.className = "photograph-likes-tarif";

    const divLikes = document.createElement("div");
    divLikes.className = "photograph-likes";
    divLikes.innerHTML = '297 081 <span class="arrow"><i class="fa-solid fa-heart"></i></span>';

    const divTarif = document.createElement("div");
    divTarif.className = "photograph-tarif";
    divTarif.textContent = `${price}€/jour`;

    main.appendChild(divTarifLikes);
    divTarifLikes.appendChild(divLikes);
    divTarifLikes.appendChild(divTarif);
}

// Création des listeners pour ouvrir ou fermer le dropdown menu
function listenersDropDown () {
    const divSelected = document.querySelector(".selected");
    const selectDropDown = document.querySelector(".menu");

        divSelected.addEventListener('click', () => {
            // selectDropDown.classList.toggle('hidden');
            selectDropDown.classList.toggle('show');
        });

        document.querySelectorAll('.custom-dropdown .option').forEach(option => {
            option.addEventListener('click', event => {
                divSelected.innerHTML = `${event.currentTarget.textContent}<span class="arrow"><i class="fa-solid fa-chevron-down"></i></span>`;
                // selectDropDown.classList.add("hidden");
                selectDropDown.classList.toggle('show');
            });
        });

        document.addEventListener('click', event => {
            if (!document.querySelector('.custom-dropdown').contains(event.target)) {
                // selectDropDown.classList.add('hidden');
                selectDropDown.classList.toggle('show');
            }
        });
}

// Initialise la page photographe
init();
