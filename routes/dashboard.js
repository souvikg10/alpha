/***********************************
 * dashboard route
 ************************************/
/***********************************
 * Module dependencies.
 * @private
 ************************************/
var express = require('express');
var secured = require('../server/lib/middleware/secured');
var router = express.Router();

/***********************************
 * Private functions
 ************************************/

/***********************************
 * routes functions
 ************************************/

/* GET dashboard home */
router.get('/dashboard', function (req, res, next) {
  renderDashboard(req,res);
});


/***********************************
 * rendering functions
 ************************************/

/**
 * render dashboard home
 * @param {req} request
 * @param {res} response
 */
function renderDashboard(req,res){
  //const { _raw, _json, ...userProfile } = req.user;
  res.render('dashboard', {
    userProfile: JSON.stringify(req.user, null, 2),
    title: 'Dashboard',
    layout: 'dashboard'
  });
}


module.exports = router;
