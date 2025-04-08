import { Movie } from "../Movie/script.js";
import { DataMovie } from "../../data/dataMovie.js";

let templateFile = await fetch("./component/Moviecategory/template.html");
let template = await templateFile.text();

let MovieCategory = {};

MovieCategory.format = function (category, movies) {
  let html = template;
  html = html.replace("{{category}}", category);

  let HTMLmovies = Movie.formatmany(movies)
  html = html.replace("{{movies}}", HTMLmovies);
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
  return html;
};






export { MovieCategory };
