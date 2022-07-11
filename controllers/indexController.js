const db = require('../database/models');
const {Op} = require('sequelize')
module.exports = {
    index : (req,res) => {
        return res.render('index')
    },
    
    explora : (req,res) => {
       
        let oferta = db.Product.findAll({
            where: {
                discount : {
					[Op.gt] : 10
				}
            },
            limit : 8,
            include: ["images"],
           
          });
          let vendidos = db.Product.findAll({
            where : {
                sales: {
                    [Op.gt] : 25 //gt es > , gte es ===
                }
            },
               limit : 8,
            include: ["images"],
           
          });
         
          Promise.all([oferta,vendidos])
            .then(([oferta,vendidos]) => {
              return res.render("explora", {
               oferta,
               vendidos
              });
            })
            .catch((error) => console.log(error));
       
    }
}

