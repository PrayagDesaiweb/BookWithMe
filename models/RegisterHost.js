const mongoDb = require('mongodb');
const getDb = require('../util/database').getDb;

class RegisterHost{

    constructor(name, email, password, contactNo, unique_user_name,something_about_me){
        this.name = name;
        this.email = email;
        this.password = password;
        this.contactNo = contactNo;
        this.unique_user_name = unique_user_name;
        this.something_about_me = something_about_me;
    }

        save(){
        let db = getDb();
        return db.collection('host').insertOne(this)
        .then(result =>{
            //console.log(result);
        })
        .catch(err =>{
            //console.log(err);
        })

        
    }

    static fetchIdByName(name_of_host) {
        let db = getDb();
        return db.collection('host').findOne({unique_user_name : name_of_host})
        .then(product => {
           // console.log(product);
            return product;
        }).catch(err => {
            //console.log(err);
        })
    }

    static fetchHostCredentials(hostId){
        let db = getDb();
        return db.collection('host').findOne({_id : new mongoDb.ObjectId(hostId)})
        .then(credential =>{
            return credential;
        })
        .catch(err =>{
            console.log(err);
        });
    }

    static updateHostCredentials(hostId, unique_user_name, name, email, password, contactNo, something_about_me){
        let db = getDb();
        return db.collection('host').updateOne({_id : new mongoDb.ObjectId(hostId)}, {$set : {
            "unique_user_name" : unique_user_name,
            "name" : name,
            "email" : email,
            "password" : password,
            "contactNo" : contactNo,
            "something_about_me" : something_about_me
        }}).then(result =>{
            return result;
        }).catch(err => {
            console.log(err);
        });

    }

}


module.exports = RegisterHost;