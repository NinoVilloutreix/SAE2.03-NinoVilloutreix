
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
  html = html.replace("{{handlerDelete}}", `C.handlerdeleteFavoris(${movie.id})`);
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

    console.log("soir")
    setTimeout(() => {
      element.classList.remove('movie__heart-clicked');
    }, 1000);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const movies = document.querySelectorAll('.movie');
  console.log("Éléments détectés :", movies); // Vérifie les éléments trouvés

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log("Observation d'un élément :", entry.target); // Vérifie que l'observateur fonctionne
      if (entry.isIntersecting) {
        console.log("Élément visible :", entry.target); // Vérifie si l'élément est visible
        entry.target.classList.add('animate');
        console.log("Classe ajoutée :", entry.target.classList.contains('animate')); // Vérifie si la classe est ajoutée
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5 // Ajuster si nécessaire
  });

  movies.forEach((movie) => {
    observer.observe(movie);
    console.log("Observation démarrée pour :", movie); // Vérifie que l'observateur est actif
  });
});



export { Movie };
