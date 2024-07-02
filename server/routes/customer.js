const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

//autenticacion
router.get('/login', customerController.login);
router.post('/login', customerController.loginPost);
//router.get('/register', customerController.register);
router.post('/register', customerController.registerPost);

/**
 *  Customer Routes 
*/
router.get('/', customerController.homepage);
router.get('/customers', customerController.customers);
router.get('/about', customerController.about);
router.get('/add', customerController.addCustomer);
router.post('/add', customerController.postCustomer);
router.get('/view/:id', customerController.view);
router.get('/edit/:id', customerController.edit);
router.put('/edit/:id', customerController.editPost);
router.delete('/edit/:id', customerController.deleteCustomer);
router.post('/search', customerController.searchCustomers);

module.exports = router;