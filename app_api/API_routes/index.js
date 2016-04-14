var express = require('express');
var router = express.Router();
var theatersController = require('../API_controllers/theaters');
var playsController = require('../API_controllers/plays');
var reviewsController = require('../API_controllers/reviews');

/*REQUESTS FOR THEATERS*/
//get a list of theaters, for results page
router.get('/results', theatersController.listByDistance);
//add a theater, makes new theater page
router.post('/theater', theatersController.theatersCreate);
//get a specific theater
router.get('/theater/:theaterid', theatersController.theatersReadOne);
//update a specific theater
router.put('/theater/:theaterid', theatersController.theatersUpdateOne);
//delete a specific theater
router.delete('/theaters/:theaterid', theatersController.theatersDeleteOne);

/*REQUESTS FOR PLAYS*/
//get a list of plays, for theater page
router.get('/theater/:theaterid', playsController.listByDate);
//add a play, makes new play page
router.post('/theater/:theaterid/play', playsController.playsCreate);
//get a specific play
router.get('/theater/:theaterid/play/:playid', playsController.playsReadOne);
//update a specific play
router.put('/theater/:theaterid/play/:playid', playsController.playsUpdateOne);
//delete a specific play
router.delete('/theaters/:theaterid/play/:playid', playsController.playsDeleteOne);

/*REQUESTS FOR REVIEWS*/
//add a review
router.post('/theater/:theaterid/play/:playid', reviewsController.reviewsCreate);
//get a specific review
router.get('/theater/:theaterid/play/:playid/review/:reviewid', reviewsController.reviewsReadOne);
//update a specific review
router.put('/theater/:theaterid/play/:playid/review/:reviewid', reviewsController.reviewsUpdateOne);
//delete a specific review
router.delete('/theaters/:theaterid/play/:playid/review/:reviewid', reviewsController.reviewsDeleteOne);

module.exports = router;
