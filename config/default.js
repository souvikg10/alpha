'use strict';

import dotenv from 'dotenv';
dotenv.load();

module.exports = {
  env: 'development',
  port: process.env.PORT || 3000,
  secret: process.env.SESSION_SECRET,
  encryptionKey: process.env.ENCRYPTION_KEY,
  securityDomain: process.env.AUTH0_DOMAIN,
  securityClientID: process.env.AUTH0_CLIENT_ID,
  securityClientSecret: process.env.AUTH0_CLIENT_SECRET,
  securityCallbackURL:process.env.AUTH0_CALLBACK_URL,
  securityLogoutCallbackURL:process.env.AUTH0_LOGOUT_CALLBACK_URL,
  securityManagementClientID:process.env.AUTH0_MANAGEMENT_CLIENT_ID,
  securityManagementClientSecret:process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
  microappCallbackURL:process.env.AUTH0_MICROAPP_CALLBACK_URL,
  microappG8kmDbjXpcXOIbJNqME8hYLMq895mFuQClientSecret:process.env.AUTH0_MICROAPP_G8kmDbjXpcXOIbJNqME8hYLMq895mFuQ_CLIENT_SECRET,
  databaseUser:process.env.DATABASE_USER,
  databasePassword:process.env.DATABASE_PASSWORD,
  databaseName:process.env.DATABASE_NAME,
  databaseHost:process.env.DATABASE_HOST,
  databasePort:process.env.DATABASE_PORT,
  stravaClientID:process.env.STRAVA_CLIENT_ID,
  stravaClientSecret:process.env.STRAVA_CLIENT_SECRET,
  stravaCallbackURL:process.env.STRAVA_CALLBACK_URL,
  facebookClientID:process.env.FACEBOOK_CLIENT_ID,
  facebookClientSecret:process.env.FACEBOOK_CLIENT_SECRET,
  CallbackURL:process.env.FACEBOOK_CALLBACK_URL
};