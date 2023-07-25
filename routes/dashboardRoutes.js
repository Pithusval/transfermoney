const express = require('express');
const router = express.Router();

// Middleware pour vérifier si l'utilisateur est authentifié
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// Page du tableau de bord (accessible uniquement aux utilisateurs authentifiés)
router.get('/dashboard', isLoggedIn, (req, res) => {
  res.render('dashboard');
});

module.exports = router;
