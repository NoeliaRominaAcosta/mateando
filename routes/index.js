const express = require('express');
const router = express.Router();
const {index, explora, contact} = require('../controllers/indexController')
/* GET home page. */
router
    .get('/', index)
    .get('/explora',explora)


module.exports = router;
