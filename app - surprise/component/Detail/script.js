
let templateFile = await fetch("./component/Detail/template.html");
let template = await templateFile.text();

let Detail = {};

Detail.format = function (detail) {
  let html = template;
  html = html.replace("{{name}}", detail.name);
  html = html.replace("{{real}}", detail.director);
  html = html.replace("{{annee}}", detail.year);
  html = html.replace("{{length}}", detail.length);
  html = html.replace("{{description}}", detail.description);
  html = html.replace("{{categorie}}", detail.category);
  html = html.replace("{{image}}", detail.image);
  html = html.replace("{{trailer}}", detail.trailer);
  html = html.replace("{{pegi}}", detail.min_age);
  html = html.replace("offclick", `C.handlerReverse(${detail.id})`);
  return html;
};
export { Detail };
