const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
//const customerController = require('../controllers/customerController');

// Rutas de autenticación
router.get('/login', authController.login);
router.post('/login', authController.loginPost);
router.get('/register', authController.register);
router.post('/register', authController.registerPost);
router.get('/logout', authController.logout);
//router.get('/customer', authController.logout);

module.exports = router;
