const MongoDb = require('mongodb');
const getDb = require('../util/database').getDb;

class BookProperty{

    constructor(){

    }

    static bookProperty(check_in_date, check_out_date,host_id,host_property_id, status, date_when_property_booked, user_id){
        let db = getDb();
        return db.collection('bookings').insertOne({check_in_date : check_in_date, check_out_date : check_out_date, host_id : host_id, host_property_id : host_property_id, property_is_booked : status, date_when_property_booked:date_when_property_booked, user_id : user_id})
        .then(result =>{
            return result;
        }).catch(err =>{
            console.log(err);
        });
    }

    static fetchPropertyFromBookings(property_id){
        let db = getDb();
        return db.collection('bookings').find({host_property_id : property_id}).toArray()
        .then(result =>{
            //console.log(result);
            return result;
        }).catch(err =>{
            console.log(err);
        })
    }

    static fetchPropertyFromHostProperty(property_id){
        let db = getDb();
        return db.collection('hostProperty').findOne({ _id : new MongoDb.ObjectId(property_id) }).
        then(result =>{
            return result;
        }).catch(err =>{
            console.log(err);
        })
    }

    // This method fetches the information regarding host name and what the host have to say about himself in the section of Know Your Host
    static fetchHostInformation(hostId){
        let db = getDb();
        return db.collection('host').findOne({ _id : new MongoDb.ObjectID(hostId)})
        .then(result =>{
            return result;
        }).catch(err =>{
            console.log(err);
        })
    
    }

    static fetchCurrentlyBookedHostProperties(userId){
        let db = getDb();
        return db.collection('bookings').find({user_id : userId, property_is_booked: true }).toArray()
        .then(result =>{
            return result;
        }).catch(err =>{
            console.log(err);
        })
    }

    static fetchpreviouslyBookedHostProperties(userId){
        let db = getDb();
        return db.collection('bookings').find({user_id : userId, property_is_booked: false }).toArray()
        .then(result =>{
            return result;
        }).catch(err =>{
            console.log(err);
        })
    }

    static fetchPropertyDetailsFromhostProperty(host_property_id){
        let db = getDb();
        return db.collection('hostProperty').findOne({_id : new MongoDb.ObjectID(host_property_id)})
        .then(result =>{
            //console.log(result);
            return result;
            
        }).catch(err =>{
            console.log(err);
        }) 
    }

}

module.exports = BookProperty;