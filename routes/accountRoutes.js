const express = require('express');
const router = express.Router();

// Page de rechargement de compte
router.get('/reload', (req, res) => {
  res.render('reload');
});

module.exports = router;
