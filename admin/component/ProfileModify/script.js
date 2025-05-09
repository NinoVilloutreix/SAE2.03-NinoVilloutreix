let templateFile = await fetch('./component/ProfileModify/template.html');
let template = await templateFile.text();


let ProfileModify = {};

ProfileModify.format = function (profiles, handlerMod) {
    let html = template;
    let options = "";
    for (let i = 0; i < profiles.length; i++) {
        const p = profiles[i];
        options += `<option value="${p.id}" data-name="${p.name}" data-avatar="${p.avatar}" data-age="${p.min_age}">${p.name}</option>`;
    }

    html = html.replace("{{options}}", options);
    html = html.replace("{{handlerMod}}", handlerMod);
    return html;
};

// Initialise les champs et les événements du formulaire
ProfileModify.init = function () {
  const select = document.getElementById("profile-select");
  const idField = document.getElementById("profile-id");
  const nameField = document.getElementById("profile-modify-name");
const avatarField = document.getElementById("profile-modify-avatar");
const minAgeField = document.getElementById("profile-modify-min-age");
  console.log(select, nameField, avatarField, minAgeField);

  // Remplit les champs en fonction du profil sélectionné
  select.addEventListener("change", (event) => {
      const selectedOption = event.target.selectedOptions[0];
      console.log("Valeur data-age sélectionnée :", selectedOption.dataset.age);
      if (selectedOption) {
          idField.value = selectedOption.value || "";
          nameField.value = selectedOption.dataset.name || "";
          avatarField.value = selectedOption.dataset.avatar || "";
          minAgeField.value = selectedOption.dataset.min_age ? selectedOption.dataset.min_age : "";
      }
  });
};

export {ProfileModify};