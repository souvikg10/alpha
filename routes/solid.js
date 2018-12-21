/***********************************
 * auth0 route
 ************************************/
/***********************************
 * Module dependencies.
 * @private
 ************************************/
import express from 'express';
var router = express.Router();

/***********************************
 * Private functions
 ************************************/

/***********************************
 * routes functions
 ************************************/
router.get('/solid/login', function (req, res, next) {
  var callbackURL="/solid/callback";
  if(req.query.callback)
    callbackURL=req.query.callback;
    
    const { PathFactory } = require('ldflex');
    const { default: ComunicaEngine } = require('ldflex-comunica');
    
    // The JSON-LD context for resolving properties
    const context = {
      "@context": {
        "@vocab": "http://xmlns.com/foaf/0.1/",
        "friends": "knows",
        "label": "http://www.w3.org/2000/01/rdf-schema#label",
      }
    };
    // The query engine and its source
    const queryEngine = new ComunicaEngine('https://ruben.verborgh.org/profile/');
    // The object that can create new paths
    const path = new PathFactory({ context, queryEngine });

    const ruben = path.create({ subject: 'https://ruben.verborgh.org/profile/#me' });
    showPerson(ruben);

  

  
  renderSolidLogin(req,res,callbackURL);
});

router.get('/solid/callback', function (req, res, next) {
  console.log(req.query.access_token);
});


 function showPerson(person) {
  console.log(person.name.subject);

}


/***********************************
 * rendering functions
 ************************************/

/**
 * render dashboard home
 * @param {req} request
 * @param {res} response
 */
function renderSolidLogin(req,res,callbackURL){
  res.header('Access-Control-Allow-Origin', "http://localhost");
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
  res.render('solid/login', {
    title: 'Solid',
    layout: 'solidLayout',
    callbackURL:callbackURL
  });
}


module.exports = router;
