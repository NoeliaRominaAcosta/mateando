const express = require('express');
const router = express.Router();
const {detail} = require('../controllers/detailController')
/* GET home page. */
router.get('/', detail);

module.exports = router;