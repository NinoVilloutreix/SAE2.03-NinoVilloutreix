let templateFile = await fetch("./component/NavBar/template.html");
let template = await templateFile.text();

let NavBar = {};

NavBar.format = function (hAbout, profiles) {
  let html = template;
  html = html.replaceAll("{{hAbout}}", hAbout);
  // console.log("NavBar format", profiles);
  html = html.replaceAll("{{fav}}", "C.handlerFavorisList()");

  let options = `<option value="">Choisir un profil</option>`; // Option par défaut
  for (let i = 0; i < profiles.length; i++) {
    let p = profiles[i];
    options += `<option value="${p.id}" data-img="${p.avatar}" data-age="${p.min_age}">${p.name}</option>`;
  }

  let image = profiles[0]?.avatar || "";

  html = html.replaceAll("{{options}}", options);
  html = html.replaceAll("{{image}}", image);
  html = html.replaceAll("{{handler}}", "C.handlerProfileChange(this)");
  html = html.replaceAll("{{handlerSearch}}", "C.handlerSearch()");
  html = html.replaceAll("{{handlerSearchToggle}}", "C.handlerSearchToggle()");
  html = html.replaceAll("{{handlerCloseSearch}}", "C.handlerCloseSearch()");

  html = html.replaceAll("{{handlerListToggle}}", "C.handlerListToggle()");
  html = html.replaceAll("{{handlerCloseList}}", "C.handlerCloseList()");
  return html;
};

export { NavBar };