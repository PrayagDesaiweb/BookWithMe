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

    // this static method fetches the properties of all such properties of the host that meets the constraint of parameters passes on the method
    static fetchfromHostProperties(city, state) {
        let db = getDb();
        return db.collection('hostProperty').find({city : city, state : state}).toArray()
        .then(result => {
            return result; // result here is an array cointain the result of the above querry
        }).catch(err =>{
            console.log(err);
        })
    }

    
    static fetchPropertyFromPropertyId(property_id){
        let db = getDb();
        return db.collection('hostProperty').findOne({_id : new MongoDb.ObjectId(property_id)})
        .then(result => {
            return result; // result here is a single javascript object which contain the fields for hostProperty Document  
        }).catch(err =>{
            console.log(err);
        }) 
    } 


}

module.exports = ManageUser;