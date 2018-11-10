/***********************************************************
 * pod management
 ***********************************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/
var oneDriveAPI = require('onedrive-api');
const {google} = require('googleapis');
const dropboxV2Api = require('dropbox-v2-api');
 

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
 * Create an OAuth2 client with the given token, and then execute the
 * given callback function.
 * @param {Object} token The access token from the user
 * @param {function} callback The callback to call with the authorized client.
 */
function _authorize(token, callback) {
    //const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        "fake", "fake", "fake");
        //oauth2Client.credentials = {access_token : token};
        //console.log(token);
        oAuth2Client.setCredentials({
          access_token: token,
          refresh_token: token,
          token_type: "Bearer",
          expiry_date: true
        });
  //  oAuth2Client.setCredentials(token);
    callback(oAuth2Client);
  }

  /**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function _listFiles(auth) {
  console.log(auth);
    const drive = google.drive({version: 'v3', auth});
    drive.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = res.data.files;
      if (files.length) {
        console.log('Files:');
        files.map((file) => {
          console.log(`${file.name} (${file.id})`);
        });
      } else {
        console.log('No files found.');
      }
    });
  }

  function _createFolder(auth){
    var fileMetadata = {
      'name': 'Invoices',
      'mimeType': 'application/vnd.google-apps.folder'
    };
    const drive = google.drive({version: 'v3', auth});
    drive.files.create({
      resource: fileMetadata,
      fields: 'id'
    }, function (err, file) {
      if (err) {
        // Handle error
      //  console.error(err);
      } else {
        console.log('Folder Id: ', file.id);
      }
    });
  }
  
/**
 * Insert new file.
 *
 * @param {File} fileData File object to read data from.
 * @param {Function} callback Function to call when the request is complete.
 */
function _insertFile(fileData,token, callback) { 
  const boundary = '-------314159265358979323846';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";


      var contentType = fileData.type || 'application/octet-stream';
      var metadata = {
        'title': fileData.fileName,
        'mimeType': contentType
      };
      
      var base64Data = fileData;
      var multipartRequestBody =
          delimiter +
          'Content-Type: application/json\r\n\r\n' +
          JSON.stringify(metadata) +
          delimiter +
          'Content-Type: ' + contentType + '\r\n' +
          'Content-Transfer-Encoding: base64\r\n' +
          '\r\n' +
          base64Data +
          close_delim;
          console.log(token);
      var request = gapi.client.request({
          'path': '/upload/drive/v2/files',
          'method': 'POST',
          'params': {'uploadType': 'multipart'},
          'headers': {
            'Content-Type': 'multipart/mixed; boundary="' + boundary + '"',
            'bearer': token
          },
          'body': multipartRequestBody});
          console.log(token);
      if (!callback) {
        callback = function(file) {
          console.log(file);
        };
      }
      request.execute(callback);
  
  }

/**
 * create google pod
 *
 * @param {Object}  user authenticated
 * @private
 */
function _createGoogleDrivePod(user){
  _authorize(user.pod.accessToken,function cb(auth){
    console.log(auth);
    _listFiles(auth);
  });
  
  //_insertFile("jkhkhkjhkjh",user.pod.accessToken, function cb()
   // {


   // });
    /*googleDrive(user.pod.accessToken).insert("k", "lll",
        function callback(err, response, body) {
            if (err) return console.log('err', err);
            console.log('response', response);
            console.log('body', JSON.parse(body));
          }
    );*/
}

/**
 * create onedrive pod
 *
 * @param {Object}  user authenticated
 * @private
 */
function _createOneDrivePod(user){
  console.log(user.pod.accessToken);
    oneDriveAPI.items.createFolder({
        accessToken: user.pod.accessToken,
        rootItemId: "root",
        name: "datavillage"
      }).then((item) => {
      console.log(item)
      // returns body of https://dev.onedrive.com/items/create.htm#response
      });
}

/**
 * create dropbox pod
 *
 * @param {Object}  user authenticated
 * @private
 */
function _createDropBoxPod(user){

  
  var dropboxV2Api = require('dropbox-v2-api');
  // create session ref:
  var dropbox = dropboxV2Api.authenticate({
    token: user.pod.accessToken
  });
  console.log(user.pod.accessToken);
    //create initfile
    /*dropbox({
      resource: "files/create_folder_v2",
      parameters: {
        "path": "/logs",
        "autorename": false
      }
      }, (err, result, response) => {
        if (err) { return console.log('err:', err); }
        console.log(result);
        console.log(response.headers);
    });*/
    
}

/***********************************
 * Module exports.
 ************************************/
var self=module.exports={
    createGoogleDrivePod:function(user){
      _createGoogleDrivePod(user);
    },
    createOneDrivePod:function(user){
        _createOneDrivePod(user);
    },
    createDropBoxPod:function(user){
      _createDropBoxPod(user);
  }

};
