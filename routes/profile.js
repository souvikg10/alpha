/***********************************
 * profile route
 ************************************/
/***********************************
 * Module dependencies.
 * @private
 ************************************/
import express from 'express';
import secured from '../server/lib/middleware/secured';
import User from '../server/lib/utils/user';
const { check, validationResult } = require('express-validator/check')
import sanitizeBody from 'express-validator/filter';


var router = express.Router();

/***********************************
 * Private functions
 ************************************/

/***********************************
 * routes functions
 ************************************/

/* GET profile form */
router.get('/auth/profile', function (req, res, next) {
  renderProfile(req,res);
});

/* POST profile form */
router.post('/auth/profile/submit', [
  check('email')
    .isEmail()
    .withMessage('That email doesn‘t look right')
], (req, res) => {

  const errors = validationResult(req);

  var maleChecked="";
  var femaleChecked="checked";
  if (req.body.gender=="male") {
    maleChecked="checked";
    femaleChecked="";
  }
  req.body.maleChecked=maleChecked;
  req.body.femaleChecked=femaleChecked;
  req.body.picture=User.getPicture(req.user);
  var user=User.setAdress(req.user,req.body.adress);
  

  User.saveUserProfile(req.user, function(profile){
    
  });



  res.render('profile', {
    title: 'Profile',
    layout: 'dashboard',
    user: req.body,
    errors: errors.mapped()
  });
});


/***********************************
 * rendering functions
 ************************************/

/**
 * render dashboard home
 * @param {req} request
 * @param {res} response
 */
function renderProfile(req,res){
  //gender vars
  var maleChecked="";
  var femaleChecked="checked";
  if (User.getGender(req.user)=="male") {
    maleChecked="checked";
    femaleChecked="";
  }
  

  res.render('profile', {
    title: 'Profile',
    layout: 'dashboard',
    user:{id:User.getUserId(req.user),
      email:User.getUserEmail(req.user),
      picture:User.getPicture(req.user),
      username:User.getUsername(req.user),
      firstname:User.getFirstname(req.user),
      lastname:User.getLastname(req.user),
      maleChecked:maleChecked,
      femaleChecked:femaleChecked,
      birthdate:User.getBirthdate(req.user),
      adress:User.getAdress(req.user),
      city:User.getCity(req.user),
      postalcode:User.getPostalcode(req.user),
      country:User.getCountry(req.user)}
  });
}


module.exports = router;
