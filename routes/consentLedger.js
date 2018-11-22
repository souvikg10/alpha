/***********************************
 * connector routes
 ************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/
import express from 'express';
var router = express.Router();
import lodash  from 'lodash';
import dateFormat from 'dateformat';
import User from '../server/lib/utils/user';
import Consent from '../server/lib/utils/consent';

/***********************************
 * Private functions
 ************************************/

 /***********************************
 * routes functions 
 ************************************/
/* get connectors home */
router.get('/auth/consents', function (req, res, next) {
  //find all consents 
  Consent.getUserConsents(User.getUserId(req.user),function(result){
    renderConsentLedger(req,res,JSON.parse(JSON.stringify(result)));
  });
});

/***********************************
 * rendering functions
 ************************************/

/**
 * render consent ledger home
 * @param {req} request
 * @param {res} response
 */
function renderConsentLedger(req,res,userConsents){
  res.render('consent-ledger', {
    title: 'Connectors',
    layout: 'dashboard',
    consents:'active',
    userConsents:userConsents,
    user:{id:User.getUserId(req.user),email:User.getUserEmail(req.user)}
  });
}


module.exports = router;
