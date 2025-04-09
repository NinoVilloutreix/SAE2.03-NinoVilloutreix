
let templateFile = await fetch('./component/Profile/template.html');
let template = await templateFile.text();


let Profile = {};

Profile.format = function(profiles, handlerProfile) {
  let html = template;

  if (!Array.isArray(profiles)) {
    console.error("Profile.format: 'profiles' n'est pas un tableau :", profiles);
    profiles = [];
  }

  let options = "";
  for (let i = 0; i < profiles.length; i++) {
    const p = profiles[i];

    // Validation des propriétés du profil
    if (!p.id || !p.nom || !p.image || typeof p.age === "undefined") {
      console.warn("Profile.format: Profil invalide détecté :", p);
      continue; // Ignore les profils invalides
    }

    options += `<option value="${p.id}" data-name="${p.nom}" data-avatar="${p.image}" data-age="${p.age}">${p.nom}</option>`;
  }

  // Si aucune option valide n'est générée, afficher un message par défaut
  if (!options) {
    options = `<option disabled>Aucun profil disponible</option>`;
  }

  // Remplacement des placeholders dans le template
  html = html.replace("{{options}}", options);
  html = html.replace("{{handlerProfile}}", handlerProfile || "");

  return html;
};


Profile.init = function () {
    const select = document.getElementById("profile-select");
    const nameField = document.getElementById("profile-name");
    const avatarField = document.getElementById("profile-avatar");
    const minAgeField = document.getElementById("profile-min-age");
  
    select.addEventListener("change", (event) => {
      const selectedOption = event.target.selectedOptions[0];
      if (selectedOption) {
        nameField.value = selectedOption.dataset.name || "";
        avatarField.value = selectedOption.dataset.avatar || "";
        minAgeField.value = selectedOption.dataset.age || "";
      }
    });
  };

export {Profile};