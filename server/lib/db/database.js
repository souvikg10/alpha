/***********************************
 * postrgre database
 ************************************/
/***********************************
 * Module dependencies.
 * @private
 ************************************/
import Sequelize from 'sequelize';


/***********************************
 * Private functions
 ************************************/

 //connect database
function _connect(){
    return  new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
        dialect: 'postgres',
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
      });
  
} 

/***********************************
 * Models functions
 ************************************/
 
 //UserConnectors
 function _defineUserConnectors(){
    return  _connect().define('user_connectors', {
        user_id: Sequelize.STRING,
        strava: Sequelize.BOOLEAN,
        facebook: Sequelize.BOOLEAN
    },{
        timestamps: false,
        defaultScope: {
            attributes: {
                exclude: ['id']
            }
        }
        }
    );
} 

 //User activities
 function _defineUserActivities(){
    return  _connect().define('user_activities', {
        user_id: Sequelize.STRING,
        category: Sequelize.STRING,
        type: Sequelize.STRING,
        timestamp:{ type: Sequelize.DATE,defaultValue: Sequelize.NOW}
    },{
        timestamps: false
        }
    );
 }

    //User consent
    function _defineUserConsents(){
    return  _connect().define('user_consents', {
        user_id: Sequelize.STRING,
        hash: Sequelize.STRING,
        type: Sequelize.STRING,
        consent: Sequelize.BOOLEAN,
        timestamp:{ type: Sequelize.DATE,defaultValue: Sequelize.NOW}
    },{
        timestamps: false
        }
    );
} 

/***********************************
 * Module exports.
 ************************************/
var self=module.exports={
    getConnection:function(){
       return _connect();
    },
    defineUserConnectors:function(){
        return _defineUserConnectors();
     },
     defineUserActivities:function(){
        return _defineUserActivities();
     },
     defineUserConsents:function(){
        return _defineUserConsents();
     }
};