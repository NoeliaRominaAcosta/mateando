const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require('../database/models');

module.exports = {
  register: (req, res) => {
    return res.render("register");
  },
  processRegister: (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      let { name, email, password } = req.body;

      db.User.create({
        name: name.trim(),
        email: email.trim(),
        password: bcryptjs.hashSync(password, 10),
        image: 'default-image.png',
        rolId: 2,
      })
        .then((info) => {
              return res.redirect("/users/login");
        })
        .catch(error => console.log(error))
  
    } else {
      return res.render("register", {
        old: req.body,
        errors: errors.mapped(),
      });
    }
  },
  login: (req, res) => {
    return res.render("login");
  },
  processLogin: (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      
      const {email} = req.body

      db.User.findOne({
        where : {
          email
        }
      }).then( ({id,name, rolId}) => {
        req.session.userLogin = {
          id : +id,
          name,
          rol : +rolId
      }
      res.redirect('/')
      })
      
    } else {
      return res.render("login", {
        old: req.body,
        errors: errors.mapped(),
      });
    }
  },
  admin : (req,res) => {
    db.Product.findAll(
      { 
          order : [['id','DESC']],
           include : ['images']
          }
     )
       .then(product => {
           return res.render('admin', {
              product
           })
       })
       .catch(error => console.log(error)) 
   
  },
  logout : (req,res) => {
    req.session.destroy();
    res.cookie('mateando',null,{maxAge : -1})
    res.redirect('/')
  }
};
