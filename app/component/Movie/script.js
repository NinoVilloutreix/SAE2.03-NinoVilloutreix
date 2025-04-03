let templateFile = await fetch("./component/Movie/template.html");
let template = await templateFile.text();

let Movie = {};

Movie.format = function (hAbout) {
  let html = template;
  html = html.replace("{{images}}", Movie.image);
  html = html.replace("{{name}}", Movie.name);
  return html;
};

export { Movie };
