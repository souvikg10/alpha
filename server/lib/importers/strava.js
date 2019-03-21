/***********************************
 * strava data importer
 ************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/
import strava from 'strava-v3';
import User from '../utils/user';
import Activity from '../utils/activity';
import DropBoxPod from '../utils/dropBoxPod';

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
 * @param {Object} profile
 * @returns {String} jsonString
 * @private
 */
function _importData(profile,cb){
    strava.athlete.get({'access_token':User.getConnectorTokenStrava(profile)},function(err,payload,limits) {
        if (!err) {
            /* handle the result */
            DropBoxPod.createFileIfNotExist(User.getProfileToken(profile),"/strava","me.json",JSON.stringify(payload));
            Activity.updateUserActivity(User.getUserId(profile),Activity.ACTIVITY_CATEGORY_STRAVA,Activity.ACTIVITY_TYPE_SYNC,function(){
                cb();
            });
          }
    });  
}

/***********************************
 * Module exports.
 ************************************/
var self=module.exports={
    importData:function(profile,cb){
       return _importData(profile,cb);
    }
};
