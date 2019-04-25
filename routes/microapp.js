/***********************************
 * auth0 route
 ************************************/
/***********************************
 * Module dependencies.
 * @private
 ************************************/
import express from 'express';
var router = express.Router();
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import config from '../config/index';

/***********************************
 * Private functions
 ************************************/

/***********************************
 * routes functions
 ************************************/
var strategy = new Auth0Strategy(
  {
    domain: config.securityDomain,
    clientID: "G8kmDbjXpcXOIbJNqME8hYLMq895mFuQ",
    clientSecret: config.microappG8kmDbjXpcXOIbJNqME8hYLMq895mFuQClientSecret,
    audience:"https://alpha.datavillage.me/api/v0",
    scope:"offline_access",
    callbackURL:config.microappCallbackURL
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    //load auth0 user extra data in the user session
    //console.log(extraParams.id_token);
   return done(null, profile);
  }
);

passport.use("G8kmDbjXpcXOIbJNqME8hYLMq895mFuQ",strategy);

// Perform the login, after login Auth0 will redirect to callback
router.get('/auth/microapp/activate', passport.authenticate('G8kmDbjXpcXOIbJNqME8hYLMq895mFuQ', {
  scope: 'offline_access'
}), function (req, res) {
  res.redirect('/auth/dashboard');
});

// Perform the final stage of authentication and redirect to previously requested URL or '/auth/dashboard'
router.get('/auth/microapp/callback', function (req, res, next) {
  passport.authenticate('G8kmDbjXpcXOIbJNqME8hYLMq895mFuQ',{
    scope: 'offline_access'
  }, function (err, user, info) {
    if (info=="unauthorized") {  return res.redirect('/error'); }
    if (err) {  return next(err); }
    if (!user) { return res.redirect('/error'); }
    res.redirect('/auth/dashboard');
  })(req, res, next);
});


module.exports = router;
