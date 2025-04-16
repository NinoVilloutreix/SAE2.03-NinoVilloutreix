
let templateFile = await fetch("./component/Featured/template.html");
let template = await templateFile.text();

let templateFileCards = await fetch("./component/Featured/template-card.html");
let templateCards = await templateFileCards.text();

let Featured = {};



Featured.format = function (feature) {
  let html = template; // Le template global pour la section
  let cardsHTML = ""; // Initialise les cards pour cette section

  // Remplir le template de la card avec les valeurs du film
  let card = templateCards;
  card = card.replace("{{image}}", feature.image);
  card = card.replace("{{name}}", feature.name);
  card = card.replace("{{description}}", feature.description);
  card = card.replace("{{onclick}}", `C.handlerDetail(${feature.id})`);

  // card = card.replace("{{handlerCarouselLeft}}", `C.handlerCarouselLeft()`);
  // card = card.replace("{{handlerCarouselRight}}", `C.handlerCarouselRight()`);

  cardsHTML += card; // Ajoute cette carte au contenu

  // Remplir le template global avec les cartes générées
  html = html.replace("{{cards}}", cardsHTML);
  return html;
};


Featured.formatMany = function (features) {
  let cardsHTML = ""; // Initialise un espace pour les cartes

  for (const feature of features) {
    // Formate chaque film en utilisant le template-card.html
    let card = templateCards;
    card = card.replace("{{image}}", feature.image);
    card = card.replace("{{name}}", feature.name);
    card = card.replace("{{description}}", feature.description);
    card = card.replace("{{onclick}}", `C.handlerDetail(${feature.id})`);
    cardsHTML += card; // Ajoute chaque carte au contenu
  }

  return cardsHTML; // Retourne toutes les cards générées
};


// ############################################################################################################


export { Featured };
