
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
  card = card.replace("{{handlerFavoris}}", `C.handlerFavoris(${feature.id})`);
  card = card.replace("{{handlerDelete}}", `C.handlerdeleteFavoris(${feature.id})`);

  cardsHTML += card; // Ajoute cette carte au contenu

  // Remplir le template global avec les cartes générées
  html = html.replace("{{cards}}", cardsHTML);
  return html;
};


Featured.formatMany = function (features) {
  let html = template; // Le template global avec {{cards}}
  let cardsHTML = ""; // Initialise un espace pour les cartes

  for (const feature of features) {
    // Formate chaque film en utilisant le template-cards.html
    let card = templateCards;
    card = card.replace("{{image}}", feature.image);
    card = card.replace("{{name}}", feature.name);
    card = card.replace("{{description}}", feature.description);
    card = card.replace("{{onclick}}", `C.handlerDetail(${feature.id})`);
    card = card.replace("{{handlerFavoris}}", `C.handlerFavoris(${feature.id})`);
    card = card.replace("{{handlerDelete}}", `C.handlerdeleteFavoris(${feature.id})`);
    cardsHTML += card; // Ajoute chaque carte au contenu
  }

  // Remplit le template principal avec toutes les cartes
  html = html.replace("{{cards}}", cardsHTML);
  return html;
};


const hearts = document.querySelectorAll('.feature__heart');

for (let i = 0; i < hearts.length; i++) {
  hearts[i].addEventListener('click', (event) => {
    const element = event.target;

    element.classList.add('feature__heart-clicked');

    console.log("soir");
    setTimeout(() => {
      element.classList.remove('feature__heart-clicked');
    }, 1000);
  });
}

export { Featured };
