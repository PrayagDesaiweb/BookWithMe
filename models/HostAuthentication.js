const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class AuthenticateHost {

    constructor(user_name_entered, user_password_entered){
        this.user_name_entered = user_name_entered;
        this.user_password_entered = user_password_entered;
        }

    authenticateHost(){
        
        let db = getDb();
        return db.collection('host').findOne({unique_user_name : this.user_name_entered, password : this.user_password_entered}).then(result =>{
            if(result == null){
                return false;
            }
            else{
                return true;
            }
        }).catch(err => {
            //console.log(err);
        });
    }

    static checkHostNameUnique(host_name){
        let db = getDb();
        return db.collection('host').findOne({unique_user_name : host_name})
        .then(ans =>{
            if(ans === null){
                return "Not Duplicate";
            }
            else{
                return "Duplicate";
            }
        }).catch(err =>{
            console.log(err);
        })
    }
}

module.exports = AuthenticateHost;