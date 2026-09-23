import { ajoutListenersAvis, ajoutListenerEnvoyerAvis, afficherAvis } from "./avis.js";

//Récupération des pièces eventuellement stockées dans le localStorage
let pieces = window.localStorage.getItem('pieces');
if (pieces === null) {
    // Récupération des pièces depuis l'API
    const reponse = await fetch('http://localhost:8081/pieces/');
    pieces = await reponse.json();
    // Transformation des pièces en JSON
    const valeurPieces = JSON.stringify(pieces);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("pieces", valeurPieces);
} else {
    pieces = JSON.parse(pieces);
}

ajoutListenerEnvoyerAvis()

// Fonction qui génère toute la page web
function genererPieces(pieces) {
    // Création des balises pour l'article :
    for (let i = 0; i < pieces.length; i++) {

        const article = pieces[i];
        //Balise Article
        const piecesElement = document.createElement("article");
        // img
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        // titre
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        //p prix
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        //p catégorie
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        //p description
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        //p disponibilité
        const disponibiliteElement = document.createElement("p");
        disponibiliteElement.innerText = article.disponibilite ? "En stock" : "Rupture de Stock";
        //Bouton Avis 
        const avisBouton = document.createElement("button");
        avisBouton.dataset.id = article.id;
        avisBouton.textContent = "Afficher les avis";
        // rattaché les éléments au DOM :
        const sectionFiches = document.querySelector(".fiches");
        sectionFiches.appendChild(piecesElement);
        piecesElement.appendChild(imageElement);
        piecesElement.appendChild(nomElement);
        piecesElement.appendChild(prixElement);
        piecesElement.appendChild(categorieElement);
        piecesElement.appendChild(descriptionElement);
        piecesElement.appendChild(disponibiliteElement);
        piecesElement.appendChild(avisBouton)
    }
    ajoutListenersAvis()
}
genererPieces(pieces)


for (let i = 0; i < pieces.length; i++) {
    const id = pieces[i].id;
    const avisJSON = window.localStorage.getItem(`avis-piece-${id}`);
    const avis = JSON.parse(avisJSON);

    if (avis !== null) {
        const pieceElement = document.querySelector(`article[data-id="${id}"]`);
        afficherAvis(pieceElement, avis)
    }
}

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


//Creer le filtre du bouton range
const inputPrixFiltrer = document.querySelector("#inputRange")
inputPrixFiltrer.addEventListener("input", () => {
    const piecesFiltrees = pieces.filter(function (piece) {
        return piece.prix <= inputPrixFiltrer.value;
    })
    document.querySelector(".fiches").innerHTML = ""
    genererPieces(piecesFiltrees)
});

// Ajout du listener pour mettre à jour des données du localStorage
const boutonMettreAJour = document.querySelector(".btn-maj");
boutonMettreAJour.addEventListener("click", function () {
    window.localStorage.removeItem("pieces");
});
