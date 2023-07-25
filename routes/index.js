const express = require('express');
const router = express.Router();


const userRoutes = require('./userRoutes');

// Utilisation des routes de chaque entité
router.use('/', userRoutes);
//router.use('/accounts', accountRoutes);
//router.use('/transactions', transactionRoutes);
//router.use('/dashboard', dashboardRoutes)

module.exports = router;
