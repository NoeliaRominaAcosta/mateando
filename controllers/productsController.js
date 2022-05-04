const categories = require('../data/categories');
const products = require('../data/products');

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
      /**name y products de categories */
      return res.render('categories', {
        name,
        products
        /**mando el objeto*/
      })
    }
      
  }
  
   

