let templateFile = await fetch("./component/Favoris/template.html");
let template = await templateFile.text();

let Favoris = {};

Favoris.format = function (movie) {
    let html = template;
    html=html.replace("{{card}}", movie.card)
    return html;
};

export { Favoris };