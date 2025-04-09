// URL où se trouve le répertoire "server" sur mmi.unilim.fr
let HOST_URL = "https://mmi.unilim.fr/~villoutreix8/SAE2.03-NinoVilloutreix";

let DataProfile = {};

DataProfile.addProfile = async function (fdata) {
  // fetch possède un deuxième paramètre (optionnel) qui est un objet de configuration de la requête HTTP:
  //  - method : la méthode HTTP à utiliser (GET, POST...)
  //  - body : les données à envoyer au serveur (sous forme d'objet FormData ou bien d'une chaîne de caractères, par exempe JSON)

  let config = {
    method: "POST", // méthode HTTP à utiliser
    body: fdata, // données à envoyer sous forme d'objet FormData
  };
  let answer = await fetch(HOST_URL + "/server/script.php?todo=addprofiles", config);
  let data = await answer.json();
  return data;
};

export { DataProfile };