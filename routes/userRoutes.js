const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Transaction = require('../models/transaction')

//Page d'accueil
router.get('/', (req, res) => {
    res.render('welcome');
  });

// Page d'inscription
router.get('/signup', (req, res) => {
  res.render('signup');
});

// Page de connexion
router.get('/login', (req, res) => {
  res.render('login');
});


router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà dans la base de données
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // L'utilisateur existe déjà, renvoyer une erreur ou rediriger vers une page d'échec d'inscription
      return res.status(409).send("Un utilisateur avec cet email existe déjà.");
    }

    // Si l'utilisateur n'existe pas, créer un nouvel utilisateur
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Redirection vers la page de connexion après une inscription réussie
    res.redirect('/login');
  } catch (error) {
    // En cas d'erreur, renvoyer une erreur ou rediriger vers une page d'échec d'inscription
    console.error("Erreur lors de l'inscription : ", error);
    res.status(500).send("Une erreur est survenue lors de l'inscription.");
  }
});

router.post('/login', async (req, res) => {
    // Récupération des données du formulaire de connexion
    const { email, password } = req.body;
  
    try {
      // Recherche de l'utilisateur dans la base de données
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).send('Utilisateur non trouvé');
      }
  
      // Comparaison du mot de passe saisi avec le mot de passe haché en base de données
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).send('Mot de passe incorrect');
      }

      req.session.user = user;
      res.redirect('/transactions');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erreur du serveur');
    }
  });

  function isLoggedIn(req, res, next) {
    if (req.session.user) {
      return next();
    }
    res.redirect('/login');
  }
  
  // Page de transaction (accessible uniquement aux utilisateurs authentifiés)
  router.get('/transactions', isLoggedIn, (req, res) => {
    res.render('transaction');
  });

  // Route POST pour gérer la logique de transaction
  router.post('/transactions', isLoggedIn, async (req, res) => {
    const { beneficiaryName, amount } = req.body;
    console.log('Beneficiary:', beneficiaryName);
    console.log('Amount:', amount);
    console.log(Transaction);
    try {
      // Vérifier que les champs sont valides (par exemple, le montant est un nombre positif)
      if (!beneficiaryName || !amount || Number(amount) <= 0) {
        return res.status(400).send('Veuillez fournir un nom de bénéficiaire valide et un montant positif.');
      }
  
      // Créer une nouvelle transaction dans la base de données
      const newTransaction = new Transaction({
        sender: req.session.user._id,
        receiverName: beneficiaryName,
        amount: Number(amount),
      });
      
      await newTransaction.save();
  
      // Répondre avec une confirmation ou rediriger vers une page de succès de la transaction
      res.json({ success: true});  
    } catch (error) {
      console.error(error);
      res.status(500).send('Une erreur est survenue lors de la transaction.');
    }
});


  
// Route GET pour afficher le tableau de bord
router.get('/dashboard', isLoggedIn, async (req, res) => {
    try {
      // Récupérer l'historique des transactions pour l'utilisateur authentifié
      const transactions = await Transaction.find({ sender: req.session.user._id });
  
      // Rendre la page de tableau de bord avec les données des transactions
      res.render('dashboard', { transactions });
    } catch (error) {
      console.error(error);
      res.status(500).send('Une erreur est survenue lors de la récupération des transactions.');
    }
  });
  


// Déconnexion de l'utilisateur
router.get('/logout', (req, res) => {
    // Détruire la session pour déconnecter l'utilisateur
    req.session.destroy(() => {
      res.redirect('/');
    });
  });

module.exports = router;
