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
import Database from '../server/lib/db/database';
import User from '../server/lib/utils/user';
import Consent from '../server/lib/utils/consent';

/***********************************
 * Private functions
 ************************************/
function createUserInDb(user){
  Database.defineUserConnectors().findOrCreate({where: {user_id: User.getUserId(user)}}).spread((result, created) => {
      if (created) {
        Consent.createUserConsent(User.getUserId(user),Consent.CONSENT_TYPE_FACEBOOK,true,function(){
        });
      }
    }
  );
}

/***********************************
 * routes functions
 ************************************/

// Perform the login, after login Auth0 will redirect to callback
router.get('/login', passport.authenticate('auth0', {
  scope: 'openid email'
}), function (req, res) {
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to previously requested URL or '/auth/dashboard'
router.get('/callback', function (req, res, next) {
  passport.authenticate('auth0', function (err, user, info) {
    if (info=="unauthorized") {  return res.redirect('/error'); }
    if (err) {  return next(err); }
    if (!user) { return res.redirect('/error'); }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      const returnTo = req.session.returnTo;
      delete req.session.returnTo;
      createUserInDb(user);
      res.redirect(returnTo || '/auth/digitaltwin');
    });
  })(req, res, next);
});


// Perform session logout and redirect to homepage
router.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('https://datavillage.eu.auth0.com/v2/logout?returnTo='+process.env.AUTH0_LOGOUT_CALLBACK_URL+'&client_id='+process.env.AUTH0_CLIENT_ID);
});


module.exports = router;
