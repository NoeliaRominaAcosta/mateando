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
  let product = db.Product.findByPk(req.params.id, {
    include: ["images"],
  })
 let recommended = db.Product.findAll({
  order: [["id", "ASC"]],
  limit : 4,
  include: ["images"]
})

Promise.all([product, recommended])
.then(([product, recommended]) => {
      return res.render('detail', {
          product,
          recommended,
          user: req.session.userLogin,
      }) 

  })
  .catch((error) => console.log(error));
  },
  update: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const { name, price, categoryId, description, brand, stock, image } =
      req.body;
      db.Product.update(
        {
          name: name.trim(),
        price: +price,
        categoryId,
        description: description.trim(),
        brand,
        stock,
        },
        {
          where : {
            id : req.params.id
          }
        }
      ).then(async () => {
        if(req.file){
          try {
            await db.Image.update(
              {
                file : req.file.filename
              },
              {
                where : {
                  productId : req.params.id,
                  primary : true
                }
              }
            )
          } catch (error) {
            console.log(error);
          }
        }
        return res.redirect('/products');
  
      }).catch(error => console.log(error))
    } else {
      return res.render("productEdit", {
       
        errors: errors.mapped(),
        user: req.session.userLogin,
      });
    }
  },
  remove : (req, res) => {

		db.Image.findAll({
			where : {
				productId : req.params.id
			}
		})
			.then(images => {
				images.forEach(image => {
					if(fs.existsSync(path.resolve(__dirname,'../../public/images/' + image.file))){
						console.log(image.file)
						fs.unlinkSync(path.resolve(__dirname,'../../public/images/' + image.file))
					}
				});
				db.Product.destroy({
					where : {
						id : req.params.id
					},
					force : true
				})
					.then((info) => {
						console.log('>>>>>>>>>>>>>>>>>>>>>>>>',info);
						return res.redirect('/products');
					})
			})
			.catch(error => console.log(error))
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
  }
};
