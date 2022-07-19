const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer')
const productsValidations = require('../validations/productValidations')
const {products, detail, getByCategory, store, add, edit, update, remove} = require('../controllers/productsController')
const adminCheck = require('../middlewares/adminCheck')




router
    .get('/', products)
    .get('/add', adminCheck,add)
    .get('/edit/:id', adminCheck,edit)
    .put('/update/:id', upload.single('image'),productsValidations,update)
    .post('/add',upload.array('images'),productsValidations,store)
    .get('/detail/:id', detail)
    .get('/category/:id/:id?', getByCategory)
    .delete('/remove/:id', remove)

module.exports = router;