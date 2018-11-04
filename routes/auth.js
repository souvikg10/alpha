/***********************************
 * auth0 route
 ************************************/
/***********************************
 * Module dependencies.
 * @private
 ************************************/
var express = require('express');
var router = express.Router();
var passport = require('passport');

/***********************************
 * Private functions
 ************************************/

/***********************************
 * routes functions
 ************************************/

// Perform the login, after login Auth0 will redirect to callback
router.get('/login', passport.authenticate('auth0', {
  scope: 'openid email'
}), function (req, res) {
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to previously requested URL or '/user'
router.get('/callback', function (req, res, next) {
  passport.authenticate('auth0', function (err, user, info) {
    if (info=="unauthorized") {  return res.redirect('/activateEmail'); }
    if (err) {  return next(err); }
    if (!user) { return res.redirect('/'); }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      const returnTo = req.session.returnTo;
      delete req.session.returnTo;
      res.redirect(returnTo || '/dashboard');
    });
  })(req, res, next);
});

// email needs to be activatedxs
router.get('/activateEmail', function (req, res, next) {
  renderActivateEmail(req,res);
});

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
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
