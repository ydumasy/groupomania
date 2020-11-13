const express = require('express');
const usersCtrl = require('../controllers/users');

// Utilisation d'un router
const router = express.Router();

// Création des routes utilisateur
router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.delete('/', usersCtrl.deleteAccount);

module.exports = router;