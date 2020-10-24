const express = require('express');
const usersCtrl = require('../controllers/users');

const router = express.Router();

router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.delete('/', usersCtrl.deleteAccount);

module.exports = router;