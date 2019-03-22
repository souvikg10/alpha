/***********************************************************
 * User activities
 ***********************************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/
import Database from '../db/database';

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
 * create or update user activity 
 *
 * @param {String} values
 * @param {String} condition
 * @private
 */
function _upsert(values, condition) {
  return Database.defineUserActivities()
      .findOne({ where: condition })
      .then(function(obj) {
          if(obj) { // update
              return obj.update(values);
          }
          else { // insert
              return Database.defineUserActivities().create(values);
          }
      }
  );
}

 /**
 * create or update user activity 
 *
 * @param {String} user
 * @param {String} category
 * @param {String} type
 * @private
 */
function _updateUserActivity (userId,category,type,cb) {
  _upsert({ user_id: userId,category: category,type: type,timestamp:Date.now()}, { user_id: userId,category: category,type: type }).then(function(result){
      cb(result);
  });
}

/**
 * get all Sync activities
 *
 * @param {String} userId
 * @param {Function} callback
 * @private
 */
function _getUserSyncActivity (userId,cb) {
    Database.defineUserActivities().findAll({where: {user_id: userId,type:self.ACTIVITY_TYPE_SYNC}}).then(userActivities => {
        cb(userActivities);
      }); 
  }

/***********************************
 * Module exports.
 ************************************/
var self=module.exports={
    ACTIVITY_TYPE_SYNC:"SYNC",
    ACTIVITY_TYPE_LOGIN:"LOGIN",
    ACTIVITY_CATEGORY_GOOGLE:"GOOGLE",
    ACTIVITY_CATEGORY_STRAVA:"STRAVA",
    ACTIVITY_CATEGORY_FACEBOOK:"FACEBOOK",
    updateUserActivity:function(userId,category,type,cb){
      _updateUserActivity(userId,category,type,cb);
    },
    getUserSyncActivity:function(userId,cb){
        _getUserSyncActivity(userId,cb);
      }
};