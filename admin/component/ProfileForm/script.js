let templateFile = await fetch('./component/ProfileForm/template.html');
let template = await templateFile.text();


let ProfileForm = {};

ProfileForm.format = function(profiles, handler) {
  let html = template;

  if (!Array.isArray(profiles)) {
    console.error("ProfileForm.format: 'profiles' n'est pas un tableau :", profiles);
    profiles = [];
  }

  let options = "";
  for (let i = 0; i < profiles.length; i++) {
    const p = profiles[i];

    // Validation des propriétés du profil
    if (!p.id || !p.name || !p.avatar || typeof p.min_age === "undefined") {
      console.warn("ProfileForm.format: Profil invalide détecté :", p);
      continue; // Ignore les profils invalides
    }

    options += `<option value="${p.id}" data-name="${p.name}" data-avatar="${p.avatar}" data-age="${p.min_age}">${p.name}</option>`;
  }

  // Si aucune option valide n'est générée, afficher un message par défaut
  if (!options) {
    options = `<option disabled>Aucun profil disponible</option>`;
  }

  // Remplacement des placeholders dans le template
  html = html.replace("{{options}}", options);
  html = html.replace("{{handler}}", handler || "");

  return html;
};


ProfileForm.init = function () {
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

export {ProfileForm};