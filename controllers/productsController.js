const fs = require("fs");
const path = require("path");
const db = require("../database/models");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");
module.exports = {
  products: (req, res) => {
    let mates = db.Product.findAll({
      where: {
        categoryId: 1,
      },
      include: ["images"],
      order: [["id", "ASC"]],
    });
    let termos = db.Product.findAll({
      where: {
        categoryId: 2,
      },
      include: ["images"],
      order: [["id", "ASC"]],
    });
    let kits = db.Product.findAll({
      where: {
        categoryId: 3,
      },
      include: ["images"],
      order: [["id", "ASC"]],
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
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const { name, price, categoryId, description, brand, stock, image } =
        req.body;

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
                primary: i === 0 ? 1 : 0,
              };
              return image;
            });
            db.Image.bulkCreate(images, { validate: true }).then((result) =>
              console.log(result)
            );
          }

          return res.redirect("/");
        })
        .catch((error) => console.log(error));
    } else {
      return res.render("productAdd", {
        errors: errors.mapped(),
        old: req.body,
      });
    }
  },

  edit: (req, res) => {
    let product = db.Product.findByPk(req.params.id, {
      include: ["images"],
    });
    let categories = db.Category.findAll();

    Promise.all([product, categories])
      .then(([product, categories]) => {
        return res.render("productEdit", {
          categories,
          product,
          user: req.session.userLogin,
        });
      })
      .catch((error) => console.log(error));
  },
  detail: (req, res) => {
    db.Product.findByPk(req.params.id, {
      include: ['images']
  })
      .then(product => {
          return res.render('detail', {
              product,
              user: req.session.userLogin
          })
      })
      .catch(error => console.log(error))
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
      where: {
        id: req.params.id,
      },
    });
    const products = db.Product.findAll({
      where: {
        categoryId: req.params.id,
      },
      include: ["images"],
    });
    Promise.all([category, products])
      .then(([category, products]) => {
        return res.render("categories", {
          category,
          products,
          user: req.session.userLogin,
        });
      })
      .catch((error) => console.log(error));
  },
  remove: (req, res) => {
    db.Product.destroy({
			where : {
				id : req.params.id
			}
		})
			.then(() => {
				return res.redirect('/products');
			})
			.catch(error => console.log(error))
  },
};
