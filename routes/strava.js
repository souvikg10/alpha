/***********************************
 * strava routes
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
import StravaStrategy from 'passport-strava';
import StravaImporter from '../server/lib/importers/strava';

/***********************************
 * Private functions
 ************************************/

 /***********************************
 * routes functions 
 ************************************/
router.get('/auth/connectors/strava/connect', function (req, res, next) {
  passport.use(new StravaStrategy.Strategy({
    clientID: process.env.STRAVA_CLIENT_ID,
    clientSecret: process.env.STRAVA_CLIENT_SECRET,
    callbackURL: process.env.STRAVA_CALLBACK_URL
  },
  function (accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      User.setConnectorTokenStrava(req.user,accessToken,function (){
        return done(null, req.user);  
      });   
    });
  }
  ));
  res.redirect('/auth/connectors/strava/login');
});

router.get('/auth/connectors/strava/login',
  passport.authenticate('strava'),
  function (req, res){
  });

  router.get('/auth/connectors/strava/callback', 
  passport.authenticate('strava', { failureRedirect: '/connectors' }),
  function (req, res) {
    //update connector value in database
    Database.defineUserConnectors().update({strava: true},{where: {user_id: User.getUserId(req.user)}}).then(userConnectors => {
      //insert user consent TRUE
      Consent.createUserConsent(User.getUserId(req.user),Consent.CONSENT_TYPE_STRAVA,true,function(){
        res.redirect('/auth/connectors');
      });
    });

  });

  router.get('/auth/connectors/strava/unconnect', 
  function (req, res) {
      User.deleteConnectorTokenStrava(req.user,function (){
        //update connector value in database
        Database.defineUserConnectors().update({strava: false},{where: {user_id: User.getUserId(req.user)}}).then(userConnectors => {
          //insert user consent FALSE
          Consent.createUserConsent(User.getUserId(req.user),Consent.CONSENT_TYPE_STRAVA,false,function(){
            res.redirect('/auth/connectors');
          });
      });   
    });
  });

router.get('/auth/connectors/strava/synchronize', 
  function (req, res) {
    StravaImporter.importData(req.user,function(){
      res.redirect('/auth/connectors');
    });
  });

module.exports = router;
