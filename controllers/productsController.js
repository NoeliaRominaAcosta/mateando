module.exports = {
    products : (req,res) => {
        return res.render('products')},
    detail : (req,res) => {
      const {id} = req.params 
/**ese id va a volver a la vista como valor de la propiedad imagen */
      return res.render('detail', {
        /**voy a renderizar la vista y le doy esa informacion */
          imagen : id 
      })
    }
      
  }
  
   

  