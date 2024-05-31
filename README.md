# README pour le Frontend- Projet Assignments - Frontend

# Introduction
Ce dépôt contient le code frontend du projet Assignments. Il fournit une interface utilisateur pour interagir avec les Assignments, incluant des fonctionnalités de login, affichage et gestion des Assignments.

# # Contributions

# 1-Interface Utilisateur

Ajout d'une Toolbar et d'une SideBar/Sidenav pour une meilleure présentation.

Utilisation de Material Cards pour afficher les Assignments avec des informations enrichies (titre, date, élève, image de la matière, photo du prof).

Ajout d'un loading spinner pour chaque page afin d'ameliorer la vue du site pendant les chargements des donnees 

Ajout de messages de notification (SnackBar Material) pour chaque page apres chaque actions.

# 2-Gestion des Utilisateurs

Authentification à l'aide de JSON Web Tokens (JWT) pour une sécurité renforcée.

Gestion des roles en utilisant les Guard afin de limiter les acces a des pages(editer / ajout / noter / supprimer)

Si le token n'est pas éxpiré l'utilisateur va toujours rester sur la page d'accueil a chaque rentrer dans l'application

Si elle est éxpiré elle va directement dans login grace a guard.

# 3- Modèle des Assignments enrichi

Ajout des propriétés suivantes : Auteur (nom ou photo de l'élève), Matière, Note sur 20, et remarques dans la page details assignments.

Affichage conditionnel du bouton noter et les notes pour les assiggnemnts noter et non  noter.

Generation de 1000 assignments.

# 4-Fonctionnalités optionnelles faites 

Séparation des Assignments en deux onglets : rendus et non rendus.

Drag and drop pour passer d'un état à l'autre, avec demande de notation.

# # Vidéo de Démonstration et lien du site

Nous avons réalisé une vidéo illustrant une démo et un point remarquable de notre projet, disponible ici https://www.youtube.com/watch?v=WNi4EX5L8-0

Pour voir le site en live vous pouvez clicquer ici : https://angular-front-n159.onrender.com/

# # Prérequis

Node.js et npm installés sur votre machine

Cloner le dépôt GitHub

Installer les dépendances

> npm install

Lancer le projet

> ng serve

L'application sera accessible sur http://localhost:4200.

LOGIN ET MOT DE PASSE 

>ADMIN

>login : admin

>password : admin

----------

>PROF

>login : tsiory

>password : tsiory

--------

>ELEVE

>login : tony

>login : tony



