
let templateFile = await fetch("./component/Movie/template.html");
let template = await templateFile.text();

let Movie = {};

Movie.format = function (movie, heart) {
  let html = template;
  html = html.replace("{{image}}", movie.image);
  html = html.replace("{{name}}", movie.name);
  html = html.replace("{{heart}}", movie.heart);
  html = html.replace("{{onclick}}", `C.handlerDetail(${movie.id})`);


  if (heart.includes(movie.id)) {
    html = html.replace("{{path_star}}", "../assets/images/heart-red.png");
  }
  else {
    html = html.replace("{{path_star}}", "../assets/images/heart-white.png");
  }











  return html;
};

Movie.formatMany = function(movies) {
  let html = "";
  for (const r of movies) {
    html = html + Movie.format(r);
  }
  return html;
};



export { Movie };
