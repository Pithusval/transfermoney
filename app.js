const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const app = express();


// Configuration des middlewares
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'f5d7d774sfz6et',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
const indexRoutes = require('./routes/index');


app.use('/', indexRoutes);
//app.use('/accounts', accountRoutes);
//app.use('/dashboard', dashboardRoutes);
//app.use('/transactions', transactionRoutes);
//app.use('/users', userRoutes);

// Connexion à MongoDB
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connecté à MongoDB');
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB', err);
  });

  // Démarrer le serveur
  app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
  });
