
// URL où se trouve le répertoire "server" sur mmi.unilim.fr
let HOST_URL = "../";//"http://mmi.unilim.fr/~????"; // CHANGE THIS TO MATCH YOUR CONFIG

let DataMovie = {};

DataMovie.getMovie = async function(){
    let answer = await fetch(HOST_URL + "/server/script.php?todo=readmovies");
    let data = await answer.json();
    console.log("Movies data:", data); // Vérifiez si les IDs sont présents
    return data;
};

// console.log("Movie ID passed to detailMovie:", movieId);


DataMovie.detailMovie = async function (id) {
    console.log("Movie ID:", id);
    let url = HOST_URL + "/server/script.php?todo=detailmovies&id=" + id;
    console.log("Fetching URL:", url); // Vérifiez l'URL générée
    let answer = await fetch(url);
    let data = await answer.json();
    return data;
};

/* C'EST QUOI async/await ?
    
   Il y a des instructions qui prennent du temps sans qu'on puisse prédire combien.
   fetch (et answer.json() ) en font partie.
   Il n'est en effet pas possible de savoir combien de temps le serveur prendra à nous répondre.
   Peut-être même qu'il est en panne et ne répondra pas du tout !
   Le mot clé await permet de dire à javascript qu'il faut ATTENDRE la réponse du serveur avant de 
   poursuivre l'exécution du code (sinon on va vouloir lire les données avant de les avoir reçues).
   Et pour pouvoir utiliser await, il faut ajouter le mot clé async à la fonction.

*/

DataMovie.getCategory = async function () {
    let answer = await fetch(HOST_URL + "/server/script.php?todo=readcategories" );
    let data = await answer.json();
    return data;
};

DataMovie.getMovieCategory = async function (idcategory, profileAge = null) {
    let url = `${HOST_URL}/server/script.php?todo=readmoviecategories&id=${idcategory}`;
    if (profileAge !== null) {
        url += `&min_age=${profileAge}`;
    }
    // console.log("Fetching URL:", url);

    let answer = await fetch(url);
    let data = await answer.json();
    return data;
};

DataMovie.addFavoris = async function (id_movie, id_profile) {
    let config = {
        method: "POST",
    };
    let answer = await fetch(`${HOST_URL}/server/script.php?todo=addFavoris&id_movie=${id_movie}&id_profile=${id_profile}`, config);
    let data = await answer.json();
    return data;
}

DataMovie.delFavoris = async function (id_profile, id_movie) {
    let config = {
        method: "POST",
    };
    let answer = await fetch(`${HOST_URL}/server/script.php?todo=delFavoris&id_profile=${id_profile}&id_movie=${id_movie}`, config);
    let data = await answer.json();
    return data;
}

DataMovie.getFavoris = async function (id_profile) {
    let response = await fetch(
      `${HOST_URL}/server/script.php?todo=getFavoris&id_profile=${id_profile}`
    );
    let data = await response.json();
    return data;
  };


export {DataMovie};


