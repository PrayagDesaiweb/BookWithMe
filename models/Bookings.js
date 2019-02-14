const MongoDb = require('mongodb');
const getDb = require('../util/database').getDb;

class BookProperty{

    constructor(){

    }

    static bookProperty(check_in_date, check_out_date,host_id,host_property_id){
        let db = getDb();
        return db.collection('bookings').insertOne({check_in_date : check_in_date, check_out_date : check_out_date, host_id : host_id, host_property_id : host_property_id})
        .then(result =>{
            return result;
        }).catch(err =>{
            console.log(err);
        });
    }

}

module.exports = BookProperty;