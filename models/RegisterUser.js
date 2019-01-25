const mongoDb = require('mongodb');

const getDb = require('../util/database').getDb;

class Registeruser{
    constructor(user_name, user_email, user_password, unique_user_name){
        this.user_name = user_name;
        this.user_email = user_email;
        this.user_password = user_password;
        this.unique_user_name = unique_user_name;
    }

    save(){

        let db = getDb();
        return db.collection('user').insertOne(this)
        .then(result => {
           // console.log(result);
        })
        .catch(err =>{
            //console.log(err);
        });
    }
}

module.exports = Registeruser;