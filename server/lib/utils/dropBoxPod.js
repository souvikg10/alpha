/***********************************************************
 * dropbox pod
 ***********************************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/
import util from 'util';
import dropboxV2Api from 'dropbox-v2-api';
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
 * create folder dropbox
 *
 * @param {String} dropBoxToken
 * @param {String} locationPath
 * @private
 */
function _createFolderIfNotExist (dropBoxToken,locationPath) {
   
}

/**
 * create file on dropbox
 *
* @param {String} dropBoxToken
 * @param {String} locationFilePath
 * @param {String} locationFileName
 * @param {String} data to write
 * @private
 */
function _createFileIfNotExist (dropBoxToken,locationFilePath,locationFileName,data) {
  var dropbox = dropboxV2Api.authenticate({
    token: dropBoxToken
  });
  fs.writeFileSync(locationFilePath+dropBoxToken, data);
  dropbox({
    resource: 'files/upload',
    mode:'overwrite',
    parameters: {
      path: locationFilePath+'/'+locationFileName,
      mode:'overwrite'
    },
    readStream: fs.createReadStream(locationFilePath+dropBoxToken, 'utf8')
    }, (err, result, response) => {
     // fs.unlink(locationFilePath+dropBoxToken);
      if (err) { return console.log('err:', err); }
    });
}

/***********************************
 * Module exports.
 ************************************/
var self=module.exports={
    createFolderIfNotExist:function(dropBoxToken,locationPath){
        _createFolderIfNotExist(locationPath);
    },
    createFileIfNotExist:function(dropBoxToken,locationFilePath,locationFileName,data){
      _createFileIfNotExist(dropBoxToken,locationFilePath,locationFileName,data);
    }
};