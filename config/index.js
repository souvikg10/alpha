'use strict';
/***********************************
 * Module dependencies. 
 ************************************/
import dotenv from 'dotenv';

dotenv.load();

var env = process.env.NODE_ENV || 'development';
var config = require(`./${env}`);


module.exports = config;