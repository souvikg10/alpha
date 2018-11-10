/***********************************
 * strava data importer
 ************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/
import strava from 'strava-v3';
const dropboxV2Api = require('dropbox-v2-api');
import fs from 'memfs';
import {vol} from 'memfs';


/***********************************
 * Private constants.
 ************************************/

/***********************************
 * Private properties
 ************************************/

/***********************************
 * Private functions
 ************************************/
/**
 * function to import strava data
 *
 * @param {Object} user
 * @returns {String} jsonString
 * @private
 */
function _importData(user){
    const fs = require('fs');
    strava.athlete.get({'access_token':user.strava.accessToken},function(err,payload,limits) {
        try{
            fs.writeFileSync('athlete.json', JSON.stringify(payload));
        }catch (e){
            console.log("Cannot write file ", e);
        }


        var dropboxV2Api = require('dropbox-v2-api');
    // create session ref:
    var dropbox = dropboxV2Api.authenticate({
      token: user.pod.accessToken
    });
    //create strava folder
  /* dropbox({
        resource: "files/create_folder",
        parameters: {
          "path": "/strava",
          "autorename": false
        }
        }, (err, result, response) => {
          if (err) { return console.log('err:', err); }
          
          });*/

         

          vol.writeFileSync('/readme', '# Hello World');
          const rs = vol.createReadStream('/readme', 'utf8');
          rs.on('data', (data) => {
              console.log('data', data.toString());
          });
          //fs.writeFileSync('/hello.txt', 'World!');
          
          dropbox({
            resource: 'files/upload',
            parameters: {
                path: '/strava/athlete.json'
            },
            readStream: rs

            }, (err, result, response) => {
            if (err) { return console.log('err:', err); }
        });
      });

      
    
    
}


/***********************************
 * Module exports.
 ************************************/
var self=module.exports={
    importData:function(user){
       return _importData(user);
    }
};
