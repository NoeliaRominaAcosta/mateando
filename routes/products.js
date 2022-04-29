const express = require('express');
const router = express.Router();
const {products, detail} = require('../controllers/productsController')
/* GET / page. */




router.get('/', products);
router.get('/detail/:id', detail);
/* router.get('/category/:name/:id?'); */

module.exports = router;