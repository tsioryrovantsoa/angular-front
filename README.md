# Introduction

Ce dépôt contient le code frontend du projet Assignments. Il fournit une interface utilisateur pour interagir avec les Assignments, incluant des fonctionnalités de login, affichage et gestion des Assignments.

# # Contributions

# 1-Gestion des Utilisateurs

Amelioration des pages de login

Authentification à l'aide de JSON Web Tokens (JWT) pour une sécurité renforcée.

Gestion des roles en utilisant les Guard afin de limiter les acces a des pages(editer / ajout / noter / supprimer)

Si le token n'est pas éxpiré l'utilisateur va toujours rester sur la page d'accueil a chaque rentrer dans l'application

Si elle est éxpiré elle va directement dans login grace a guard.

![image](https://github.com/tsioryrovantsoa/angular-front/assets/89444875/df3177ba-7580-4405-b2cc-84ec0d8dca0c)


# 2-Interface Utilisateur

Ajout d'une Toolbar et d'une SideBar/Sidenav pour une meilleure présentation.

Utilisation de Material Cards pour afficher les Assignments avec des informations enrichies (titre, date, élève, image de la matière, photo du prof).

Ajout d'un loading spinner pour chaque page afin d'ameliorer la vue du site pendant les chargements des donnees 

Ajout de messages de notification (SnackBar Material) pour chaque page apres chaque actions.

![image](https://github.com/tsioryrovantsoa/angular-front/assets/89444875/a9039374-2e85-4776-bef0-f982abe12207)

![image](https://github.com/tsioryrovantsoa/angular-front/assets/89444875/ecc4fd2e-2a69-44f4-86ec-e16c47efbf52)




# 3- Modèle des Assignments enrichi

Ajout des propriétés suivantes : Auteur (nom ou photo de l'élève), Matière, Note sur 20, et remarques dans la page details assignments.

Affichage conditionnel du bouton noter et les notes pour les assiggnemnts noter et non  noter.

Generation de 1000 assignments.

Ajout / Editer et supression Assignments.

![image](https://github.com/tsioryrovantsoa/angular-front/assets/89444875/a7ba5965-d959-4a52-82eb-77376337d4ed)

![image](https://github.com/tsioryrovantsoa/angular-front/assets/89444875/d15a5668-64ed-4942-9108-8fa1a0437259)

![image](https://github.com/tsioryrovantsoa/angular-front/assets/89444875/e52edc6c-0565-4686-9a04-3fca1e46bc6d)

![image](https://github.com/tsioryrovantsoa/angular-front/assets/89444875/15ad44ac-4390-4468-9367-8b0e09518f9f)


# 4-Fonctionnalités optionnelles faites 

Séparation des Assignments en deux onglets : rendus et non rendus.

![image](https://github.com/tsioryrovantsoa/angular-front/assets/89444875/d840a12e-08db-4454-b62d-c5ea7b03b192)

![image](https://github.com/tsioryrovantsoa/angular-front/assets/89444875/7176df6e-10b4-407d-a853-12c17853a0bd)



Drag and drop pour passer d'un état à l'autre, avec demande de notation.

![image](https://github.com/tsioryrovantsoa/angular-front/assets/89444875/dae155be-712e-4d64-8a90-81a1ef53fa97)

![image](https://github.com/tsioryrovantsoa/angular-front/assets/89444875/9f8afd3f-36b1-4c43-a59d-21982e81c20e)


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



