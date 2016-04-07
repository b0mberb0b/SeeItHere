var express = require('express');
var router = express.Router();
var indexController = require('../controllers/indexController')


/* GET home page by calling method from homePageController.js */
router.get('/', indexController.index);

module.exports = router;
