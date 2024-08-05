
// Affichage des datas des photographes (description + medias)
function dataTemplate(data, section, dirPhotographer) {
    const { name, id, city, country, tagline, price, portrait, photographerId, title, image, video, likes, date } = data;

    let picture = "";
    
    // Création des éléments + Ajout des éléments à leur parent dans le DOM
    function getUserCardDOM() {
        // Eléments de la page d'accueil
        if (section === ".photographer_section") {
            picture =`assets/photographers/${portrait}`;
            // Création de l'élément <article> : Carte du photographe
            const article = document.createElement( 'article' );
            article.id =`art${id}`;

            // Création de l'élément <a> : Lien vers les medias du photographe
            const linkPortrait = document.createElement("a");
            linkPortrait.arialabel = `Lien vers la page du photographe ${name}`;
            linkPortrait.href = `./photographer.html?id=${id}&name=${name}&city=${city}&country=${country}&tagline=${tagline}&picture=${picture}&price=${price}`;
            // linkPortrait.target = "_blank";
            linkPortrait.dataset.id = id;

            // Création de l'élément <img> : Portrait du photographe
            const imgPortrait = document.createElement( 'img' );
            imgPortrait.src = picture;
            imgPortrait.alt = `Portrait du photographe ${name}`;

            // Création de l'élément <h2> : Nom du photographe
            const h2Name = document.createElement( 'h2' );
            h2Name.textContent = name;

            // Création de l'élément <h3> : Localisation du photographe
            const h3Location = document.createElement("h3");
            h3Location.textContent = `${city}, ${country}`;

            // Création de l'élément <h4> : Slogan du photographe
            const h4Tagline = document.createElement("h4");
            h4Tagline.textContent = tagline;

            // Création de l'élément <p> : Tarif du photographe
            const pPrice = document.createElement("p");
            pPrice.textContent = `${price}€/jour`;

            // Ajout des éléments à leur parent dans le DOM
            article.appendChild(linkPortrait);
            linkPortrait.appendChild(imgPortrait);
            linkPortrait.appendChild(h2Name);
            article.appendChild(h3Location);
            article.appendChild(h4Tagline);
            article.appendChild(pPrice);

            return (article);

        // Eléments de la page photographe
        } else {
            // Création des éléments pour afficher une image ou une video
            const mediaData = {
                image: image,
                video: video,
                dirPhotographer: dirPhotographer,
                title: title
            };
            const imgMedia = mediaElementFactory(mediaData);

            // Fonction factory
            function mediaElementFactory({ image, video, dirPhotographer, title }) {
                let picture, imgMedia;
                if (image !== undefined) {
                    picture = `./assets/photographers/${dirPhotographer}/${image}`;
                    imgMedia = document.createElement('img');
                    imgMedia.src = picture;
                    imgMedia.alt = `Media ${title}`;
                    imgMedia.className = "medias_section_img";
                } else if (video !== undefined) {
                    picture = `./assets/photographers/${dirPhotographer}/${video}`;
                    imgMedia = document.createElement('video');
                    imgMedia.src = picture;
                    imgMedia.className = "medias_section_img";
                } else {
                    throw new Error("No media source provided");
                }
                return imgMedia;
            }

            const article = document.createElement( 'article' );

            // Création de l'élément <a> : Lien vers le media grand format
            const linkMedia = document.createElement("a");
            linkMedia.arialabel = `Lien vers le media ${title} grand format`;
            linkMedia.href = "#";
            linkMedia.dataset.id = `med${id}`;
            linkMedia.id =`med${id}`;

            // Création de l'élément <div> : Description du média
            const divDescMedia = document.createElement("div");
            divDescMedia.className = "medias_section_descMedia";

            // Création de l'élément <h3> : Titre du média
            const h3Title = document.createElement("h3");
            h3Title.textContent = `${title}`;
            h3Title.className = "medias_section_title";

            // Création de l'élément <div> : Description des likes
            const divDescLikes = document.createElement("div");
            divDescLikes.className = "medias_section_descLikes";

            // Création de l'élément <p> : Nombre de likes
            const pLikes = document.createElement("p");
            pLikes.textContent = `${likes}`;
            pLikes.className = "medias_section_likes";

            // Création de l'élément <p> : Nombre de likes
            const iIcon = document.createElement("p");
            iIcon.innerHTML = "<i class='fa-solid fa-heart'></i>";
            iIcon.className = "medias_section_icon";

            // Ajout des éléments à leur parent dans le DOM
            article.appendChild(linkMedia);
            article.appendChild(divDescMedia);
            linkMedia.appendChild(imgMedia);
            divDescMedia.appendChild(h3Title);
            divDescMedia.appendChild(divDescLikes);
            divDescLikes.appendChild(pLikes);
            divDescLikes.appendChild(iIcon);

            return (article);
        }
    }
    return { name, picture, getUserCardDOM }
}

// Récupération des datas des photographes depuis le fichier JSON
async function getData() {
    const reponse = await fetch("./data/photographers.json");
    const data = await reponse.json();
    return data;
}

// Appel de l'affichage des datas des photographes
async function displayData(data, section, dirPhotographer) {
    const sectionData = document.querySelector(section);
    data.forEach((item) => {
        const dataModel = dataTemplate(item, section, dirPhotographer);
        const userCardDOM = dataModel.getUserCardDOM();
        sectionData.appendChild(userCardDOM);
    });
}