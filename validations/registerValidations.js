const db = require("../database/models");
const { body } = require("express-validator");

module.exports = [
  body("name")
    .isLength({ min: 4 })
    .withMessage("Como mínimo cuatro letras")
    .bail()
    .isAlpha()
    .withMessage("Solo letras están permitidas"),
  body("email")
    .notEmpty()
    .withMessage("Debes ingresar tu email")
    .bail()
    .isEmail()
    .withMessage("Email no válido")
    .custom((value) => {
      return db.User.findOne({
        where: {
          email: value,
        },
      })
        .then((user) => {
          if (user) {
            return Promise.reject();
          }
        })
        .catch(() => Promise.reject("Este email ya se encuentra registrado!"));
    }),
  body("password")
    .isLength({ min: 6, max: 12 })
    .withMessage("Debe contener entre 6 y 12 caracteres"),
  body("password2")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        return false;
      }
      return true;
    })
    .withMessage("Las contraseñas no coinciden!!"),
];
