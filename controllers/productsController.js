const fs = require('fs');
const path = require('path');
const categories = require('../data/categories');

const productsFilePath = path.join(__dirname, '../data/products.json');


const readProducts = () => {
	const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return products
}
const saveProducts = (products) => fs.writeFileSync(productsFilePath, JSON.stringify(products,null,3));
module.exports = {
  
    products : (req,res) => {
      let products = readProducts();
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
        let products = readProducts();

        const {name, price, category, description, brand, stock} = req.body;
       
        let newProduct = {
        	id : products[products.length - 1].id + 1,
          name: name.trim(),
          price : +price,
          category : +category,
          description : description.trim(),
          brand,
          stock,
          image : req.file ? req.file.filename : "default-image.png",
        }
        
        products.push(newProduct)
        saveProducts(products)
        return res.redirect('/')
      },

      edit : (req,res) => {
        let products = readProducts();
        const {id} =req.params;
        const product = products.find(product => product.id === +id);
  
        return res.render('productEdit', {
          categories,
          product
        })
      },
    detail : (req,res) => {
      let products = readProducts();
      const {idProduct} = req.params 
    /**ese id va a volver a la vista como valor de la propiedad imagen */
     
    const product = products.find(product => product.id === +idProduct);
    return res.render('detail', {
        /**voy a renderizar la vista y le doy esa informacion */
      
        product

      })
    },
    update: (req,res) => {
      let products = readProducts();

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
  
   

