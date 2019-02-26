const mongoDb = require('mongodb');
const getDb = require('../util/database').getDb;

class ManageHostProperty {
    constructor(){

    }

    static findPropertyByHostName(hostname){
        let db = getDb();
        return db.collection('hostProperty').find({host_name : hostname}).toArray().then(result =>{

            return result;
        }).catch(err =>{
            console.log(err);
        });
    }
}

module.exports = ManageHostProperty;