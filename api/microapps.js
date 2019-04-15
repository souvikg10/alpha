const {
    name,
    version,
    description
  } = require('../package.json')
  const microapps = (req, res) => {
    res.json({
      name,
      description,
      version,
      uptime: process.uptime()
    })
  }
  module.exports = microapps;


var crypto = require('crypto');
var current_date = (new Date()).valueOf().toString();
var random = Math.random().toString();
crypto.createHash('sha1').update(current_date + random).digest('hex');
console.log(crypto.createHash('sha1').update(current_date + random).digest('hex'));