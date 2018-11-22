/***********************************
 * facebook data importer
 ************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/
import FB from 'fb'; 
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
    FB.setAccessToken(User.getConnectorTokenFacebook(profile));
    FB.api('/me', {fields: ['id', 'last_name','first_name','name','gender','hometown','email', 'birthday', 'address', 'age_range', 'context', 'favorite_athletes', 'favorite_teams', 'inspirational_people', 'location', 'meeting_for', 'quotes', 'sports']}, function (payload) {
        if (payload && !payload.error) {
            DropBoxPod.createFileIfNotExist(User.getPodToken(profile),"/facebook","me.json",JSON.stringify(payload));
                Activity.updateUserActivity(User.getUserId(profile),Activity.ACTIVITY_CATEGORY_FACEBOOK,Activity.ACTIVITY_TYPE_SYNC,function(){
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
