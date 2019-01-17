const mongoDb = require('mongodb');

const getDb = require('../util/database').getDb;

class Registeruser{
    constructor(user_name, user_email, user_password){
        this.user_name = user_name;
        this.user_email = user_email;
        this.user_password = user_password;
    }

    save(){

        let db = getDb();
        return db.collection('user').insertOne(this)
        .then(result => {
           // console.log(result);
        })
        .catch(err =>{
            console.log(err);
        });
    }
}

module.exports = Registeruser;