const express = require('express');
const router = express.Router();
const {products} = require('../controllers/productsController')
/* GET / page. */
router.get('/', products);

module.exports = router