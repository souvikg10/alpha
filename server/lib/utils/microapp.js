/***********************************************************
 * microapps
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
 * get microapp users
 *
 * @param {String} userid
 * @private
 */
function _getMicroappUsers (microappId,cb) {
    Database.defineLinkMicroappsUsers().findAll({where:{microapp_id: microappId}}).then(function(result){
        cb(result);
    });
}

/***********************************
 * Module exports.
 ************************************/
var self=module.exports={
    getMicroappUsers:function(microappId,cb){
        _getMicroappUsers(microappId,cb);
    }
};