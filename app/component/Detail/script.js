
let templateFile = await fetch("./component/Detail/template.html");
let template = await templateFile.text();

let Detail = {};

Detail.format = function (detail) {
  let html = template;
  html = html.replace("{{name}}", detail.name);
  html = html.replace("{{real}}", detail.real);
  html = html.replace("{{annee}}", detail.annee);
  html = html.replace("{{length}}", detail.length);
  html = html.replace("{{description}}", detail.description);
  html = html.replace("{{categorie}}", detail.categorie);
  html = html.replace("{{image}}", detail.image);
  html = html.replace("{{trailer}}", detail.trailer);
  html = html.replace("{{pegi}}", detail.pegi);
  return html;
};
export { Detail };
