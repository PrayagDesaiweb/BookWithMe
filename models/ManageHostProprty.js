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

   static updatePropertyAfterEditingCredentials(date_updated,cancellation_scheme,accomodation_strength,amenities,property_name,description,specifications,chk_in_date,chk_out_date,host_property_id,city,state,address,property_class,rate){
    let db = getDb();
        return db.collection('hostProperty').updateOne({_id : new mongoDb.ObjectID(host_property_id)} , {$set : {
            
            cancellation_scheme : cancellation_scheme,
            accomodation_strength : accomodation_strength,
            amenities :amenities,
            property_name : property_name,
            description : description,
            specifications : specifications,
            chk_in_date : chk_in_date,
            chk_out_date: chk_out_date,
            city : city,
            state : state,
            address : address,
            property_class : property_class,
            rate : rate,
            date_updated : date_updated,

        }}).then(result => {
           // console.log(result);
           console.log(result);
        }).catch(err => {
            console.log(err);
        })

    }

static fetchHostPropertyById(hostId){
    let db = getDb();
        return db.collection('hostProperty').find({_id : hostId}).then(result =>{
            return result;
        }).catch(err =>{
            console.log(err);
        });
}
    static changeStatusOfProperty(host_property_id){
        let db = getDb();
        return db.collection('hostProperty').updateOne({_id : new mongoDb.ObjectID(host_property_id)} , { $set: { status : 'inactive' } })
        .then(result =>{
            console.log(result);
        }).catch(err =>{
            console.log(err);
        })
    }

    static findPropertyByHostIdThatAreActive(hostId){
        let db = getDb();
        return db.collection('hostProperty').find({host_id : hostId, status : "active"}).toArray().then(result =>{

            return result;
        }).catch(err =>{
            console.log(err);
        });
    }

    static findPropertyByHostIdThatAreInactive(hostId){
        let db = getDb();
        return db.collection('hostProperty').find({host_id : hostId, status : "inactive"}).toArray().then(result =>{

            return result;
        }).catch(err =>{
            console.log(err);
        });
    }

    static updatePropertyStatus(host_property_id){
        let db = getDb();
        return db.collection("hostProperty").updateOne({_id : new mongoDb.ObjectID(host_property_id)}, { $set: { status : 'active' } }  )
        .then(result =>{
            // status changed
            console.log(result)
        }).catch(err =>{
            console.log(err)
        });
    }

    static findProperty(hostId){
        let db = getDb();
        return db.collection("hostProperty").findOne({_id : new mongoDb.ObjectID(hostId)})
        .then(result =>{
            return result;
        }).catch(err =>{
            console.log(err);
        })
    }

    static getBoutiqueRoomsProperty(city, state){
        let db = getDb();
        return db.collection("hostProperty").find({city : city, state:state, property_class : "boutique_rooms", status : "active"}).toArray()
        .then(result =>{
            return result;
        }).catch(err =>{
            console.log(err);
        })
    }

    static getBWMPlusProperties(city, state){
        let db = getDb();
        return db.collection("hostProperty").find({city : city, state:state, property_class : "bwm_plus", status : "active"}).toArray()
        .then(result =>{
            return result;
        }).catch(err =>{
            console.log(err);
        })
    }

    static getBWMEntireHome(city, state){
        let db = getDb();
        return db.collection("hostProperty").find({city : city, state:state, property_class : "entire_home", status : "active"}).toArray()
        .then(result =>{
            return result;
        }).catch(err =>{
            console.log(err);
        })
    }

    static getUniqueHomes(city, state){
        
        let db = getDb();
        return db.collection("hostProperty").find({city : city, state:state, property_class : "unique_homes", status : "active"}).toArray()
        .then(result =>{
            return result;
        }).catch(err =>{
            console.log(err);
        })

    }
    
}



module.exports = ManageHostProperty;