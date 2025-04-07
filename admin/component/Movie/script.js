

let templateFile = await fetch('./component/Movie/template.html');
let template = await templateFile.text();


let Movie = {};







// Movie.autoFill = function (movie) {
//     let inputName = document.querySelector("input[name=name]");
//     inputName.value = movie.name;
//     let inputAnnee = document.querySelector("input[name=annee]");
//     inputAnnee.value = movie.annee;
//     let inputLength = document.querySelector("input[name=length]");
//     inputLength.value = movie.length;
//     let inputDescription = document.querySelector("input[name=description]");
//     inputDescription.value = movie.Description;
//     let inputDirector = document.querySelector("input[name=director]");
//     inputDirector.value = movie.director;
//     let inputCategorie = document.querySelector("input[name=categorie]");
//     inputCategorie.value = movie.categorie;
//     let inputImage = document.querySelector("input[name=image]");
//     inputImage.value = movie.image;
//     let inputTrailer = document.querySelector("input[name=trailer]");
//     inputTrailer.value = movie.trailer;
//     let inputPegi = document.querySelector("input[name=pegi]");
//     inputPegi.value = movie.pegi;
// }



Movie.format = function (handler) {
    let html = template;
    html = html.replace('{{handler}}', handler);
    return html;
};



export { Movie };

