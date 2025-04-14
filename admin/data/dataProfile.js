// URL où se trouve le répertoire "server" sur mmi.unilim.fr
let HOST_URL = "https://mmi.unilim.fr/~villoutreix8/SAE2.03-NinoVilloutreix";



let DataProfile = {};


DataProfile.addProfile = async function (fdata) {

  let config = {
    method: "POST",
    body: fdata,
  };
  let answer = await fetch(HOST_URL + "/server/script.php?todo=addProfile", config);
  let data = await answer.json();
  return data;
};



DataProfile.getProfiles = async function () {
  let answer = await fetch(HOST_URL + "/server/script.php?todo=readProfile");
  let data = await answer.json();
  return data;
};

export { DataProfile };