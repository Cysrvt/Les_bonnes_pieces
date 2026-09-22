// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

// Fonction qui génère toute la page web
function genererPieces(pieces) {
    // Création des balises pour l'article :
    for (let i = 0; i < pieces.length; i++) {

        const article = pieces[i];
        const piecesElement = document.createElement("article");
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        const disponibiliteElement = document.createElement("p");
        disponibiliteElement.innerText = article.disponibilite ? "En stock" : "Rupture de Stock";

        // rattaché les éléments au DOM :
        const sectionFiches = document.querySelector(".fiches");
        sectionFiches.appendChild(piecesElement);
        piecesElement.appendChild(imageElement);
        piecesElement.appendChild(nomElement);
        piecesElement.appendChild(prixElement);
        piecesElement.appendChild(categorieElement);
        piecesElement.appendChild(descriptionElement);
        piecesElement.appendChild(disponibiliteElement);

    }
}
genererPieces(pieces)


// Gestion des boutons
//Bouton Tri prix croissant
const boutonTriCroissant = document.querySelector(".triCroissant")
boutonTriCroissant.addEventListener("click", () => {
    const piecesOrdonnees = Array.from(pieces);

    piecesOrdonnees.sort(function (a, b) {
        return a.prix - b.prix;
    });

    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesOrdonnees)
})

//Bouton Tri prix decroissant
const boutonTriDecroissant = document.querySelector(".triDecroissant")
boutonTriDecroissant.addEventListener("click", () => {
    const piecesOrdonnees = Array.from(pieces);

    piecesOrdonnees.sort(function (a, b) {
        return b.prix - a.prix;
    });
    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesOrdonnees);
})

//Bouton Filtre prix abordable       
const btnPrixFiltrer = document.querySelector(".prixFilter")
btnPrixFiltrer.addEventListener("click", () => {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= 35;
    })
    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesFiltrees)
});


//Bouton filtre presence de description
const btnDescriptionFiltrer = document.querySelector(".descriptionFilter")
btnDescriptionFiltrer.addEventListener("click", () => {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.description;
    })
    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesFiltrees)
});

// creer la liste des noms de pieces abordable et l'affiché 

const noms = pieces.map(piece => piece.nom);
for (let i = pieces.length - 1; i >= 0; i--) {
    if (pieces[i].prix > 35) {
        noms.splice(i, 1)
    }
}

const abordablesElements = document.createElement("ul")

// creer les balise <li> avec la liste des noms 
for (let i = 0; i < noms.length; i++) {
    const nomElement = document.createElement('li');
    nomElement.innerText = noms[i];
    abordablesElements.appendChild(nomElement)
}
const listAbordable = document.querySelector('.abordables')
listAbordable.appendChild(abordablesElements)


// creer la liste des noms de pieces disponible et l'affiché

const piecesDisponible = pieces.map(piece => `${piece.nom} - ${piece.prix} €`)

for (let i = pieces.length - 1; i >= 0; i--) {
    if (!pieces[i].disponibilite) {
        piecesDisponible.splice(i, 1)
    }
}
// Creer les balises de liste 

const disponibleElement = document.createElement("ul")

for (let i = 0; i < piecesDisponible.length; i++) {
    const listElement = document.createElement("li")
    listElement.innerText = piecesDisponible[i]
    disponibleElement.appendChild(listElement)
}

const disponibles = document.querySelector(".disponibles")
disponibles.appendChild(disponibleElement)

