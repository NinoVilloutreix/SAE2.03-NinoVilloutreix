
let templateFile = await fetch("./component/Movie/template.html");
let template = await templateFile.text();

let Movie = {};


Movie.format = function (movie) {
  let html = template;
  html = html.replace("{{image}}", movie.image);
  html = html.replace("{{name}}", movie.name);
  html = html.replace("{{onclick}}", `C.handlerDetail(${movie.id})`);
  html = html.replace("{{handlerFavoris}}", `C.handlerFavoris(${movie.id})`);
  html = html.replace("{{handlerDelete}}", `C.handlerdeleteFavoris(${movie.id})`);
  html = html.replace("{{data-id}}", movie.id); // Ajout d'un attribut data-id
  return html;
};

Movie.formatMany = function(movies) {
  let html = "";
  for (const r of movies) {
    html = html + Movie.format(r); //CHANGEEER
  }
  return html;
};

document.querySelectorAll('.movie__heart').forEach((heart) => {
  heart.addEventListener('click', (event) => {
    const element = event.target;

    element.classList.add('movie__heart-clicked');

    // console.log("'soir")
    setTimeout(() => {
      element.classList.remove('movie__heart-clicked');
    }, 1000);
  });
});




export { Movie };
