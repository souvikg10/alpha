/***********************************
 * dashboard route
 ************************************/
/***********************************
 * Module dependencies.
 * @private
 ************************************/
import express from 'express';
import secured from '../server/lib/middleware/secured';
import passport from 'passport';
import User from '../server/lib/utils/user';

var router = express.Router();

/***********************************
 * Private functions
 ************************************/

/***********************************
 * routes functions
 ************************************/

/* GET dashboard home */
router.get('/auth/dashboard', function (req, res, next) {
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
  res.render('dashboard', {
    title: 'Microapps',
    layout: 'dashboard',
    dashboard:'active',
    user:{id:User.getUserId(req.user),email:User.getUserEmail(req.user),picture:User.getPicture(req.user)}
  });
}


module.exports = router;
