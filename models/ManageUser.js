const MongoDb = require('mongodb');
const getDb = require('../util/database').getDb;

class ManageUser{
    constructor(user_name){
        this.user_name = user_name;
    }

    static fetchUserIdByUserName(user_name){ // this can also be a static method. Check for the same
        let db = getDb();
        return db.collection('user').findOne({user_name : user_name})
        .then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        })
    }
}

module.exports = ManageUser;