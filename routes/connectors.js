/***********************************
 * connector routes
 ************************************/

/***********************************
 * Module dependencies.
 * @private
 ************************************/
import express from 'express';
var router = express.Router();
import lodash  from 'lodash';
import dateFormat from 'dateformat';
import Database from '../server/lib/db/database';
import User from '../server/lib/utils/user';
import Activity from '../server/lib/utils/activity';

/***********************************
 * Private functions
 ************************************/

 /***********************************
 * routes functions 
 ************************************/
/* get connectors home */
router.get('/auth/connectors', function (req, res, next) {
  //find connectors array
  Database.defineUserConnectors().findOne({where: {user_id: User.getUserId(req.user)}}).then(userConnectors => {
    renderConnectors(req,res,userConnectors);
  }); 
});


/***********************************
 * rendering functions
 ************************************/

/**
 * render connector home
 * @param {req} request
 * @param {res} response
 */
function renderConnectors(req,res,userConnectors){
  //find all syncs dates and render page
  Activity.getUserSyncActivity(User.getUserId(req.user),function(userActivities){
    
    //strava vars
    var stravaChecked="";
    var stravaDisabled="disabled";
    if (userConnectors.strava) {
      stravaChecked="checked";
      stravaDisabled="";
    }
    var stravaLastSync="Not yet synchronized";
    var stravaSyncRecord=lodash.filter(JSON.parse(JSON.stringify(userActivities)), { 'category': Activity.ACTIVITY_CATEGORY_STRAVA});
    if (stravaSyncRecord.length>0)
      stravaLastSync="Last sync "+dateFormat(stravaSyncRecord[0].timestamp,"dd/mm/yyyy at HH:MM:ss");

      //facebook vars
    var facebookChecked="";
    var facebookDisabled="disabled";
    if (userConnectors.facebook) {
      facebookChecked="checked";
      facebookDisabled="";
    }
    var facebookLastSync="Not yet synchronized";
    var facebookSyncRecord=lodash.filter(JSON.parse(JSON.stringify(userActivities)), { 'category': Activity.ACTIVITY_CATEGORY_FACEBOOK});
    if (facebookSyncRecord.length>0)
    facebookLastSync="Last sync "+dateFormat(facebookSyncRecord[0].timestamp,"dd/mm/yyyy at HH:MM:ss");


      res.render('connectors', {
        title: 'Connectors',
        layout: 'dashboard',
        connectors:'active',
        user:{id:User.getUserId(req.user),email:User.getUserEmail(req.user)},
        strava:{checked:stravaChecked,disabled:stravaDisabled,lastSync:stravaLastSync},
        facebook:{checked:facebookChecked,disabled:facebookDisabled,lastSync:facebookLastSync}
      });
  });
}


module.exports = router;
