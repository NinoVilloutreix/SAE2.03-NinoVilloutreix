<?php
/**
 * Ce fichier contient toutes les fonctions qui réalisent des opérations
 * sur la base de données, telles que les requêtes SQL pour insérer, 
 * mettre à jour, supprimer ou récupérer des données.
 */

/**
 * Définition des constantes de connexion à la base de données.
 *
 * HOST : Nom d'hôte du serveur de base de données, ici "localhost".
 * DBNAME : Nom de la base de données
 * DBLOGIN : Nom d'utilisateur pour se connecter à la base de données.
 * DBPWD : Mot de passe pour se connecter à la base de données.
 */
define("HOST", "localhost");
define("DBNAME", "villoutreix8");
define("DBLOGIN", "villoutreix8");
define("DBPWD", "villoutreix8");

/**
 * Récupère le menu pour un jour spécifique dans la base de données.
 *
 * 
 */

function getMovie(){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer le menu avec des paramètres
    $sql = "SELECT id, name, image, id_category FROM Movie";
    // $sql = "SELECT Movie.id, Movie.name, image, id_category FROM Movie JOIN Category ON Movie.id_category = Category.id ORDER BY id_category, name;";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; 
}

function addMovie($name, $real, $annee, $length, $description, $categorie, $image, $trailer, $pegi){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD); 
    // Requête SQL de mise à jour du menu avec des paramètres
    $sql = "INSERT INTO Movie(name, director, year, length, description, id_category, image, trailer, min_age)
            VALUES (:name, :real, :annee, :length, :description, :categorie, :image, :trailer, :pegi)";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Lie les paramètres aux valeurs

    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':real', $real);
    $stmt->bindParam(':annee', $annee);
    $stmt->bindParam(':length', $length);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':categorie', $categorie);
    $stmt->bindParam(':image', $image);
    $stmt->bindParam(':trailer', $trailer);
    $stmt->bindParam(':pegi', $pegi);

    // Exécute la requête SQL
    $stmt->execute();
    // Récupère le nombre de lignes affectées par la requête
    $res = $stmt->rowCount(); 
    return $res; // Retourne le nombre de lignes affectées
}

function detailMovie($id) {
    try {
       
        $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);


       
        $sql = "SELECT
                    Movie.id,
                    Movie.name,
                    Movie.director,
                    Movie.year,
                    Movie.length,
                    Movie.description,
                    Movie.image,
                    Movie.trailer,
                    Movie.min_age,
                    Movie.id_category,
                    Category.name AS category
                FROM Movie
                JOIN Category ON Movie.id_category = Category.id
                WHERE Movie.id = :id";


        $stmt = $cnx->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();


       
        $res = $stmt->fetch(PDO::FETCH_OBJ);


        return $res;
    } catch (Exception $e) {
        error_log("Erreur SQL : " . $e->getMessage()); // Log dans les erreurs PHP
        return false;
    }
}

function getCategory(){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT id, name FROM Category";
    $stmt = $cnx->prepare($sql);
    $stmt->execute();



    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; 
}

function getMovieCategory($category, $date = null) {
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);

    if ($date === null) {
        $sql = "SELECT Movie.*, Category.name AS category 
                FROM Movie 
                JOIN Category ON Movie.id_category = Category.id 
                WHERE Category.id = :category";
    } else {
        $sql = "SELECT Movie.*, Category.name AS category 
                FROM Movie 
                JOIN Category ON Movie.id_category = Category.id 
                WHERE Category.id = :category AND Movie.min_age <= :date";
    }

    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':category', $category, PDO::PARAM_INT);
    if ($date !== null) {
        $stmt->bindParam(':date', $date, PDO::PARAM_INT);
    }

    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);
}











function addProfile($name, $avatar, $min_age) {
    try {
        $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);
        error_log("Connexion à la base réussie");

        $sql = "INSERT INTO Profile(name, avatar, min_age) VALUES (:name, :avatar, :min_age)";
        $stmt = $cnx->prepare($sql);

        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':avatar', $avatar);
        $stmt->bindParam(':min_age', $min_age);

        $stmt->execute();
        error_log("Insertion réussie");
        return $stmt->rowCount();

    } catch (Exception $e) {
        error_log("Erreur dans addProfile : " . $e->getMessage());
        return 0;
    }
}




function readProfile() {
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer le menu avec des paramètres
    $sql = "SELECT id, name, avatar, min_age from Profile";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
}

function readOneProfile($id) {
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer le menu avec des paramètres
    $sql = "select * from Profile where id = :id";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    
    $stmt->bindParam(':id', $id);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
}

// if ($_REQUEST['todo'] === 'addprofile') {
//     error_log("Requête reçue pour addprofile"); // Vérifiez que la requête arrive ici
//     error_log(print_r($_POST, true)); // Affichez les données reçues
// }