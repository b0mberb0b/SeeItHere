var mongoose = require( 'mongoose' );

//all the attributes to a "review" object, saved to the database like so
var reviewSchema = new mongoose.Schema({
    author: {type: String, required: true},
    rating: {type: Number, required: true, min: 0, max: 5},
    playDate: {type: Date, required: true},
    text: {type: String, required: true}
});

//all the attributes to a "play" object, saved to the database like so
var playSchema = new mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required: true, min: 0, max: 5},
    description: {type: String, required: true},
    poster: String,
    ticketWebsite: String,
    cast: [String],
    prices: {type: [String], required: true},
    dates: {type: [Date], required: true},
    reviews: [reviewSchema]
});

//all the attributes to a "theater" object, saved to the database like so
var theaterSchema = new mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  coords: {type: [Number], index: '2dsphere'},
  rating: {type: Number, "default": 0, min: 0, max: 5},
  website: String,
  admin: {type: String, required: true},
  plays: [playSchema]
});

mongoose.model('theater', theaterSchema);
