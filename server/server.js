/***********************************
 * Module dependencies. 
 ************************************/
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import exphbs from 'express-handlebars';
import session from 'express-session';
import dotenv from 'dotenv';
import Logger from './lib/logger';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import flash from 'connect-flash';
import userInViews from './lib/middleware/userInViews';
import authRouter from '../routes/auth';
import indexRouter from '../routes/index';
import dashboardRouter from '../routes/dashboard';
import connectorRouter from '../routes/connector';
import Auth0 from '../server/lib/auth0';
import DropBoxPod from '../server/lib/models/dropbox-pod';

dotenv.load();

/***********************************
 * Set up passports
 ************************************/
var strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    callbackURL:process.env.AUTH0_CALLBACK_URL 
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user

    //load auth0 user extra data in the user session
   Auth0.loadSocialLoginAccessToken(profile,function (profile) {
     var pod=new DropBoxPod(profile.pod.accessToken);
     profile.pod=pod;
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
var hbs = exphbs.create({  
  helpers: {
    ifeq: function(a, b, options) {
      if (a === b) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    toJSON : function(object) {
      return JSON.stringify(object);
    },
    section: function(name, options){ 
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this); 
        return null;
    } 
  }
});
app.engine('handlebars', hbs.engine);
app.engine('handlebars', exphbs({
        defaultLayout: 'main', 
        extname: '.handlebars',
        layoutsDir:'server/views/layouts',
        partialsDir:'server/views/partials'
}));

/***********************************
 * Set up app properties & engine
 ************************************/
 var sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true
};

if (app.get('env') === 'production') {
  //sess.cookie.secure = true; // serve secure cookies, requires https
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
app.use(userInViews());
app.use('/', authRouter);
app.use('/', indexRouter);
app.use('/', dashboardRouter);
app.use('/', connectorRouter);

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
if (app.get('env') === process.env.ENVIRONEMENT_DEVELOPMENT) {
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

var PORT = process.env.PORT || 3000;
var server=app.listen(PORT, function()  {
    var host = server.address().address;
    var port = server.address().port;
    
    console.log("DataVillage listening at http://%s:%s", host, port);
});


/***********************************
 * Module exports.
 ************************************/
module.exports = app;
