<?php


require("model.php");


function getMovieController(){
    return getMovie();
  }


function addMovieController(){

  $name = $_REQUEST['name'];
  $real = $_REQUEST['director'];
  $annee = $_REQUEST['year'];
  $length = $_REQUEST['length'];
  $description = $_REQUEST['description'];
  $categorie = $_REQUEST['id_category'];
  $image = $_REQUEST['image'];
  $trailer = $_REQUEST['trailer'];
  $pegi = $_REQUEST['min_age'];

  if (empty($name) || empty($real) || empty($annee) || empty($length) || empty($description) || empty($categorie) || empty($image) || empty($trailer) || empty($pegi)) {
    return "Erreur : Tous les champs doivent être remplis.";
  }

  
  $ok = addMovie($name, $real, $annee, $length, $description, $categorie, $image, $trailer, $pegi);
  
  if ($ok!=0){
    return "Le film $name a été correctement intégré au catalogue :D";
  }
  else{
    return "Veuillez entrer des valeurs correctes dans les champs!";
  }
}

// director, year, id_category, min_age
// name, length, description, image, trailer
function detailMovieController() {

  $id = $_REQUEST['id'];
  return detailMovie($id);
}



function getCategoryController() {
  // Récupération des catégories
  $categories = getCategory();
  if ($categories !=0) {
      return $categories;
  }
  else{
      return "Nous n'avons pas pu récupérer les films de la catégorie $category !";
   };
}



function getMovieCategoryController() {
        $id = $_REQUEST['id'];
        $date = isset($_REQUEST['date']) ? $_REQUEST['date'] : null; // Vérifiez si 'date' est défini
        
        $movies = getMovieCategory($id, $date);
        
        if ($movies != 0) {
            return $movies;
        } else {
            return "La catégorie de ces films n'a pas été récupérée";
        }
    }

function addProfileController() {
  try {
      if (empty($_REQUEST['id'])) {
          return "Erreur : L'id est obligatoire.";
      }

      if (empty($_REQUEST['name'])) {
          return "Erreur : Le nom est obligatoire.";
      }
      
      if (empty($_REQUEST['min_age'])) {
          return "Erreur : L'age est obligatoire.";
      }

      $id = $_REQUEST['id'];
      $name = $_REQUEST['name'];
      $avatar = $_REQUEST['avatar'];
      $min_age = !empty($_REQUEST['min_age']) ? $_REQUEST['min_age'] : null;

      
error_log("Données reçues pour le profil : " . print_r($_REQUEST, true));

      $ok = addProfile($id, $name, $avatar, $min_age);
      return $ok ? "Le profil $name ajouté ou modifié avec succès" : "Erreur lors de l'ajout du profil";
  } catch (Exception $e) {
      return "Erreur: " . $e->getMessage();
  }
}

// function addProfileController() {
    
//   $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : null;
//  $name = $_REQUEST['name'];
//   $avatar = $_REQUEST['avatar'];
//   $min_age = $_REQUEST['min_age'];

//   // Appel de la fonction addProfile déclarée dans model.php
//   $ok = addProfile($id, $name, $avatar, $min_age);

//   if ($ok != 0) {
//       return "$name a été ajouté ou remplacé avec succès";
//   } else {
//       return "Le profil n'a pas pu être ajouté ou remplacé";
//   }
// }













function readProfileController(){
      if (!isset($_REQUEST['id'])) {
    $profiles = readProfile(); 
  }
  else{
    $id = $_REQUEST['id'];
    $profiles = readOneProfile($id); // Appel de la fonction getProfile
  }
 
    return $profiles;
}



// function modifyProfileController() {
//   $id = $_REQUEST['id'];
//   $name = $_REQUEST['name'];
//   $avatar = $_REQUEST['avatar'];
//   $min_age = $_REQUEST['min_age'];
  
//   $profile = modifyProfile($id, $name, $avatar, $min_age);
//   $profileNew = addProfile($id, $name, $avatar, $min_age);
  
//   if ($profile != 0) {
//       return $profile;
//   } else {
//     return [
//       "message" => "Le profil $name n'existe pas, nous l'avons donc créé pour vous \(°▽°)/ ",
//       "profile" => $profileNew
//     ];
//   }
// }




// CA A MARCHÉ https://mmi.unilim.fr/~villoutreix8/SAE2.03-NinoVilloutreix/server/script.php?todo=addProfile&id=6&name=1&avatar=1&min_age=1