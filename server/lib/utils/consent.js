/***********************************************************
 * User consents
 ***********************************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/
import Database from '../db/database';
import Sequelize from 'sequelize';
import crypto from 'crypto';

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
 * create user consent 
 *
 * @param {String} userid
 * @param {String} category
 * @param {String} type
 * @private
 */
function _createUserConsent (userId,type,consent,cb) {
    var timestamp=Date.now();
    var hash = crypto.createHash('md5').update(userId+type+consent+timestamp).digest('hex');
    Database.defineUserConsents().create({ user_id: userId,type: type,consent: consent,timestamp:timestamp,hash:hash}).then(function(result){
        cb(result);
    });
}

/**
 * get user consents
 *
 * @param {String} userid
 * @private
 */
function _getUserConsents (userId,cb) {
    Database.defineUserConsents().findAll({where:{user_id: userId},order: Sequelize.literal('timestamp DESC')}).then(function(result){
        cb(result);
    });
}

/***********************************
 * Module exports.
 ************************************/
var self=module.exports={
    CONSENT_TYPE_STRAVA:"STRAVA",
    CONSENT_TYPE_FACEBOOK:"FACEBOOK",
    CONSENT_TYPE_GOOGLE:"GOOGLE",
    createUserConsent:function(userId,type,consent,cb){
        _createUserConsent(userId,type,consent,cb);
    },
    getUserConsents:function(userId,cb){
        _getUserConsents(userId,cb);
    }
};