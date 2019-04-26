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
  var checkScopes = jwtAuthz(['read:microapp_users']);
  router.get('/api/v0/microapp/users', jwtCheck,checkScopes,(req, res) => {
    res.status(200).send([ {
      "user_token" : "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik9VTkZNVFpHTkVVeE5FSkJOMEUyTURZME56YzVRVGs0TTBZNE9EWXlSVGRHTlRCRE9USkdRdyJ9.eyJpc3MiOiJodHRwczovL2RhdGF2aWxsYWdlLmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJmYWNlYm9va3wxMDIxNjQwOTI5NDE5OTc0MiIsImF1ZCI6Ikc4a21EYmpYcGNYT0liSk5xTUU4aFlMTXE4OTVtRnVRIiwiaWF0IjoxNTU2Mjc3OTg0LCJleHAiOjE2MjYzMTM5ODR9.owNAs1HSl_Hm6JcgZ2xGX7dxtVqGHto2SZeBh6pfcsM6E8l1nEtCgOUMro3E1dkadIbsHY_zEjxBfvhqDb4PNm_L2Pd6BavquMKUksjoSPnwaqdIWW_m78QbyWqrKNGKv-Yfw9tartrTLVyRQsaa_JuN7aOW_F6Pbe2rvsVclIs5cGXs5fa16guqPoayf0HeJ2fL676EnnI2AVxVkHF7igsQHSduYQyz6OeGFjTe3EmJQVa1SsRL1JblzyzvdkhSDUshUxjALErxDn_w_mOxMcN31WmDuSOAbsuTz3UTBU_kWubOX4bW1oSQcrzA7AfPch7ww4-IoN4JyKLs09e62A",
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

  //expose graph endpoint
  checkScopes = jwtAuthz(['read:commutes']);
  router.get('/api/v0/activity/search',jwtCheck,(req, res) => {
    res.status(200).send([  
      {  
         "name":"ACTIVITY1",
         "type":"Driving",
         "date":"2019-02-09T18:34:04.366",
         "confidence":50,
         "locationStartingFromList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-09T18:34:04.366",
               "latitudeE7":50.6357924,
               "longitudeE7":4.3650277,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Rue du Vert Coucou, Lillois-Witterzée, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1428, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ],
         "locationEndingToList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-09T18:44:04.366",
               "latitudeE7":50.6828722,
               "longitudeE7":4.3692706,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Ancienne maison communale de Braine-l'Alleud, 3, Grand-Place Baudouin Ier, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1420, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ]
      },
      {  
         "name":"ACTIVITY2",
         "type":"Driving",
         "date":"2019-02-10T18:32:04.351",
         "confidence":50,
         "locationStartingFromList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-10T18:34:04.366",
               "latitudeE7":50.6357924,
               "longitudeE7":4.3650277,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Rue du Vert Coucou, Lillois-Witterzée, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1428, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ],
         "locationEndingToList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-10T18:44:04.366",
               "latitudeE7":50.6828722,
               "longitudeE7":4.3692706,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Ancienne maison communale de Braine-l'Alleud, 3, Grand-Place Baudouin Ier, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1420, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ]
      },
      {  
         "name":"ACTIVITY11",
         "type":"Driving",
         "date":"2019-02-11T18:14:04.195",
         "confidence":50,
         "locationStartingFromList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-11T18:34:04.366",
               "latitudeE7":50.6357924,
               "longitudeE7":4.3650277,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Rue du Vert Coucou, Lillois-Witterzée, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1428, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ],
         "locationEndingToList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-11T18:44:04.366",
               "latitudeE7":50.6828722,
               "longitudeE7":4.3692706,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Ancienne maison communale de Braine-l'Alleud, 3, Grand-Place Baudouin Ier, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1420, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ]
      },
      {  
         "name":"ACTIVITY12",
         "type":"Walking",
         "date":"2019-02-12T18:12:04.183",
         "confidence":50,
         "locationStartingFromList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-12T18:34:04.366",
               "latitudeE7":50.6357924,
               "longitudeE7":4.3650277,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Rue du Vert Coucou, Lillois-Witterzée, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1428, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ],
         "locationEndingToList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-12T18:44:04.366",
               "latitudeE7":50.6828722,
               "longitudeE7":4.3692706,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Ancienne maison communale de Braine-l'Alleud, 3, Grand-Place Baudouin Ier, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1420, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ]
      },
      {  
         "name":"ACTIVITY13",
         "type":"Walking",
         "date":"2019-02-13T18:10:04.176",
         "confidence":50,
         "locationStartingFromList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-13T18:34:04.366",
               "latitudeE7":50.6357924,
               "longitudeE7":4.3650277,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Rue du Vert Coucou, Lillois-Witterzée, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1428, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ],
         "locationEndingToList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-13T18:44:04.366",
               "latitudeE7":50.6828722,
               "longitudeE7":4.3692706,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Ancienne maison communale de Braine-l'Alleud, 3, Grand-Place Baudouin Ier, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1420, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ]
      },
      {  
         "name":"ACTIVITY14",
         "type":"Running",
         "date":"2019-02-14T18:05:25.481",
         "confidence":50,
         "locationStartingFromList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-14T18:34:04.366",
               "latitudeE7":50.6357924,
               "longitudeE7":4.3650277,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Rue du Vert Coucou, Lillois-Witterzée, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1428, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ],
         "locationEndingToList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-14T18:44:04.366",
               "latitudeE7":50.6828722,
               "longitudeE7":4.3692706,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Ancienne maison communale de Braine-l'Alleud, 3, Grand-Place Baudouin Ier, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1420, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ]
      },
      {  
         "name":"ACTIVITY15",
         "type":"Running",
         "date":"2019-02-15T17:55:13.461",
         "confidence":50,
         "locationStartingFromList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-15T18:34:04.366",
               "latitudeE7":50.6357924,
               "longitudeE7":4.3650277,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Rue du Vert Coucou, Lillois-Witterzée, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1428, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ],
         "locationEndingToList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-15T18:34:04.366",
               "latitudeE7":50.6828722,
               "longitudeE7":4.3692706,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Ancienne maison communale de Braine-l'Alleud, 3, Grand-Place Baudouin Ier, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1420, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ]
      },
      {  
         "name":"ACTIVITY16",
         "type":"Running",
         "date":"2019-02-16T17:49:27.818",
         "confidence":50,
         "locationStartingFromList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-16T18:34:04.366",
               "latitudeE7":50.6357924,
               "longitudeE7":4.3650277,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Rue du Vert Coucou, Lillois-Witterzée, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1428, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ],
         "locationEndingToList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-16T18:44:04.366",
               "latitudeE7":50.6828722,
               "longitudeE7":4.3692706,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Ancienne maison communale de Braine-l'Alleud, 3, Grand-Place Baudouin Ier, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1420, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ]
      },
      {  
         "name":"ACTIVITY3",
         "type":"Running",
         "date":"2019-02-17T18:30:04.337",
         "confidence":50,
         "locationStartingFromList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-17T18:34:04.366",
               "latitudeE7":50.6357924,
               "longitudeE7":4.3650277,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Rue du Vert Coucou, Lillois-Witterzée, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1428, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ],
         "locationEndingToList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-17T18:44:04.366",
               "latitudeE7":50.6828722,
               "longitudeE7":4.3692706,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Ancienne maison communale de Braine-l'Alleud, 3, Grand-Place Baudouin Ier, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1420, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ]
      },
      {  
         "name":"ACTIVITY4",
         "type":"Running",
         "date":"2019-02-18T18:28:04.325",
         "confidence":50,
         "locationStartingFromList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-18T18:34:04.366",
               "latitudeE7":50.6357924,
               "longitudeE7":4.3650277,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Rue du Vert Coucou, Lillois-Witterzée, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1428, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ],
         "locationEndingToList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-18T18:44:04.366",
               "latitudeE7":50.6828722,
               "longitudeE7":4.3692706,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Ancienne maison communale de Braine-l'Alleud, 3, Grand-Place Baudouin Ier, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1420, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ]
      },
      {  
         "name":"ACTIVITY5",
         "type":"Running",
         "date":"2019-02-19T18:26:04.296",
         "confidence":50,
         "locationStartingFromList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-19T18:34:04.366",
               "latitudeE7":50.6357924,
               "longitudeE7":4.3650277,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Rue du Vert Coucou, Lillois-Witterzée, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1428, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ],
         "locationEndingToList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-19T18:44:04.366",
               "latitudeE7":50.6828722,
               "longitudeE7":4.3692706,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Ancienne maison communale de Braine-l'Alleud, 3, Grand-Place Baudouin Ier, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1420, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ]
      },
      {  
         "name":"ACTIVITY6",
         "type":"Running",
         "date":"2019-02-20T18:24:04.281",
         "confidence":50,
         "locationStartingFromList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-20T18:34:04.366",
               "latitudeE7":50.6357924,
               "longitudeE7":4.3650277,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Rue du Vert Coucou, Lillois-Witterzée, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1428, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ],
         "locationEndingToList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-20T18:44:04.366",
               "latitudeE7":50.6828722,
               "longitudeE7":4.3692706,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Ancienne maison communale de Braine-l'Alleud, 3, Grand-Place Baudouin Ier, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1420, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ]
      },
      {  
         "name":"ACTIVITY7",
         "type":"Running",
         "date":"2019-02-21T18:22:04.267",
         "confidence":50,
         "locationStartingFromList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-21T18:34:04.366",
               "latitudeE7":50.6357924,
               "longitudeE7":4.3650277,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Rue du Vert Coucou, Lillois-Witterzée, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1428, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ],
         "locationEndingToList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-21T18:44:04.366",
               "latitudeE7":50.6828722,
               "longitudeE7":4.3692706,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Ancienne maison communale de Braine-l'Alleud, 3, Grand-Place Baudouin Ier, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1420, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ]
      },
      {  
         "name":"ACTIVITY8",
         "type":"Running",
         "date":"2019-02-22T18:20:04.254",
         "confidence":50,
         "locationStartingFromList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-22T18:34:04.366",
               "latitudeE7":50.6357924,
               "longitudeE7":4.3650277,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Rue du Vert Coucou, Lillois-Witterzée, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1428, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ],
         "locationEndingToList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-22T18:44:04.366",
               "latitudeE7":50.6828722,
               "longitudeE7":4.3692706,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Ancienne maison communale de Braine-l'Alleud, 3, Grand-Place Baudouin Ier, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1420, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ]
      },
      {  
         "name":"ACTIVITY9",
         "type":"Running",
         "date":"2019-02-23T18:18:04.237",
         "confidence":50,
         "locationStartingFromList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-23T18:34:04.366",
               "latitudeE7":50.6357924,
               "longitudeE7":4.3650277,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Rue du Vert Coucou, Lillois-Witterzée, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1428, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ],
         "locationEndingToList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-23T18:44:04.366",
               "latitudeE7":50.6828722,
               "longitudeE7":4.3692706,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Ancienne maison communale de Braine-l'Alleud, 3, Grand-Place Baudouin Ier, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1420, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ]
      },
      {  
         "name":"ACTIVITY10",
         "type":"Running",
         "date":"2019-02-24T18:16:04.223",
         "confidence":50,
         "locationStartingFromList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-24T18:34:04.366",
               "latitudeE7":50.6357924,
               "longitudeE7":4.3650277,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Rue du Vert Coucou, Lillois-Witterzée, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1428, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ],
         "locationEndingToList":[  
            {  
               "name":"Locations1",
               "timestampMs":"1549733644366",
               "date":"2019-02-24T18:44:04.366",
               "latitudeE7":50.6828722,
               "longitudeE7":4.3692706,
               "accuracy":14,
               "altitude":null,
               "verticalAccuracy":null,
               "address":"Ancienne maison communale de Braine-l'Alleud, 3, Grand-Place Baudouin Ier, Braine-l'Alleud, Nivelles, Walloon Brabant, Wallonia, 1420, Belgium",
               "labels":[  
                  "Braine-l'Alleud"
               ]
            }
         ]
      }
   ]);
  });


  router.get('/api/v0/dialog/verifyToken',(req, res) => {
    const hubChallenge = req.query["hub.challenge"];
    const hubMode = req.query["hub.mode"];
    const verifyTokenMatches = (req.query["hub.verify_token"] === "datavillage");
    if (hubMode && verifyTokenMatches) {
      res.status(200).send(hubChallenge);
    } else {
      res.status(403).end();
    }
    }
  );
  
  module.exports = router;