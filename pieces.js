// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

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


