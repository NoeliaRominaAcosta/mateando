const {body} = require('express-validator')
const users = require('../data/users.json')
module.exports = [
    body('name')
    .isLength({min: 4}).withMessage('Como mínimo cuatro letras').bail()
    .isAlpha().withMessage('Solo letras están permitidas'),
body('email')    
    .notEmpty().withMessage('Debes ingresar tu email').bail()
    .isEmail().withMessage('Email no válido')
    .custom((value) => {
        const user = users.find(user => user.email === value);
        if(user){
            return false
        }else{
            return true
        }
    }).withMessage('El email ya está registrado, prueba otro'),
body('password')
    .isLength({min : 6, max : 12}).withMessage('Debe contener entre 6 y 12 caracteres'),
body('password2')
    .custom((value,{req}) => {
        if(value !== req.body.password){
            return false
        }
        return true
    }).withMessage('Las contraseñas no coinciden!!')
]