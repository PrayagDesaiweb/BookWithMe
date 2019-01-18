const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class AuthenticateUser {

    constructor(user_name_entered, user_password_entered){
        this.user_name_entered = user_name_entered;
        this.user_password_entered = user_password_entered;
        console.log('inside constructor');
        }

    authenticateUser(){
        console.log('inside method');
        console.log(this.user_name_entered); // always use this to access the class variables inside the javascript class function. not doing this wil lead to error
        
        let db = getDb();
        return db.collection('user').findOne({user_name : this.user_name_entered, user_password : this.user_password_entered}).then(result =>{
            if(result == null){
                return false;
            }
            else{
                return true;
            }
        }).catch(err => {
            console.log(err);
        });
        console.log('function ended');
    }
}

module.exports = AuthenticateUser;