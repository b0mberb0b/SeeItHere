var express = require('express');
var router = express.Router();
var theatersController = require('../API_controllers/theaters');
var playsController = require('../API_controllers/plays');
var reviewsController = require('../API_controllers/reviews');

/*REQUESTS FOR THEATERS*/
//get a list of theaters, for results page
router.get('/results', theatersController.listByDistance);
//add a theater, makes new theater page
router.post('/results/new-theater', theatersController.theatersCreate);
//get a specific theater
router.get('/results/:theaterURL', theatersController.theatersReadOne);
//update a specific theater
router.put('/results/:theaterURL', theatersController.theatersUpdateOne);
//delete a specific theater
router.delete('/results/:theaterURL', theatersController.theatersDeleteOne);

/*REQUESTS FOR PLAYS*/
//add a play, makes new play page
router.post('/results/:theaterURL/new-play', playsController.playsCreate);
//get a specific play
router.get('/results/:theaterURL/:playURL', playsController.playsReadOne);
//update a specific play
router.put('/results/:theaterURL/:playURL', playsController.playsUpdateOne);
//delete a specific play
router.delete('/results/:theaterURL/:playURL', playsController.playsDeleteOne);

/*REQUESTS FOR REVIEWS*/
//add a review
router.post('/results/:theaterURL/:playURL/new-review', reviewsController.reviewsCreate);
//get specific play and theater info for making a review
router.get('/results/:theaterURL/:playURL/new-review', reviewsController.reviewsBlankOne);
//get a specific review
router.get('/results/:theaterURL/:playURL/:reviewid', reviewsController.reviewsReadOne);
//update a specific review
router.put('/results/:theaterURL/:playURL/:reviewid', reviewsController.reviewsUpdateOne);
//delete a specific review
router.delete('/results/:theaterURL/:playURL/:reviewid', reviewsController.reviewsDeleteOne);

module.exports = router;
