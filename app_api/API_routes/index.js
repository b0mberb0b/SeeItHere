var express = require('express');
var router = express.Router();
var theatersController = require('../API_controllers/theaters');
var playsController = require('../API_controllers/plays');
var reviewsController = require('../API_controllers/reviews');

/*REQUESTS FOR THEATERS*/
//get a list of theaters, for results page
router.get('/results', theatersController.listByDistance);
//add a theater, makes new theater page
router.post('/new-theater', theatersController.theatersCreate);
//get a specific theater
router.get('/:theaterURL', theatersController.theatersReadOne);
//update a specific theater
router.put('/:theaterURL', theatersController.theatersUpdateOne);
//delete a specific theater
router.delete('/:theaterURL', theatersController.theatersDeleteOne);

/*REQUESTS FOR PLAYS*/
//get a list of plays, for theater page
router.get('/:theaterURL', playsController.listByDate);
//add a play, makes new play page
router.post('/:theaterURL/new-play', playsController.playsCreate);
//get a specific play
router.get('/:theaterURL/:playURL', playsController.playsReadOne);
//update a specific play
router.put('/:theaterURL/:playURL', playsController.playsUpdateOne);
//delete a specific play
router.delete('/:theaterURL/:playURL', playsController.playsDeleteOne);

/*REQUESTS FOR REVIEWS*/
//add a review
router.post('/:theaterURL/:playURL/new-review', reviewsController.reviewsCreate);
//get a specific review
router.get('/:theaterURL/:playURL/:reviewid', reviewsController.reviewsReadOne);
//update a specific review
router.put('/:theaterURL/:playURL/:reviewid', reviewsController.reviewsUpdateOne);
//delete a specific review
router.delete('/:theaterURL/:playURL/:reviewid', reviewsController.reviewsDeleteOne);

module.exports = router;
