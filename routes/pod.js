/***********************************
 * pod route
 ************************************/
/***********************************
 * Module dependencies.
 * @private
 ************************************/
var express = require('express');
var router = express.Router();
var passport = require('passport');
var GoogleDriveStrategy = require('passport-google-drive').Strategy;

/***********************************
 * Private functions
 ************************************/

/***********************************
 * routes functions
 ************************************/
router.get('/auth/pod/drive', function (req, res, next) {
  passport.use(new GoogleDriveStrategy({
    clientID: process.env.DRIVE_CLIENT_ID,
    clientSecret: process.env.DRIVE_CLIENT_SECRET,
    callbackURL: process.env.DRIVE_CALLBACK_URL
  },
  function (accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      console.log(JSON.stringify(req.user, null, 2));
      var user            = req.user; 
      user.googleDrive={ accessToken : accessToken, refreshToken: refreshToken }
     return done(null, user);

    });
  }
  ));

  res.redirect('/auth/pod/drive/login');
  
});

router.get('/auth/pod/drive/login',
  passport.authenticate('google-drive',{
    scope: 'https://www.googleapis.com/auth/drive'
  }),
  function (req, res){
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
  });

  router.get('/auth/pod/drive/callback', 
  passport.authenticate('google-drive', { failureRedirect: '/dashboard' }),
  function (req, res) {
    res.redirect('/dashboard');
  });



/***********************************
 * rendering functions
 ************************************/

/**
 * render activateEmail
 * @param {req} request
 * @param {res} response
 */
function renderActivateEmail(req,res){
  res.render('activateEmail', {
    title: 'Activate email',
    layout: 'singlePage'
  });
}


module.exports = router;
