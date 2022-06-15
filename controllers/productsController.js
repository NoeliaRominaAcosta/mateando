const fs = require('fs');
const path = require('path');
const {
  validationResult
} = require("express-validator");
const categories = require('../data/categories');
const products = require("../data/products.json");

module.exports = {

  products: (req, res) => {

    const mates = products.filter(product => product.category === 1);
    const termos = products.filter(product => product.category === 2);
    const kits = products.filter(product => product.category === 3);
    return res.render('products', {
      mates,
      termos,
      kits
    })
  },

  add: (req, res) => {
    return res.render('productAdd', {
      categories
    })
  },
  store: (req, res) => {
    let errors = validationResult(req)
    if (errors.isEmpty()) {
      const {
        name,
        price,
        category,
        description,
        brand,
        stock
      } = req.body;

      let newProduct = {
        id: products[products.length - 1].id + 1,
        name: name.trim(),
        price: +price,
        category: +category,
        description: description.trim(),
        brand,
        stock,
        image: req.file ? req.file.filename : "default-image.png",
      }

      products.push(newProduct)

      fs.writeFileSync(
        path.resolve(__dirname, "..", "data", "products.json"),
        JSON.stringify(products, null, 3),
        "utf-8"
      );
      return res.redirect('/')
    } else {
      return res.render('productAdd', {
        categories,
        errors: errors.mapped(),
        old: req.body
      })
    }


  },

  edit: (req, res) => {

    const {
      id
    } = req.params;
    const product = products.find(product => product.id === +id);

    return res.render('productEdit', {
      categories,
      product
    })
  },
  detail: (req, res) => {

    const {
      idProduct
    } = req.params
    /**ese id va a volver a la vista como valor de la propiedad imagen */

    const product = products.find(product => product.id === +idProduct);
    return res.render('detail', {
      /**voy a renderizar la vista y le doy esa informacion */

      product

    })
  },
  update: (req, res) => {
    let errors = validationResult(req)
    if (errors.isEmpty()) {
      const {
        id
      } = req.params;
      const {
        name,
        price,
        category,
        description,
        brand,
        stock
      } = req.body;


      const productsUpdated = products.map(product => {
        if (product.id === +id) {
          let productUpdated = {
            ...product,
            name: name.trim(),
            price: +price,
            category: +category,
            description: description.trim(),
            brand: brand.trim(),
            stock: stock.trim(),
            /* If there is a file, then the filename will be the image. If there is no file, then the
            image will be the product.image. */
            image: req.file ? req.file.filename : product.image,
          }
          if (req.file) {
            if (
              fs.existsSync(
                path.resolve(__dirname, "..", "public", "images", product.image)
              ) &&
              product.image !== "default-image.png"
            ) {
              fs.unlinkSync(
                path.resolve(__dirname, "..", "public", "images", product.image)
              );
            }
          }
          return productUpdated
        }
        return product
      })


      fs.writeFileSync(
        path.resolve(__dirname, "..", "data", "products.json"),
        JSON.stringify(productsUpdated, null, 3),
        "utf-8"
      );
      return res.redirect('/products');
    }else {
      return res.render('productEdit',{
        categories,
        product : {
          id :req.params.id,
          ...req.body
      },
      errors : errors.mapped()
    }
      )
    }

  },
  getByCategory: (req, res) => {

    const {
      idCategory
    } = req.params;

    const {
      name,
      products
    } = categories.find(category => category.id === +idCategory)
    /**se pone + porque es string */

    return res.render('categories', {
      name,
      products
      /**mando el objeto*/
    })
  },
  remove: (req, res) => {
    const {
      id
    } = req.params;

    const productFilter = products.filter((product) => product.id !== +id);

    fs.writeFileSync(
      path.resolve(__dirname, "..", "data", "products.json"),
      JSON.stringify(productFilter, null, 3),
      "utf-8"
    );

    return res.redirect("/");
  }

}