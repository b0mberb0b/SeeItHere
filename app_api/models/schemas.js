var mongoose = require( 'mongoose' );

//all the attributes to a "review" object, saved to the database like so

var reviewSchema = new mongoose.Schema({
    author: {type: String, required: true},
    rating: {type: Number, required: true, min: 0, max: 5},
    playDate: Date,//{type: Date, required: true},
    text: {type: String, required: true},
    created: Date
});

//all the attributes to a "play" object, saved to the database like so
var playSchema = new mongoose.Schema({
    name: {type: String, required: true},
    URL: {type: String, required: true},
    theaterURL: {type: String, required: true},
    rating: {type: Number, min: 0, max: 5},
    description: {type: String, required: true},
    poster: String,
    ticketWebsite: String,
    cast: [String],
    prices: {type: [String], required: true},
    dates: Date,
    reviews: [reviewSchema]
});

//all the attributes to a "theater" object, saved to the database like so
var theaterSchema = new mongoose.Schema({
  name: {type: String, required: true},
  URL: {type: String, required: true, unique: true},
  address: {type: String, required: true},
  coords: {type: [Number], index: '2dsphere'},
  rating: {type: Number, min: 0, max: 5},
  description: String,
  website: String,
  admin: {type: String, required: true},
  playids: [String]
});

//exports this schema under the name "Theater", used at top of all Controller files
mongoose.model('Play', playSchema);
mongoose.model('Theater', theaterSchema);
