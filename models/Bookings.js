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

    static fetchCurrentlyBookedUserProperties(userId){
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
            console.log('frm the bookings class');
            console.log(result);
            return result;
            
        }).catch(err =>{
            console.log(err);
        }) 
    }

    static fetchHostPropertiesFromBookings(host_property_id){
        let db = getDb();
        return db.collection('bookings').findOne({host_property_id : host_property_id})
        .then(result =>{
            console.log('Hi' + result)
            return result;
        }).catch(err =>{
            console.log(err);
        })
    }

    static trysomethingNew(host_property_id){
        let db = getDb();
        return db.collection("bookings").aggregate([
            { $project: {
                host_id: {$toObjectId: host_property_id}
            }},

            { $lookup: {
              from: "hostProperty",
              localField: "host_id",
              foreignField: "_id",
              as: "country"
            }}
          ])
    .toArray().then(result =>{
        
            //console.log(result)
            return result;
        }).catch(err =>{
            console.log(err)
        })
    }


    static fetchPropertiesFromhostProperty(host_property_id){

        let db = getDb();
        return db.collection('bookings').find({host_property_id : host_property_id}).toArray().then(result =>{
            return result;
        }).catch(err =>{
            console.log(err);
        })

    }

    static fetchUserCredentialsFromUserId(user_id){
        let db = getDb();
        return db.collection("user").findOne({_id : new MongoDb.ObjectID(user_id)}).then(result =>{
            return result;
        }).catch(err =>{
            console.log(err);
        })
    }

    // this is for implementing for deletion of the rentals from the host
    static fetchHostPropertyById(host_property_id){
        let db = getDb();
        return db.collection("bookings").find({host_property_id : host_property_id , property_is_booked : true}).toArray()
        .then(result =>{
            return result
        }).catch(err =>{
            console.log(err);
        })
    } // method ends here

    // this deletes the booking. Deleting booking means making property_is_booked to false
    static deleteBooking(booking_id){
        let db = getDb();
        return db.collection('bookings').updateOne({_id : new MongoDb.ObjectID(booking_id)}, {$set : {property_is_booked : false}})
        .then(result =>{
            console.log(result)
        }).catch(err =>{
            console.log(err)
        })
    }

    
}

module.exports = BookProperty;