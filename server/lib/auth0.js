/***********************************************************
 * auth0 administration (connection to admin APIs, ...)
 ***********************************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/
var ManagementClient = require('auth0').ManagementClient;
 

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
 * @return {Object} updated user with pod access token
 * @private
 */
function _loadSocialLoginAccessToken(currentUser,cb){
    var ManagementClient = require('auth0').ManagementClient;
    var management = new ManagementClient({
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_MANAGEMENT_CLIENT_ID,
        clientSecret: process.env.AUTH0_MANAGEMENT_CLIENT_SECRET,
        scope: 'read:user_idp_tokens'
        });
     management.getUser({ id: currentUser.user_id }, function (err, user) {
        if(user){
            currentUser.pod={ accessToken : user.identities[0].access_token,refreshToken : user.identities[0].refresh_token};
            return cb(currentUser);
        }
    });
    
}

/***********************************
 * Module exports.
 ************************************/
var self=module.exports={
    loadSocialLoginAccessToken:function(user,cb){
        _loadSocialLoginAccessToken(user,cb);
    }
};
