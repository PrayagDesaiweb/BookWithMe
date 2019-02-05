const MongoDb = require('mongodb');
const getDb = require('../util/database').getDb;

class ManageUser{
    constructor(user_name){
        this.user_name = user_name;
    }

    fetchUserIdByUserName(userName){ // this can also be a static method. Check for the same
        let db = getDb();
        return db.collection('user').findOne({unique_user_name : userName })
        .then(result => {
            return result;
        }).catch(err => {
            console.log(err);
        })
    }

    static updateUserCredentials(userId, uniqueUserName, userName, userEmail, userPassword ){
        let db = getDb();
        return db.collection('user').updateOne({_id : new MongoDb.ObjectID(userId)} , {$set : {
            unique_user_name : uniqueUserName,
            user_name : userName,
            user_email : userEmail,
            user_password : userPassword

        }}).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        })
    }
}

module.exports = ManageUser;