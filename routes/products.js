const express = require('express');
const router = express.Router();
const {products, detail, getByCategory, store, add} = require('../controllers/productsController')
const multer = require('multer');

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
    .post('/add',upload.single('image'),store)
    .get('/detail/:idProduct', detail)
    .get('/category/:idCategory/:id?', getByCategory);

module.exports = router;