# Groupomania #

Projet 7 du parcours **Développeur web** d'OpenClassrooms

### Prérequis ###

Vous devez avoir Node et *npm* installés localement sur votre machine (avec le plug-in *node-sass*), ainsi que MySQL.

### Installation ###

Clonez ce repository.  
Pour démarrer le serveur, placez-vous dans le dossier *backend* du projet puis exécutez la commande `node server`.  
Ensuite, depuis le dossier *frontend* du projet, utilisez la commande `npm run serve`. Rendez-vous ensuite à l'adresse `http://localhost:8080/` pour avoir accès à l'application.

Pour utiliser la base de donnée pré-enregistrée, vous devez préalablement créer une base de donnée dans MySQL nommée *groupomania* à l'aide de la commande `CREATE DATABASE groupomania`.  
Vous devrez également créer un nouvel utilisateur avec la commande suivante :  
`CREATE USER 'user'@'localhost' IDENTIFIED BY 'A476bJwy';`  
`GRANT ALL PRIVILEGES ON groupomania.* TO 'user'@'localhost';`  
Une fois dans la base de donnée, utilisez la commande `SOURCE {path}/groupomania_sauvegarde.sql`.s

### Utilisation ###

Pour utiliser l'application en tant qu'administrateur, connectez-vous avec le pseudo *b.frangier* et avec le mdp *Admin1234*.  
Pour vous connecter en tant qu'utilisateur de base, connectez-vous avec n'importe lequel des autres pseudos présents dans la BDD et avec le mdp *User1234*. Vous pouvez également créer un nouvel utilisateur à l'aide du formulaire d'inscription.
