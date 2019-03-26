/***********************************
 * Module dependencies. 
 ************************************/
import express from 'express';
import enforce from 'express-sslify';
import path from 'path';
import cookieParser from 'cookie-parser';
import exphbs from 'express-handlebars';
import session from 'express-session';
import Logger from './lib/utils/logger';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import flash from 'connect-flash';
import config from '../config/index';
import userInViews from './lib/middleware/userInViews';
import User from '../server/lib/utils/user';
import Consent from '../server/lib/utils/consent';
import dateFormat from 'dateformat';

import authRouter from '../routes/auth';
import indexRouter from '../routes/index';
import dashboardRouter from '../routes/dashboard';
import connectorsRouter from '../routes/connectors';
import consentLedgerRouter from '../routes/consentLedger';
import developerRouter from '../routes/developers';
import stravaRouter from '../routes/strava';
import facebookRouter from '../routes/facebook';


/***********************************
 * Set up passports
 ************************************/
var strategy = new Auth0Strategy(
  {
    domain: config.domain,
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL:config.callbackURL 
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    //load auth0 user extra data in the user session
     User.loadSocialLoginAccessToken(profile,function (profile) {
     return done(null, profile);
    });
  }
);

passport.use(strategy);

// You can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});


/***********************************
 * App creation
 ************************************/
var app = express();

/***********************************
 * Templating
 ************************************/
var hbs = exphbs.create(
  { defaultLayout: 'main', 
    extname: '.handlebars',
    layoutsDir:'server/views/layouts',
    partialsDir:'server/views/partials',
    helpers: {
      formatDate: function (datetime, format) { return dateFormat(datetime,format); },
      consentLogo: function (type) { 
        if(type==Consent.CONSENT_TYPE_STRAVA)
          return "fab fa-strava";
        else if(type==Consent.CONSENT_TYPE_GOOGLE)
          return "fab fa-google";
        else if(type==Consent.CONSENT_TYPE_FACEBOOK)
          return "fab fa-facebook";
      },
      consentType: function (type,consent) {
        if(consent) 
          return "Consent activation for "+type;
        else
          return "Consent revokation for "+type;
      },
      consentData: function (userId,hash) { 
        return "Transaction "+hash;
      }
    }
  });

app.engine('handlebars', hbs.engine);


/***********************************
 * Set up app properties & engine
 ************************************/
 var sess = {
  secret: config.secret,
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (config.env === 'production') {
  //sess.cookie.secure = true; // serve secure cookies, requires https
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join('client')));

app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, '/views'));
app.use(Logger.getRequestLogger());

app.use(flash());

/***********************************
 * auth message failure
 ************************************/
app.use(function (req, res, next) {
  if (req && req.query && req.query.error) {
    req.flash('error', req.query.error);
  }
  if (req && req.query && req.query.error_description) {
    req.flash('error_description', req.query.error_description);
  }
  next();
});


/***********************************
 * Routes
 ************************************/
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
app.use(userInViews());
app.all('*', function(req,res,next){
  if (req.path === '/' || req.path === '/login' || req.path === '/callback' || req.path === '/error')
    next();
  else
    ensureAuthenticated(req,res,next);  
});
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/', dashboardRouter);
app.use('/', connectorsRouter);
app.use('/', consentLedgerRouter);
app.use('/', developerRouter);
app.use('/', stravaRouter);
app.use('/', facebookRouter);

/***********************************
 * Error handling
 ************************************/
// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers

// Development error handler
// Will print stacktrace
if (config.env === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      layout: 'singlePage',
      message: err.message,
      error: {}
    });
  });
}

// Production error handler
// No stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    layout: 'singlePage',
    message: err.message,
    error: {}
  });
});


/***********************************
 * Start server
 ************************************/

var server=app.listen(config.port, function()  {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log("DataVillage listening at http://%s:%s", host, port);
});


/***********************************
 * Module exports.
 ************************************/
module.exports = app;
