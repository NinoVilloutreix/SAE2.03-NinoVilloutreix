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
  $real = $_REQUEST['real'];
  $annee = $_REQUEST['annee'];
  $length = $_REQUEST['length'];
  $description = $_REQUEST['description'];
  $categorie = $_REQUEST['categorie'];
  $image = $_REQUEST['image'];
  $trailer = $_REQUEST['trailer'];
  $pegi = $_REQUEST['pegi'];
  
  $ok = addMovie($name, $real, $annee, $length, $description, $categorie, $image, $trailer, $pegi);
  
  if ($ok!=0){
    return "Le film '$name' existe déjà dans la base!";
  }
  else{
    return false;
  }
}