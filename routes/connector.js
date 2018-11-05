/***********************************
 * connectro routes
 ************************************/
/***********************************
 * Module dependencies.
 * @private
 ************************************/
var express = require('express');
var router = express.Router();
var passport = require('passport');
var StravaStrategy = require('passport-strava').Strategy;

/***********************************
 * Private functions
 ************************************/

/***********************************
 * routes functions
 ************************************/
router.get('/auth/connector/strava', function (req, res, next) {
  passport.use(new StravaStrategy({
    clientID: process.env.STRAVA_CLIENT_ID,
    clientSecret: process.env.STRAVA_CLIENT_SECRET,
    callbackURL: process.env.STRAVA_CALLBACK_URL
  },
  function (accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      console.log(JSON.stringify(req.user, null, 2));
      var user            = req.user; 
      user.strava={ accessToken : accessToken, refreshToken: refreshToken };
     return done(null, user);

    });
  }
  ));

  res.redirect('/auth/connector/strava/login');
  
});

router.get('/auth/connector/strava/login',
  passport.authenticate('strava'),
  function (req, res){
    // The request will be redirected to Google for authentication, so this
    // function will not be called.
  });

  router.get('/auth/connector/strava/callback', 
  passport.authenticate('strava', { failureRedirect: '/dashboard' }),
  function (req, res) {
    res.redirect('/dashboard');
  });


module.exports = router;
