const express = require('express');
const router = express.Router();
const {login, register, processRegister, processLogin} = require('../controllers/userController');
const loginValidations = require('../validations/loginValidations');
const registerValidations = require('../validations/registerValidations');


/* /users */
router
    .get('/register', register)
    .get('/login', login)
    .post('/login', loginValidations,processLogin)
    .post('/register', registerValidations, processRegister)

module.exports = router; 
