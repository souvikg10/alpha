/***********************************
 * index route
 ************************************/
/***********************************
 * Module dependencies.
 * @private
 ************************************/
var express = require('express');
var router = express.Router();

/***********************************
 * Private functions
 ************************************/

/***********************************
 * routes functions
 ************************************/
/* GET home login/register page. */
router.get('/', function (req, res, next) {
  res.redirect("http://www.datavillage.me");
});


/***********************************
 * rendering functions
 ************************************/

/**
 * render home login/register page
 * @param {req} request
 * @param {res} response
 */
function renderHome(req,res){
    res.render('home', {
      title: 'Home',       
      layout: 'singlePage'
    });  
  }

module.exports = router;
