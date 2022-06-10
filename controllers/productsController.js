const fs = require('fs');
const path = require('path');
const categories = require('../data/categories');
const products = require('../data/products.json');

module.exports = {
    products : (req,res) => {
      const mates = products.filter(product => product.category === 1);
      const termos = products.filter(product => product.category === 2);
      const kits = products.filter(product => product.category === 3);
        return res.render('products', {
          mates,
          termos,
          kits
        })
      },

      add : (req,res) => {
        return res.render('productAdd', {
          categories
        })
      },
      store : (req,res) => {
        let {name, price, category} = req.body;
        let lastID = products[products.length -1].id;
        let newProduct = {
          id : +lastID + 1,
          name : name.trim(),
          price : +price,
          category : +category,
          description : description.trim(),
          image : image
        }
        
        products.push(newProduct)

        fs.writeFileSync(path.resolve(__dirname,'..','data','products.json'),JSON.stringify(products,null,3),'utf-8')
        return res.redirect('/')
      },

      edit : (req,res) => {
        const {id} =req.params;
        const product = products.find(product => product.id === +id);
  
        return res.render('productEdit', {
          categories,
          product
        })
      },
    detail : (req,res) => {
      const {idProduct} = req.params 
    /**ese id va a volver a la vista como valor de la propiedad imagen */
     
    const product = products.find(product => product.id === +idProduct);
    return res.render('detail', {
        /**voy a renderizar la vista y le doy esa informacion */
       product

      })
    },
    getByCategory : (req,res) => {

      const {idCategory} = req.params;

      const {name, products} = categories.find(category => category.id === +idCategory) 
      /**se pone + porque es string */
      
      return res.render('categories', {
        name,
        products
        /**mando el objeto*/
      })
    }
      
  }
  
   

