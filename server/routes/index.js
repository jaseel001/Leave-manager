var express = require('express');
var router = express.Router();
var register = require('./register.js');
var auth = require('./auth.js');
var products = require('./products.js');
var user = require('./users.js');
var teachers = require('./superadmin.js');

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
router.post('/register', register.signup);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/products', products.getAll);
router.get('/api/v1/product/:id', products.getOne);
router.post('/api/v1/product/', products.create);
router.put('/api/v1/product/:id', products.update);
router.delete('/api/v1/product/:id', products.delete);
router.get('/api/v1/users', user.getAll);

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/superadmin/teachers', teachers.getAll);
router.put('/api/v1/superadmin/approveteacher/:id', teachers.approveTeacher);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);

module.exports = router;