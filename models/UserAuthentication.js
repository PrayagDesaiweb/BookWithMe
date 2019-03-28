const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class AuthenticateUser {

    constructor(user_name_entered, user_password_entered){
        this.user_name_entered = user_name_entered;
        this.user_password_entered = user_password_entered;
        //console.log('inside constructor');
        }

    authenticateUser(){
        //console.log('inside method');
        //console.log(this.user_name_entered); // always use this to access the class variables inside the javascript class function. not doing this wil lead to error
        
        let db = getDb();
        return db.collection('user').findOne({unique_user_name : this.user_name_entered, user_password : this.user_password_entered}).then(result =>{
            if(result == null){
                return false;
            }
            else{
                return true;
            }
        }).catch(err => {
            //console.log(err);
        });
        //console.log('function ended');
    }

    static checkIfUserNameIsUnique(user_name){
        let db = getDb();
        return db.collection('user').findOne({unique_user_name : user_name})
        .then(result =>{
            
            if(result === null){
                return "Not-Duplicate"; // No usernaeme found of the same username in the database 
                
            }
            else{
                return "Duplicate"; // Found The same Username in the Database. Duplicate userName
            }
        }).catch(err =>{
            console.log(err);
        })
    }
}

module.exports = AuthenticateUser;