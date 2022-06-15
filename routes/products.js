const express = require('express');
const router = express.Router();
const path = require('path')
const multer = require('multer');

const {products, detail, getByCategory, store, add, edit, update, remove} = require('../controllers/productsController')


/* MULTER */
const storage = multer.diskStorage({
    destination : (req,file,callback) => {
        callback(null,'public/images')
    },
    filename : (req,file,callback) => {
        callback(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage
})
/* GET /product page. */

router
    .get('/', products)
    .get('/add', add)
    .get('/edit/:id', edit)
    .put('/update/:id', upload.single('image'),update)
    .post('/add',upload.single('image'),store)
    .get('/detail/:idProduct', detail)
    .get('/category/:idCategory/:id?', getByCategory)
    .delete('/remove/:id', remove)

module.exports = router;