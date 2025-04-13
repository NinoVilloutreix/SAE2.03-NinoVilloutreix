import { Movie } from "../Movie/script.js";
import { DataMovie } from '../../data/dataMovie.js';

// console.log("Fetching template from:", "./component/Moviecategory/template.html"); De la douce époque où ça marchait trop pas
let templateFile = await fetch("./component/MovieCategory/template.html");
let template = await templateFile.text();

let MovieCategory = {};

MovieCategory.format = function (categoryname, movies) {
  let html = template;
  // console.log("Formatting category:", categoryname, "with movies:", movies); // Vérifiez les données
  html = html.replace("{{category}}", categoryname);

  // let filterMovie = [];
  // for (const movie of movies) {
  //   if (movie.category_id == category.id) {
  //     filterMovie.push(movie);
  //   }
  // }

  html = html.replace("{{movies}}", Movie.formatMany(movies));
  return html;
};




MovieCategory.formatMany = async function(categories, profileAge = null) {
  let html = "";

  for (const category of categories) {
      let movies = await DataMovie.getMovieCategory(category.id);
      
      // Filtrer les films selon le PEGI et l'âge du profil
      if (profileAge !== null) {
          movies = movies.filter(movie => {
              const diff = profileAge - movie.min_age; // Calcul de la différence
              console.log(`Film: ${movie.name}, PEGI: ${movie.min_age}, Différence: ${diff}`);
              return diff >= 0; // Afficher si la limite est respectée
          });
      }

      if (movies.length > 0) {
          html += MovieCategory.format(category.name, movies);
      } else {
          console.log(`Aucun film trouvé pour la catégorie ${category.name} et l'âge ${profileAge}`);
      }
  }

  return html;
};



export { MovieCategory };
