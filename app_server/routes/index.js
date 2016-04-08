var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController')
var homeController = require('../controllers/homeController')
var othersController = require('../controllers/othersController')
var playController = require('../controllers/playController')
var resultsController = require('../controllers/resultsController')
var theaterController = require('../controllers/theaterController')
var userController = require('../controllers/userController')

/* GET home page by calling method from homeController.js */
router.get('/', homeController.show);
/* GET results page by calling method from resultsController.js*/
router.get('/results', resultsController.show);
/* GET specific theater page by calling method from theaterController.js*/
router.get('/theater', theaterController.show);
/* GET specific production page by calling method from playController.js*/
router.get('/theater/play', playController.show);


/* logged-in user-related pages */
/* GET theater admin page by calling method from adminController.js*/
router.get('/admin', adminController.show);
/* GET theater-goer page by calling method from userController.js*/
router.get('/user', userController.show);


/* Other pages */
/* GET about page by calling method from othersController.js*/
router.get('/about', othersController.about);
/* GET terms page by calling method from othersController.js*/
router.get('/terms', othersController.terms);
/* GET FAQ page by calling method from othersController.js*/
router.get('/FAQ', othersController.faq);

module.exports = router;
