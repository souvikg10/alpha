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
    res.status(200).send([ {
      "user_token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9VTkZNVFpHTkVVeE5FSkJOMEUyTURZME56YzVRVGs0TTBZNE9EWXlSVGRHTlRCRE9USkdRdyJ9.eyJpc3MiOiJodHRwczovL2RhdGF2aWxsYWdlLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJmYWNlYm9va3wxMDIxNjQwOTI5NDE5OTc0MiIsImF1ZCI6Ikc4a21EYmpYcGNYT0liSk5xTUU4aFlMTXE4OTVtRnVRIiwiaWF0IjoxNTU1NTMyNDAyLCJleHAiOjE2MjU1Njg0MDJ9.oWNfy1aUKn5YVV4mdAJq7kLmyQc5ftEntR0l9GVZNJ4aHhcHBaOHoYryaw119buxofeUakCEyoUtALCbqmluIq3YDv5yGfDBvFqt8SnyfD-mumVotSaChbicqPaCzqWQC3ksn6sXQA4O8jvG7k9dS_diMoTYgsxxyGGGZ7W1iMjtGpGOe_b2NTa5x_aJP3VW2Pb6lvVlXwZOjchDqQXAgS_4Trl7JBi09rdYkIsAe-5Af4XuyOKxv2TsAMWkgLeTGQ_pX8VWiu8VS7FqDUP8-PVwq3h-Y75IFej4ZY6E6PSaWqJUUaC-I05qRFkR_RE-tR3fgwbzBX4jI-V2N8M8Zw",
      "user_id" : "facebook|10216409294199742"
    } ]);
  });

  //TEMPORARY test microapp G8kmDbjXpcXOIbJNqME8hYLMq895mFuQ launch end point
  jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://datavillage.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'G8kmDbjXpcXOIbJNqME8hYLMq895mFuQ',
  issuer: 'https://datavillage.eu.auth0.com/',
  algorithms: ['RS256']
  });

  router.get('/api/v0/microapp/G8kmDbjXpcXOIbJNqME8hYLMq895mFuQ/launch', jwtCheck,(req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'microapp G8kmDbjXpcXOIbJNqME8hYLMq895mFuQ launched',
    });
  });
  
  module.exports = router;