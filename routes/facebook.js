/***********************************
 * facebook routes
 ************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/
import express from 'express';
var router = express.Router();
import Database from '../server/lib/db/database';
import User from '../server/lib/utils/user';
import Activity from '../server/lib/utils/activity';
import Consent from '../server/lib/utils/consent';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import FacebookImporter from '../server/lib/importers/facebook';

/***********************************
 * Private functions
 ************************************/

 /***********************************
 * routes functions 
 ************************************/
router.get('/auth/connectors/facebook/connect', function (req, res, next) {
  passport.use(new FacebookStrategy.Strategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
  },
  function (accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      User.setConnectorTokenFacebook(req.user,accessToken,function (){
        return done(null, req.user);  
      });   
    });
  }
  ));
  res.redirect('/auth/connectors/facebook/login');
});

router.get('/auth/connectors/facebook/login',
  passport.authenticate('facebook'),
  function (req, res){
  });

  router.get('/auth/connectors/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/connectors' }),
  function (req, res) {
    //update connector value in database
    Database.defineUserConnectors().update({facebook: true},{where: {user_id: User.getUserId(req.user)}}).then(userConnectors => {
      //insert user consent TRUE
      Consent.createUserConsent(User.getUserId(req.user),Consent.CONSENT_TYPE_FACEBOOK,true,function(){
        res.redirect('/auth/connectors');
      });
    });

  });

  router.get('/auth/connectors/facebook/unconnect', 
  function (req, res) {
      User.deleteConnectorTokenStrava(req.user,function (){
        //update connector value in database
        Database.defineUserConnectors().update({facebook: false},{where: {user_id: User.getUserId(req.user)}}).then(userConnectors => {
          //insert user consent FALSE
          Consent.createUserConsent(User.getUserId(req.user),Consent.CONSENT_TYPE_FACEBOOK,false,function(){
            res.redirect('/auth/connectors');
          });
      });   
    });
  });

router.get('/auth/connectors/facebook/synchronize', 
  function (req, res) {
    FacebookImporter.importData(req.user,function(){
      res.redirect('/auth/connectors');
    });
  });

module.exports = router;
