
// URL où se trouve le répertoire "server" sur mmi.unilim.fr
let HOST_URL = "../";//"http://mmi.unilim.fr/~????"; // CHANGE THIS TO MATCH YOUR CONFIG

let DataProfile = {};


DataProfile.read = async function () {
    let answer = await fetch(HOST_URL + "/server/script.php?todo=readProfile");
    
    let Profiles = await answer.json();
    return Profiles;
  };
  
  
DataProfile.readOne = async function (id) {
    let answer = await fetch(HOST_URL + "/server/script.php?todo=readProfile&id=" + id);
    
    let res = await answer.json();
    return res;
  };

DataProfile.getFavoris = async function (id_profile) {
    let answer = await fetch(HOST_URL + `/SAE2.03-MMI-REICHMALO/server/script.php?todo=getFavoris&id_profile=${id_profile}`);
    let data = await answer.json();
    return data;
  }







  
export { DataProfile };
