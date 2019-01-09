const mongoDb = require('mongodb');
const getDb = require('../util/database').getDb;

class RegisterHost{

    constructor(name, email, password, contactNo){
        this.name = name;
        this.email = email;
        this.password = password;
        this.contactNo = contactNo;
    }

        save(){
        let db = getDb();
        return db.collection('host').insertOne(this)
        .then(result =>{
            console.log(result);
        })
        .catch(err =>{
            console.log(err);
        })
    }
}

module.exports = RegisterHost;