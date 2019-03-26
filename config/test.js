'use strict';

module.exports = {
  env: 'test',
  port: process.env.PORT || 3000,
  secret: process.env.SESSION_SECRET,
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL:process.env.AUTH0_CALLBACK_URL 
};