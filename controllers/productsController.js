const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const { Op } = require("sequelize");

module.exports = {
  products: (req, res) => {
    let mates = db.Product.findAll({
      where: {
        categoryId: 1,
      },
      include: ["images"],
      order : [['id','ASC']],
    });
    let termos = db.Product.findAll({
      where: {
        categoryId: 2,
      },
      include: ["images"],
      order : [['id','ASC']],
    });
    let kits = db.Product.findAll({
      where: {
        categoryId: 3,
      },
      include: ["images"],
      order : [['id','ASC']],
    });
    Promise.all([mates, termos, kits])
      .then(([mates, termos, kits]) => {
        return res.render("products", {
          mates,
          termos,
          kits,
          user: req.session.userLogin,
        });
      })
      .catch((error) => console.log(error));
  },

  add: (req, res) => {
    db.Category.findAll()
      .then((categories) => {
        return res.render("productAdd", {
          categories,
          user: req.session.userLogin,
        });
      })
      .catch((error) => console.log(error));
  },
  store: (req, res) => {
    const { name, price, categoryId, description, brand, stock } = req.body;

    db.Product.create({
      name: name.trim(),
      price: +price,
      categoryId,
      description: description.trim(),
      brand,
      stock,
    })
      .then((product) => {
        if (req.files.length > 0) {
          let images = req.files.map(({ filename }, i) => {
            let image = {
              file: filename,
              productId: product.id,
            };
            return image;
          });
          /* Creating a new image in the database. */
          db.Image.bulkCreate(images, { validate: true }).then((result) =>
            console.log(result)
          );
        }
        return res.redirect("/products");
      })
      .catch((error) => console.log(error));
  },

  edit: (req, res) => {
    const { id } = req.params;
    const product = products.find((product) => product.id === +id);

    return res.render("productEdit", {
      categories,
      product,
      user: req.session.userLogin,
    });
  },
  detail: (req, res) => {
    const { idProduct } = req.params;
    /**ese id va a volver a la vista como valor de la propiedad imagen */

    const product = products.find((product) => product.id === +idProduct);
    return res.render("detail", {
      /**voy a renderizar la vista y le doy esa informacion */

      product,
      user: req.session.userLogin,
    });
  },
  update: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const { id } = req.params;
      const { name, price, category, description, brand, stock } = req.body;

      const productsUpdated = products.map((product) => {
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
          };
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
          return productUpdated;
        }
        return product;
      });

      fs.writeFileSync(
        path.resolve(__dirname, "..", "data", "products.json"),
        JSON.stringify(productsUpdated, null, 3),
        "utf-8"
      );
      return res.redirect("/products");
    } else {
      return res.render("productEdit", {
        categories,
        product: {
          id: req.params.id,
          ...req.body,
        },
        errors: errors.mapped(),
        user: req.session.userLogin,
      });
    }
  },
  getByCategory: (req, res) => {
   
    const category = db.Category.findAll({
      where : {
        id : req.params.id
      },
     
    })
    const products = db.Product.findAll({
      where : {
        categoryId : req.params.id
      },
      include : ['images']
    })
    Promise.all([category,products])
    .then(([category,products]) => {
      return res.render("categories", {
        category,
         products,
         user: req.session.userLogin,
         
       });
    })
    .catch((error) => console.log(error));
   
  },
  remove: (req, res) => {
    const { id } = req.params;

    const productFilter = products.filter((product) => product.id !== +id);

    fs.writeFileSync(
      path.resolve(__dirname, "..", "data", "products.json"),
      JSON.stringify(productFilter, null, 3),
      "utf-8"
    );

    return res.redirect("/");
  },
};
