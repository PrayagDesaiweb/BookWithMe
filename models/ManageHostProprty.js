const mongoDb = require('mongodb');
const getDb = require('../util/database').getDb;

class ManageHostProperty {
    constructor(){

    }

    static findPropertyByHostId(hostId){
        let db = getDb();
        return db.collection('hostProperty').find({host_id : hostId}).toArray().then(result =>{

            return result;
        }).catch(err =>{
            console.log(err);
        });
    }
}

module.exports = ManageHostProperty;