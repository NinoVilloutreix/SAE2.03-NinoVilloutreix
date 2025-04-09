<?php

/** ARCHITECTURE PHP SERVEUR  : Rôle du fichier controller.php
 * 
 *  Dans ce fichier, on va définir les fonctions de contrôle qui vont traiter les requêtes HTTP.
 *  Les requêtes HTTP sont interprétées selon la valeur du paramètre 'todo' de la requête (voir script.php)
 *  Pour chaque valeur différente, on déclarera une fonction de contrôle différente.
 * 
 *  Les fonctions de contrôle vont éventuellement lire les paramètres additionnels de la requête, 
 *  les vérifier, puis appeler les fonctions du modèle (model.php) pour effectuer les opérations
 *  nécessaires sur la base de données.
 *  
 *  Si la fonction échoue à traiter la requête, elle retourne false (mauvais paramètres, erreur de connexion à la BDD, etc.)
 *  Sinon elle retourne le résultat de l'opération (des données ou un message) à includre dans la réponse HTTP.
 */

/** Inclusion du fichier model.php
 *  Pour pouvoir utiliser les fonctions qui y sont déclarées et qui permettent
 *  de faire des opérations sur les données stockées en base de données.
 */
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



function getMovieCategoryController(){
  // Récupération des paramètres de la requête
  $id = $_REQUEST["id"];
  $movies = getMovieCategory($id);

  if ($movies !=0) {
      return $movies ;
  }
  else{
     return "Nous n'avons pas pu récupérer les films de la catégorie $category!";
  };
} 


// function addProfile(){

//   $name = $_REQUEST['nom'];
//   $real = $_REQUEST['image'];
//   $annee = $_REQUEST['age'];

//   if (empty($nom) || empty($image) || empty($age)) {
//     return "Erreur : Tous les champs doivent être remplis.";
//   }

  
//   $ok = addMovie($nom, $image, $age);
  
//   if ($ok!=0){
//     return "Le film $name a été correctement intégré au catalogue :D";
//   }
//   else{
//     return "Veuillez entrer des valeurs correctes dans les champs!";
//   }
// }