
let templateFile = await fetch("./component/Featured/template.html");
let template = await templateFile.text();

let Featured = {};



Featured.format = function (feature) {
  let html = template;
  html = html.replace("{{image}}", feature.image);
  html = html.replace("{{name}}", feature.name);
  html = html.replace("{{description}}",feature.description)
  html = html.replace("{{onclick}}", `C.handlerDetail(${feature.id})`);
  html = html.replace("{{handlerFavoris}}", `C.handlerFavoris(${feature.id})`);
  html = html.replace("{{handlerDelete}}", `C.handlerdeleteFavoris(${feature.id})`);
  return html;
};

Featured.formatMany = function(features) {
  let html = "";
  for (const r of features) {
    html = html + Featured.format(r); //CHANGEEER
  }
  return html;
};

document.querySelectorAll('.feature__heart').forEach((heart) => {
  heart.addEventListener('click', (event) => {
    const element = event.target;

    element.classList.add('feature__heart-clicked');

    console.log("soir")
    setTimeout(() => {
      element.classList.remove('feature__heart-clicked');
    }, 1000);
  });
});

export { Featured };
