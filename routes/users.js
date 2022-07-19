const express = require('express');
const router = express.Router();
const {login, register, processRegister, processLogin, admin, logout} = require('../controllers/userController');
const loginValidations = require('../validations/loginValidations');
const registerValidations = require('../validations/registerValidations');


/* /users */
router
    .get('/register', register)
    .get('/login', login)
    .post('/login', loginValidations,processLogin)
    .post('/register', registerValidations, processRegister)
    .get('/admin',admin)
    .get('/logout', logout)
module.exports = router; 
