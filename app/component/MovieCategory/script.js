import { Movie } from "../Movie/script.js";
import { DataMovie } from '../../data/dataMovie.js';

// console.log("Fetching template from:", "./component/Moviecategory/template.html"); De la douce époque où ça marchait trop pas
let templateFile = await fetch("./component/MovieCategory/template.html");
let template = await templateFile.text();

let MovieCategory = {};

MovieCategory.format = function (categoryname, movies) {
  let html = template;
  console.log("Formatting category:", categoryname, "with movies:", movies); // Vérifiez les données
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


MovieCategory.formatMany = async function (category) {
  let html = "";
  for (const obj of category) {
      const movies = await DataMovie.getMovieCategory(obj.id);
      if (movies.length === 0) {
          continue;
      }
      html += MovieCategory.format(obj.name, movies);
  }
  console.log("Final HTML:", html); // Vérifiez le HTML généré
  return html;
};

export { MovieCategory };
