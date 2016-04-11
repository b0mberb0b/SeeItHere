/* function for rendering home page, called by app_server/routes/index.js
go to app_server/views/home.jade for actual html */
module.exports.show = function(req, res) {
  res.render('home', {
    title: 'SeeItHere Home',
    pageHeader: {
      title: 'SeeItHere Theater',
      strapline: 'Find the Production You Want To See'
    }
   });
};
