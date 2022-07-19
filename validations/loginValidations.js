const bcryptjs = require('bcryptjs');
const {body} = require('express-validator');
const db = require('../database/models');



module.exports = [
    
    body('email')
        .notEmpty().withMessage('Debes ingresar tu email').bail()
        .isEmail().withMessage('Email no válido'),

    body('password')
        .notEmpty().withMessage('Debes ingresar tu contraseña').bail()
        .custom((value, {req}) => {
            return db.User.findOne({
              where : {
                email : req.body.email
              }
            }).then(user => {
              if(!user || !bcryptjs.compareSync(value, user.password)){
                return Promise.reject()
              }
            }).catch(() => Promise.reject('Credenciales inválidas'))
          })
]