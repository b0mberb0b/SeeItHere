var mongoose = require('mongoose');
var gracefulShutdown;
var dbURI = 'mongodb://localhost/Loc8r';
if (process.env.NODE_ENV === 'production') {
    dbURI = 'mongodb://heroku_zjm2b90z:i06qosbf9q8l20gendnmmveht3@ds011308.mongolab.com:11308/heroku_zjm2b90z';
}
mongoose.connect(dbURI);


//Connection Events
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected ' + dbURI);
});
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

//For my PC computer
var readLine = require("readline");
if(process.platform === "win32"){
  var rl = readLine.createInterface ({
    input: process.stdin,
    output: process.stdout
  });
  rl.on("SIGINT", function (){
    process.emit("SIGINT");
  });
};

//Call when process is restarted or terminated
gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

//For nodemon restarts
process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
//For app termination
process.once('SIGINT', function () {
  gracefulShutdown('app termination', function() {
    process.exit(0);
  });
  //For Heroku app termination
});process.once('SIGTERM', function () {
  gracefulShutdown('Heroku app shutdown', function() {
    process.exit(0);
  });
});

require('./locations');
