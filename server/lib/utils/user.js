/***********************************************************
 * auth0 user management
 ***********************************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/
var ManagementClient = require('auth0').ManagementClient;
var crypto = require('./crypto');
 

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
 * load access token of logged in users via auth0 social login
 *
 * @param {Object} authentication user by auth0
 * @param {function} call-back function
 * @return {Object} updated user with pod access token
 * @private
 */
function _loadSocialLoginAccessToken(profile,cb){
    var ManagementClient = require('auth0').ManagementClient;
    var management = new ManagementClient({
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
        clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
        scope: 'read:user_idp_tokens read:users_app_metadata'
        });
     management.getUser({ id: _getUserId(profile)}, function (err, user) {
        if(user){
            var updatedProfile=_setPodToken(profile,user.identities[0].access_token);
           /* if(user.user_metadata){
                if(user.user_metadata.strava)
                    updatedProfile=_setConnectorTokenStrava(updatedProfile,crypto.decrypt(user.user_metadata.strava));
                if(user.user_metadata.facebook)
                    updatedProfile=_setConnectorTokenFacebook(updatedProfile,crypto.decrypt(user.user_metadata.facebook));
            }*/
            return cb(updatedProfile);
        }
    });
    
}

/**
 * update user meta-deta in auth0 user database
 *
* @param {Object} authentication user by auth0
 * @param {String} field to update/create
 * @param {function} call-back function
 * @private
 */
function _setUserMetaData(profile,field,value,cb){
    var ManagementClient = require('auth0').ManagementClient;
    var management = new ManagementClient({
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
        clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
        scope: 'update:users_app_metadata'
        });
    var metadata = {};

    metadata[field] = crypto.encrypt(value);
    management.updateUserMetadata({ id: _getUserId(profile)},metadata, function (err,user) {
        if(user){
            return cb(profile);
        }
    });
    
}


/**
 * delete user meta-deta in auth0 user database
 *
* @param {Object} authentication user by auth0
 * @param {String} field to update/create
 * @param {String} value 
 * @param {function} call-back function
 * @private
 */
function _deleteUserMetaData(profile,field,cb){
    var ManagementClient = require('auth0').ManagementClient;
    var management = new ManagementClient({
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
        clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
        scope: 'update:users_app_metadata'
        });
    var metadata = {};
    metadata[field] = "";
    management.updateUserMetadata({ id: _getUserId(profile)},metadata, function (err,user) {
        if(user){
            return cb(profile);
        }
    });
    
}

/**
 * get userId for user
 *
 * @param {Object} profile passport object 
 * @return {String} user id 
 * @private
 */
function _getUserId (profile) {
    return profile.user_id;
}

/**
 * get useremail for user
 *
 * @param {Object} profile passport object 
 * @return {String} user email 
 * @private
 */
function _getUserEmail (profile) {
    return profile.emails[0].value;
}


/**
 * set pod token for user
 *
 * @param {Object} profile passport object 
 * @param {String} token 
 * @return {Object} profile passport object
 * @private
 */
function _setPodToken (profile,token) {
    profile.pod={"token":""+token+""};
    return profile;
}

/**
 * get pod token for user
 *
 * @param {Object} profile passport object 
 * @return {String} token 
 * @private
 */
function _getPodToken (profile) {
    return profile.pod.token;
}


/**
 * set connector token strava
 *
 * @param {Object} profile passport object 
 * @param {String} token 
 * @param {Function} call back 
 * @return {Object} profile passport object
 * @private
 */
function _setConnectorTokenStrava (profile,token,cb) {
    profile.strava={"token":""+token+""};
    if (cb==null)
        return profile;
    else{
        _setUserMetaData(profile,"strava",token,function (){
        return cb (profile);
        });
    }
}
function _setConnectorTokenFacebook (profile,token,cb) {
    profile.facebook={"token":""+token+""};
    if (cb==null)
        return profile;
    else{
        _setUserMetaData(profile,"facebook",token,function (){
        return cb (profile);
        });
    }
}

/**
 * get strava token for user
 *
 * @param {Object} profile passport object 
 * @return {String} strava token 
 * @private
 */
function _getConnectorTokenStrava (profile) {
    return profile.strava.token;
}
function _getConnectorTokenFacebook (profile) {
    return profile.facebook.token;
}


/**
 *  delete connector token strava
 *
 * @param {Object} profile passport object 
 * @param {Function} call back 
 * @private
 */
function _deleteConnectorTokenStrava (profile,cb) {
    profile.strava={};
    _deleteUserMetaData(profile,"strava",function (){
        return cb (profile);
    });
}
function _deleteConnectorTokenFacebook (profile,cb) {
    profile.facebook={};
    _deleteUserMetaData(profile,"facebook",function (){
        return cb (profile);
    });
}


/***********************************
 * Module exports.
 ************************************/
var self=module.exports={
    loadSocialLoginAccessToken:function(user,cb){
        _loadSocialLoginAccessToken(user,cb);
    },
    getUserId:function(profile){
        return _getUserId(profile);
    },
    getUserEmail:function(profile){
        return _getUserEmail(profile);
    },
    setPodToken:function(profile,token){
        _setPodToken(profile,token);
    },
    getPodToken:function(profile){
        return _getPodToken(profile);
    },
    setConnectorTokenStrava:function(profile,token,cb){
        return _setConnectorTokenStrava(profile,token,cb);
    },
    getConnectorTokenStrava:function(profile){
        return _getConnectorTokenStrava(profile);
    },
    deleteConnectorTokenStrava:function(profile,cb){
        return _deleteConnectorTokenStrava(profile,cb);
    },
    setConnectorTokenFacebook:function(profile,token,cb){
        return _setConnectorTokenFacebook(profile,token,cb);
    },
    getConnectorTokenFacebook:function(profile){
        return _getConnectorTokenFacebook(profile);
    },
    deleteConnectorTokenFacebook:function(profile,cb){
        return _deleteConnectorTokenFacebook(profile,cb);
    }

};