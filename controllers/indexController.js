const db = require('../database/models');
const {Op} = require('sequelize')
module.exports = {
    index : (req,res) => {
        return res.render('index')
    },
    
    explora : (req,res) => {
        return res.render('explora')
    }
}