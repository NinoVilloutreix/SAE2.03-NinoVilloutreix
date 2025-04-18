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
define("DBNAME", "root");
define("DBLOGIN", "usersae203");
define("DBPWD", "kaku");

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


function addProfile($id, $name, $avatar, $min_age) {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);

    // Modification pour utiliser "UPDATE" au lieu de "REPLACE" quand `id` est fourni
    if ($id) {
        $sql = "UPDATE Profile SET name = :name, avatar = :avatar, min_age = :min_age WHERE id = :id";
        $stmt = $cnx->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
    } else {
        $sql = "INSERT INTO Profile (name, avatar, min_age) VALUES (:name, :avatar, :min_age)";
        $stmt = $cnx->prepare($sql);
    }

    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':avatar', $avatar);
    $stmt->bindParam(':min_age', $min_age);

    $stmt->execute();
    return $stmt->rowCount();
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







function addFavoris($id_movie, $id_profile) {
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL d'insertion dans la table Favoris
    $sql = "INSERT INTO Favoris (id_movie, id_profile) 
            VALUES (:id_movie, :id_profile)";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':id_movie', $id_movie, PDO::PARAM_INT);
    $stmt->bindParam(':id_profile', $id_profile, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->rowCount();
}


function delFavoris($id_movie, $id_profile) {
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour la suppression
    $sql = "DELETE FROM Favoris 
            WHERE id_movie = :id_movie 
            AND id_profile = :id_profile";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':id_movie', $id_movie, PDO::PARAM_INT);
    $stmt->bindParam(':id_profile', $id_profile, PDO::PARAM_INT);
    $stmt->execute();
    return $stmt->rowCount();
}




function getFavoris($id_profile) {
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
    // Requête SQL corrigée avec le bon paramètre
    $sql = "SELECT Movie.id, Movie.name, Movie.image, Category.name AS category
          FROM Favoris
          JOIN Movie ON Favoris.id_movie = Movie.id
          LEFT JOIN Category ON Movie.id_category = Category.id
          WHERE Favoris.id_profile = :id_profile"; // Utilisation cohérente de :id_profile
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':id_profile', $id_profile, PDO::PARAM_INT); // Correspondance avec la requête SQL
    $stmt->execute();
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);

    return $res;
}

function getFeatured() {
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT id, name, image, description 
            FROM Movie 
            WHERE featured = TRUE";
    $stmt = $cnx->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function searchMovies($query) {
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);

    $sql = "SELECT Movie.* 
            FROM Movie
            LEFT JOIN Category ON Movie.id_category = Category.id
            WHERE Movie.name LIKE :query 
               OR Category.name LIKE :query 
               OR CAST(Movie.year AS CHAR) LIKE :query";

    $stmt = $cnx->prepare($sql);
    $stmt->execute(['query' => "%$query%"]);

    $results = $stmt->fetchAll(PDO::FETCH_OBJ);
    if (!$results) {
        error_log("Aucun résultat trouvé pour la recherche : $query.");
    }
    return $results;
}
