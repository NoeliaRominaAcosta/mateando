const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer')
const productsValidations = require('../validations/productValidations')
const {products, detail, getByCategory, store, add, edit, update, remove} = require('../controllers/productsController')




router
    .get('/', products)
    .get('/add', add)
    .get('/edit/:id', edit)
    .put('/update/:id', upload.single('image'),productsValidations,update)
    .post('/add',upload.array('images'),productsValidations,store)
    .get('/detail/:idProduct', detail)
    .get('/category/:id/:id?', getByCategory)
    .delete('/remove/:id', remove)

module.exports = router;