#transfermoney

TransferMoney est une application web permettant de transférer de l'argent en ligne de manière simple et sécurisée. Elle est développée avec Node.js, Express, et MongoDB pour la gestion des utilisateurs et des transactions.

## Installation

1. Assurez-vous d'avoir Node.js et MongoDB installés sur votre machine.

2. Clonez ce dépôt GitHub sur votre machine locale :

   git clone https://github.com/Pithusval/TransferMoney.git

3. Accédez au répertoire du projet :

   cd TransferMoney

4. Installez les dépendances du projet :

   npm install

5. Créez un fichier .env à la racine du projet avec la variable d'environnement pour l'URI de votre base de données MongoDB :

MONGODB_URI=your_mongodb_uri


6. Démarrez l'application :

   npm start

7. Ouvrez votre navigateur et accédez à `http://localhost:3000` pour utiliser l'application.

## Fonctionnalités

- Inscription et connexion des utilisateurs.
- Transfert d'argent.
- Affichage de l'historique des transactions.
- Solde du compte utilisateur visible sur toutes les pages.

## Routes

- `/` : Page d'accueil pour les utilisateurs non connectés.
- `/signup` : Page d'inscription pour les nouveaux utilisateurs.
- `/login` : Page de connexion pour les utilisateurs enregistrés.
- `/transactions` : Page pour effectuer des transferts d'argent (accessible uniquement aux utilisateurs authentifiés).
- `/dashboard` : Tableau de bord affichant l'historique des transactions (accessible uniquement aux utilisateurs authentifiés).
- `/logout` : Déconnexion de l'utilisateur.

## Technologies utilisées

- Node.js
- Express.js
- MongoDB avec Mongoose
- Bcrypt pour le hachage des mots de passe
- Express-session pour la gestion des sessions utilisateur
