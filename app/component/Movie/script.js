
let templateFile = await fetch("./component/Movie/template.html");
let template = await templateFile.text();

let Movie = {};



Movie.format = function (movie) {
  let html = template;
  html = html.replace("{{image}}", movie.image);
  html = html.replace("{{name}}", movie.name);
  // html = html.replace("{{heart}}", movie.heart);
  html = html.replace("{{onclick}}", `C.handlerDetail(${movie.id})`);
  html = html.replace("{{handlerFavoris}}", `C.handlerFavoris(${movie.id})`);
  html = html.replace("{{handlerDelete}}", `C.handlerDelete(${movie.id})`);
  return html;
};

Movie.formatMany = function(movies) {
  let html = "";
  for (const r of movies) {
    html = html + Movie.format(r); //CHANGEEER
  }
  return html;
};



export { Movie };
