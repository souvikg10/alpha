/***********************************
 * developers routes
 ************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/
import express from 'express';
var router = express.Router();
import User from '../server/lib/utils/user';

/***********************************
 * Private functions
 ************************************/

 /***********************************
 * routes functions 
 ************************************/
/* get developers corner home */
router.get('/auth/developers', function (req, res, next) {
  renderDevelopersCorner(req,res);
});

/***********************************
 * rendering functions
 ************************************/

/**
 * render developers corner home
 * @param {req} request
 * @param {res} response
 */
function renderDevelopersCorner(req,res){
  res.render('developers', {
    title: 'Developers corner',
    layout: 'dashboard',
    developers:'active',
    user:{id:User.getUserId(req.user),email:User.getUserEmail(req.user)}
  });
}


module.exports = router;
