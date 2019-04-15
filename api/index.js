/***********************************
 * API route
 ************************************/
/***********************************
 * Module dependencies.
 * @private
 ************************************/
import express from 'express';
var router = express.Router();
//apis
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var jwtAuthz = require('express-jwt-authz');
//const microapps = require('./microapps');


/***********************************
 * token check
 ************************************/
var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://datavillage.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://alpha.datavillage.me/api/v0',
  issuer: 'https://datavillage.eu.auth0.com/',
  algorithms: ['RS256']
  });
  

/***********************************
 * api functions
 ************************************/
//status
  router.get('/api/v0/status', (req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'Status success',
    });
  });

  //microapps
  const checkScopes = jwtAuthz(['read:microapp_users']);
  router.get('/api/v0/microapp/users', jwtCheck,checkScopes,(req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'Status successfully',
    });
  });
  
  module.exports = router;