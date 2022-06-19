const bcryptjs = require('bcryptjs');
const {body} = require('express-validator');
const users = require('../data/users.json');

module.exports = [
    
    body('email')
        .notEmpty().withMessage('Debes ingresar tu email').bail()
        .isEmail().withMessage('Email no válido'),

    body('password')
        .notEmpty().withMessage('Debes ingresar tu contraseña').bail()
        .custom((value, {req}) => {
            const user = users.find(user => user.email === req.body.email);
            if(!user){
                return false
            }else {
                if(!bcryptjs.compareSync(value,user.password)){
                    return false
                }
            }
            return true
        }).withMessage('El mail o la contraseña es incorrecto'),
]