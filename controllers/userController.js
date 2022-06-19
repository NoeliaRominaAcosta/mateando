 const path = require('path')
 const bcryptjs = require('bcryptjs')
 const fs = require('fs')
 const users = require('../data/users.json')
 const {validationResult} = require('express-validator')
 
 module.exports = {
    register : (req,res) => res.render('register'),
    processRegister :(req,res) => {
      let errors = validationResult(req)
      if(errors.isEmpty()){
       
        let { name, email, password } = req.body
      
      let lastID = users.length !== 0 ? users[users.length - 1].id : 0;
      let newUser = {
        id: +lastID + 1,
        name: name.trim(),
        email,
        password: bcryptjs.hashSync(password, 10),
        
        rol: "user",
      
      };
   
      users.push(newUser)
      fs.writeFileSync(
        path.resolve(__dirname, "..", "data", "users.json"),
        JSON.stringify(users, null, 3),
        "utf-8"
      );
     
      const { id, rol } = newUser
      req.session.userLogin = {
        id,
        name: name.trim(),
        rol
      }
      res.locals.userLogin = req.session.userLogin
      return res.redirect("/");
      }else{
        return res.render('register', {
          old : req.body,
          errors : errors.mapped()
        })
      }
    },
    login : (req,res) => res.render('login'),
    processLogin : (req,res) => {
      const errors = validationResult(req)
      if(errors.isEmpty()){
      const {id,name,avatar,rol} = users.find(user => user.email === req.body.email)
      req.session.userLogin = {
        id,
        name,
     
        rol
      }
      return res.redirect('/')
    }else {
      return res.render("login", {
        old: req.body,
        errors: errors.mapped(),
      });
    }
  }
} 