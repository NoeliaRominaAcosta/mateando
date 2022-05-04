const express = require('express');
const router = express.Router();
const {products, detail, getByCategory} = require('../controllers/productsController')



/* GET /product page. */

router.get('/', products);
router.get('/detail/:idProduct', detail);
router.get('/category/:idCategory/:id?', getByCategory); 

module.exports = router;